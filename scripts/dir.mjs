import { chromium } from 'playwright';
const b = await chromium.launch();
for (const [name, path] of [['dir-about','/about/'],['dir-home','/']]) {
  const p = await b.newPage({ viewport:{width:1440,height:900} });
  await p.goto('http://localhost:4321'+path, { waitUntil:'networkidle' });
  await p.evaluate(()=>document.documentElement.style.scrollBehavior='auto');
  const el = p.locator('.dir').first();
  await el.scrollIntoViewIfNeeded();
  await p.waitForTimeout(1100);
  await el.screenshot({ path:`/tmp/shots/${name}.png` });
  await p.close();
}
await b.close(); console.log('ok');
