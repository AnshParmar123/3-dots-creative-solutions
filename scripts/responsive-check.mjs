import { chromium } from "playwright";

// Every page, across the widths real visitors actually arrive on. 320 is the
// narrowest phone still in use; 1920 is the widest common desktop.
const pages = [
  ["home", "/"],
  ["work", "/work/"],
  ["services", "/services/"],
  ["about", "/about/"],
  ["contact", "/contact/"],
  ["404", "/nonexistent"],
];

const viewports = [
  ["320", 320, 568],
  ["360", 360, 740],
  ["375", 375, 667],
  ["390", 390, 844],
  ["430", 430, 932],
  ["560", 560, 900],
  ["768", 768, 1024],
  ["900", 900, 1200],
  ["1024", 1024, 768],
  ["1280", 1280, 800],
  ["1440", 1440, 900],
  ["1920", 1920, 1080],
];

const base = "http://localhost:4321";
const browser = await chromium.launch();
const problems = [];

// Scroll everything into view so IntersectionObserver reveals fire — an
// element hidden behind `opacity: 0` still has a box, but lazy images do not.
async function settle(page) {
  await page.evaluate(async () => {
    const html = document.documentElement;
    html.style.scrollBehavior = "auto";
    const step = window.innerHeight * 0.8;
    for (let y = 0; y < html.scrollHeight; y += step) {
      window.scrollTo(0, y);
      await new Promise((r) => setTimeout(r, 90));
    }
    window.scrollTo(0, 0);
    await new Promise((r) => setTimeout(r, 150));
  });
}

for (const [pname, path] of pages) {
  for (const [vname, width, height] of viewports) {
    const isPhone = width <= 560;
    const page = await browser.newPage({
      viewport: { width, height },
      isMobile: isPhone,
      hasTouch: isPhone,
      deviceScaleFactor: 1,
    });
    await page.goto(base + path, { waitUntil: "networkidle", timeout: 45000 });
    await page.waitForTimeout(450);
    await settle(page);

    const report = await page.evaluate((vw) => {
      const out = { overflow: 0, offenders: [], gutters: [], tiny: [] };
      const html = document.documentElement;
      out.overflow = html.scrollWidth - vw;

      const describe = (el) => {
        const id = el.id ? `#${el.id}` : "";
        const cls = typeof el.className === "string" && el.className
          ? "." + el.className.trim().split(/\s+/).slice(0, 2).join(".")
          : "";
        return `${el.tagName.toLowerCase()}${id}${cls}`;
      };

      // Overflow that an ancestor clips is deliberate (the parallax hero is
      // sized past the viewport on purpose and lives inside `overflow:
      // hidden`). Stop before <body>, whose own overflow-x: hidden would
      // otherwise mask every genuine problem on the page.
      const clippedByAncestor = (el) => {
        let n = el.parentElement;
        while (n && n !== document.body) {
          const o = getComputedStyle(n);
          if (o.overflow !== "visible" || o.overflowX !== "visible") return true;
          n = n.parentElement;
        }
        return false;
      };

      // Anything sticking out past the right edge, or pulled off the left.
      for (const el of document.querySelectorAll("body *")) {
        const s = getComputedStyle(el);
        if (s.display === "none" || s.visibility === "hidden") continue;
        // Fixed/absolute decor is allowed to sit outside deliberately.
        if (s.position === "fixed") continue;
        if (clippedByAncestor(el)) continue;
        const r = el.getBoundingClientRect();
        if (r.width === 0 || r.height === 0) continue;
        const over = Math.round(r.right - vw);
        const under = Math.round(r.left);
        if (over > 1 || under < -1) {
          out.offenders.push({
            sel: describe(el),
            over: over > 1 ? over : 0,
            under: under < -1 ? under : 0,
            w: Math.round(r.width),
          });
        }
      }
      // Dedupe and keep the worst few.
      const seen = new Map();
      for (const o of out.offenders) {
        const prev = seen.get(o.sel);
        if (!prev || Math.abs(o.over || o.under) > Math.abs(prev.over || prev.under)) {
          seen.set(o.sel, o);
        }
      }
      out.offenders = [...seen.values()]
        .sort((a, b) => Math.abs(b.over || b.under) - Math.abs(a.over || a.under))
        .slice(0, 6);

      // The page gutter should be identical for every .wrap on the page.
      const lefts = new Set();
      for (const w of document.querySelectorAll(".wrap")) {
        const r = w.getBoundingClientRect();
        if (r.width > 0) lefts.add(Math.round(r.left));
      }
      out.gutters = [...lefts];

      return out;
    }, width);

    // Tap-target floor only matters where there is a finger.
    if (isPhone) {
      report.tiny = await page.evaluate(() => {
        const small = [];
        for (const el of document.querySelectorAll("a, button, [role=button]")) {
          const s = getComputedStyle(el);
          if (s.display === "none" || s.visibility === "hidden" || s.opacity === "0") continue;
          const r = el.getBoundingClientRect();
          if (r.width === 0 || r.height === 0) continue;
          if (r.height < 32 || r.width < 32) {
            small.push(`${el.tagName.toLowerCase()}"${(el.textContent || "").trim().slice(0, 22)}" ${Math.round(r.width)}x${Math.round(r.height)}`);
          }
        }
        return [...new Set(small)].slice(0, 6);
      });
    }

    const tag = `${pname} @ ${vname}`;
    const bad =
      report.overflow > 1 ||
      report.offenders.length > 0 ||
      report.gutters.length > 1 ||
      (report.tiny && report.tiny.length > 0);

    if (bad) {
      problems.push({ tag, ...report });
      console.log(`\nFAIL  ${tag}`);
      if (report.overflow > 1) console.log(`      h-scroll: +${report.overflow}px`);
      if (report.gutters.length > 1) console.log(`      gutters differ: ${report.gutters.join(", ")}`);
      for (const o of report.offenders) {
        console.log(`      ${o.sel} w=${o.w} ${o.over ? `over right by ${o.over}px` : `left at ${o.under}px`}`);
      }
      for (const t of report.tiny || []) console.log(`      tap target ${t}`);
    } else {
      console.log(`PASS  ${tag}`);
    }

    await page.close();
  }
}

await browser.close();
console.log(
  problems.length
    ? `\n${problems.length} viewport/page combination(s) with problems.`
    : "\nAll pages clean at every viewport.",
);
process.exit(problems.length ? 1 : 0);
