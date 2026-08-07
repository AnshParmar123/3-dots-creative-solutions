import { chromium } from 'playwright';
const b = await chromium.launch();
const jobs = [
  ['svc-proof', '/services/', '#outdoor'],
  ['svc-brand', '/services/', '#brand-identity'],
  ['practices', '/about/', '.practices'],
  ['brief', '/contact/', '.brief'],
];
for (const [name, path, sel] of jobs) {
  const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
  await p.goto('http://localhost:4321' + path, { waitUntil: 'networkidle' });
  await p.evaluate(() => document.documentElement.style.scrollBehavior='auto');
  const el = p.locator(sel).first();
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(900);
  await el.screenshot({ path: `/tmp/shots/x-${name}.png` });
  await p.close();
}
await b.close(); console.log('ok');
