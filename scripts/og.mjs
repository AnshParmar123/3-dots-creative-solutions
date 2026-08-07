// Regenerate the social share card: node og.mjs (dev server must be running)
import { chromium } from "playwright";

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1200, height: 630 } });
await page.goto("http://localhost:4321/og-card/", { waitUntil: "networkidle" });
await page.waitForTimeout(1200);
await page.screenshot({ path: "../public/images/og.jpg", quality: 90, type: "jpeg" });
await browser.close();
console.log("wrote ../public/images/og.jpg");
