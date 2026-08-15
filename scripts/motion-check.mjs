import { chromium } from 'playwright';
const b = await chromium.launch();
const log = []; const ok = (n,c)=>log.push(`${c?'PASS':'FAIL'}  ${n}`);
const errs = [];

// The tick-up usually lands ~2.4s in, but image decoding can stall the rAF
// loop past 3s. Poll for the value rather than trust a fixed sleep.
const countedUp = async (page) => {
  try {
    await page.waitForFunction(
      () => document.querySelector('[data-count="59"]')?.textContent === '59',
      null, { timeout: 6000 },
    );
    return true;
  } catch { return false; }
};

// Hero load sequence
let p = await b.newPage({ viewport:{width:1440,height:900} });
p.on('pageerror', e=>errs.push(e.message));
await p.goto('http://localhost:4321/', { waitUntil:'domcontentloaded' });
const early = await p.locator('.hero__title .ln > i').first().evaluate(e=>getComputedStyle(e).transform);
await p.waitForTimeout(2600);
const late = await p.locator('.hero__title .ln > i').first().evaluate(e=>getComputedStyle(e).transform);
ok('headline starts masked', early !== 'none');
ok('headline settles open', late === 'none' || late === 'matrix(1, 0, 0, 1, 0, 0)');
ok('html gets is-loaded', await p.locator('html.is-loaded').count() === 1);

ok('stat counted up to 59', await countedUp(p));

const wallT = await p.locator('.hero__wall').evaluate(e=>getComputedStyle(e).transform);
ok('wall pull-back finished', wallT === 'none' || wallT === 'matrix(1, 0, 0, 1, 0, 0)');

// Parallax
await p.evaluate(()=>{document.documentElement.style.scrollBehavior='auto';window.scrollTo(0,400);});
await p.waitForTimeout(400);
const py = await p.locator('[data-parallax]').evaluate(e=>e.style.getPropertyValue('--py'));
ok(`parallax offset applied (${py})`, py && parseFloat(py) > 10);
await p.close();

// Regression: at ~720px viewport heights the hero stat row lands on the fold
// with only a sliver of each number showing. A 0.6 observer threshold never
// fired there, so the stats sat at 0 until something else scrolled the page.
p = await b.newPage({ viewport:{width:1440,height:720} });
p.on('pageerror', e=>errs.push(e.message));
await p.goto('http://localhost:4321/', { waitUntil:'domcontentloaded' });
ok('stat counts up with the row on the fold (720px tall)', await countedUp(p));
await p.close();

// FLIP filter: tiles should be mid-transition right after a filter click
p = await b.newPage({ viewport:{width:1440,height:900} });
p.on('pageerror', e=>errs.push(e.message));
await p.goto('http://localhost:4321/work/', { waitUntil:'networkidle' });
await p.locator('[data-filter="health-care"]').click();
await p.waitForTimeout(60);
const moving = await p.locator('.tile.is-moving, .tile.is-entering').count();
ok(`FLIP animates tiles (${moving} in motion)`, moving > 0);
await p.waitForTimeout(1200);
const stuck = await p.locator('.tile.is-moving').count();
ok('FLIP cleans up after itself', stuck === 0);
const hc = await p.locator('.tile:not(.is-hidden)').count();
ok(`health-care filter -> ${hc}`, hc === 28);

// Cursor
await p.mouse.move(700, 600);
await p.waitForTimeout(200);
await p.locator('.tile:not(.is-hidden)').first().hover();
await p.waitForTimeout(400);
ok('VIEW cursor activates over a tile', await p.locator('.cursor.is-on').count() === 1);
await p.close();

// Reduced motion: nothing should be transformed away
p = await b.newPage({ viewport:{width:1440,height:900}, reducedMotion:'reduce' });
p.on('pageerror', e=>errs.push(e.message));
await p.goto('http://localhost:4321/', { waitUntil:'networkidle' });
await p.waitForTimeout(500);
const rm = await p.locator('.hero__title .ln > i').first().evaluate(e=>getComputedStyle(e).transform);
ok('reduced-motion: headline not masked', rm === 'none' || rm === 'matrix(1, 0, 0, 1, 0, 0)');
const rmStat = await p.locator('[data-count="59"]').textContent();
ok('reduced-motion: stat shows final value', rmStat === '59');
await p.close();

ok('no JS errors anywhere', errs.length === 0);
if (errs.length) console.log(errs);
await b.close();
console.log(log.join('\n'));
