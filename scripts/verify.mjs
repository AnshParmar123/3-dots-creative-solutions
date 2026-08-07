import { chromium } from 'playwright';
const b = await chromium.launch();
const log = [];
const ok = (n, c) => log.push(`${c ? 'PASS' : 'FAIL'}  ${n}`);

// 1. Form validation
let p = await b.newPage();
const errs = [];
p.on('pageerror', e => errs.push(e.message));
await p.goto('http://localhost:4321/contact/', { waitUntil: 'networkidle' });
await p.locator('button[type="submit"]').click();
await p.waitForTimeout(300);
ok('empty submit shows error', (await p.locator('[data-status]').textContent()).includes('fill in'));

await p.fill('[name="name"]', 'Test');
await p.fill('[name="email"]', 'not-an-email');
await p.fill('[name="brief"]', 'A pack design');
await p.locator('button[type="submit"]').click();
await p.waitForTimeout(300);
ok('bad email rejected', (await p.locator('[data-status]').textContent()).includes('does not look right'));
ok('no JS errors on contact', errs.length === 0);
await p.close();

// 2. Lightbox opens from services proof strip
p = await b.newPage();
await p.goto('http://localhost:4321/services/', { waitUntil: 'networkidle' });
await p.locator('#outdoor .proof').first().click();
await p.waitForTimeout(500);
ok('lightbox opens from services proof', await p.locator('.lb.is-open').isVisible());
const src1 = await p.locator('[data-lb-img]').getAttribute('src');
await p.keyboard.press('ArrowRight');
await p.waitForTimeout(300);
ok('lightbox arrow advances', (await p.locator('[data-lb-img]').getAttribute('src')) !== src1);
await p.keyboard.press('Escape');
await p.waitForTimeout(500);
ok('lightbox closes on Esc', !(await p.locator('.lb').evaluate(e => e.classList.contains('is-open'))));
await p.close();

// 3. Work filters
p = await b.newPage();
await p.goto('http://localhost:4321/work/', { waitUntil: 'networkidle' });
const total = await p.locator('.tile').count();
await p.locator('[data-filter="otc"]').click();
await p.waitForTimeout(300);
const shown = await p.locator('.tile:not(.is-hidden)').count();
ok(`OTC filter narrows ${total}->${shown}`, shown === 31);
// lightbox should only cycle visible ones
await p.locator('.tile:not(.is-hidden)').first().click();
await p.waitForTimeout(400);
const cap = await p.locator('[data-lb-cap]').textContent();
ok('filtered lightbox starts on an OTC piece', /colgate|bisleri|maggi|hair|tobacco|unicef|triveni|medimix|surf|railway|treatabs|rin|bayliner|icici|kotak|ajit|bytco|cavi|ammonia|half|rumecin|mother|cosmetic|times|videocon|pizza|cockroach|india today/i.test(cap));
await p.close();

// 4. Mobile nav
p = await b.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
await p.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
ok('mobile nav hidden initially', !(await p.locator('#mnav').isVisible()));
await p.locator('[data-toggle]').tap();
await p.waitForTimeout(300);
ok('mobile nav opens', await p.locator('#mnav').isVisible());
await p.close();

// 5. No-JS: content must still be visible
p = await b.newPage({ javaScriptEnabled: false });
await p.goto('http://localhost:4321/', { waitUntil: 'domcontentloaded' });
const op = await p.locator('.pitch').evaluate(e => getComputedStyle(e).opacity).catch(() => '1');
ok('content visible without JS', op === '1');
await p.close();

await b.close();
console.log(log.join('\n'));
