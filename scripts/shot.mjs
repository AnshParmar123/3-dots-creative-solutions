import { chromium } from "playwright";

const pages = [
  ["home", "/"],
  ["work", "/work/"],
  ["about", "/about/"],
  ["services", "/services/"],
  ["contact", "/contact/"],
];

const browser = await chromium.launch();

// Scroll the whole page so IntersectionObserver reveals fire before capture.
async function settle(page) {
  await page.evaluate(async () => {
    const html = document.documentElement;
    const prev = html.style.scrollBehavior;
    html.style.scrollBehavior = "auto"; // smooth scrolling defeats scripted scroll

    const step = window.innerHeight * 0.6;
    for (let y = 0; y < html.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 220));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 300));
    html.style.scrollBehavior = prev;
  });
  // let lazy images that just entered the viewport finish decoding
  await page.evaluate(() =>
    Promise.all(
      Array.from(document.images)
        .filter((i) => !i.complete)
        .map((i) => new Promise((r) => { i.onload = i.onerror = r; })),
    ),
  );
  await page.waitForTimeout(600);
}

for (const [name, path] of pages) {
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
  await page.goto("http://localhost:4321" + path, { waitUntil: "networkidle", timeout: 30000 });
  await page.waitForTimeout(900);
  await page.screenshot({ path: `/tmp/shots/${name}-fold.png` });
  await settle(page);
  await page.screenshot({ path: `/tmp/shots/${name}-full.png`, fullPage: true });
  await page.close();
}

const m = await browser.newPage({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true });
await m.goto("http://localhost:4321/", { waitUntil: "networkidle" });
await m.waitForTimeout(800);
await m.screenshot({ path: "/tmp/shots/mobile-home.png" });
await settle(m);
await m.screenshot({ path: "/tmp/shots/mobile-home-full.png", fullPage: true });
await m.close();

const lb = await browser.newPage({ viewport: { width: 1440, height: 900 } });
await lb.goto("http://localhost:4321/work/", { waitUntil: "networkidle" });
await lb.locator(".tile").first().click();
await lb.waitForTimeout(700);
await lb.screenshot({ path: "/tmp/shots/lightbox.png" });
await lb.close();

await browser.close();
console.log("done");
