import { chromium } from 'playwright';
const b = await chromium.launch();
const p = await b.newPage({ viewport:{width:1440,height:900} });
await p.goto('http://localhost:4321/', { waitUntil:'domcontentloaded' });
const frames = [260, 620, 1000, 1500, 2400];
let last = 0;
for (const t of frames) {
  await p.waitForTimeout(t - last); last = t;
  await p.screenshot({ path: `/tmp/shots/seq-${t}.png` });
}
await b.close(); console.log('ok');
