import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport: { width: 1440, height: 900 } });
await p.goto('http://localhost:4321/', { waitUntil: 'networkidle' });
await p.evaluate(() => document.documentElement.style.scrollBehavior='auto');
await p.evaluate(async () => { for (let y=0;y<document.documentElement.scrollHeight;y+=500){window.scrollTo(0,y);await new Promise(r=>setTimeout(r,180));} window.scrollTo(0,0); });
await p.waitForTimeout(1200);
for (const [name, sel] of [['clients','.section--paper .wrap'],['homegrid','.grid'],['dir','.dir'],['svcs','.svcs']]) {
  const el = await p.locator(sel).first();
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(700);
  await el.screenshot({ path: `/tmp/shots/crop-${name}.png` });
}
await b.close(); console.log('ok');
