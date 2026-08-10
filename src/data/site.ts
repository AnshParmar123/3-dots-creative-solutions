// All content below is taken from the 3DOTS Creative Solutions company profile
// (3DOTS CS PROFILE 2.pdf, Profile 2023). Nothing here is invented.

import { workDimensions } from "./work-dimensions";

export const agency = {
  name: "3DOTS Creative Solutions",
  short: "3DOTS",
  promise: "Accelerate Business Growth",
  descriptor: "Advertising agency",
};

export const contact = {
  name: "Awdhut P. Sawant",
  role: "Creative Director",
  address: [
    "Swapnapurti CHSL, P-6, Flat-303",
    "Nupur Nagar, Mira Road (E)",
    "Thane 401107, Maharashtra, India",
  ],
  phones: [
    { display: "+91 98693 70124", href: "tel:+919869370124" },
    { display: "+91 99691 69263", href: "tel:+919969169263" },
  ],
  email: "creativesolution3dots@gmail.com",
  whatsapp: "919869370124",
};

// Set this to a real endpoint before launch (Web3Forms, Formspree, Netlify
// Forms all take a plain POST). While it is empty the brief form falls back to
// opening the visitor's mail client, which is unreliable — see README.
export const formEndpoint = "";

export const director = {
  name: "Awdhut Pandharinath Sawant",
  role: "Creative Director",
  years: 21,
  // From page 3 of the profile, already duotoned to the deck's blue.
  photo: { src: "/images/director.jpg", w: 485, h: 490 },
  qualifications: [
    "BFA (Applied Art)",
    "Diploma in Civil Engineering",
    "Diploma in Acting, Modeling & Film Direction",
    "Diploma in Computer Graphics",
    "Diploma in Photography",
  ],
  bio: [
    "An award-winning creative director with 21 years of experience in the advertising and film industry, with a deep understanding of the industry and a commitment to delivering the best quality output.",
    "His multi-faceted academic training and qualifications ensure that he is equipped to handle any challenge that comes his way. He provides attention to detail and has an easy grasp of client needs, making him a valuable asset to any project. Plus, he is always up to date with the latest technology in advertising and film.",
  ],
};

// `evidence` lists portfolio slugs that genuinely demonstrate the group. Two
// groups have no matching piece in the profile, so they carry none rather than
// borrowing work that does not show them.
export const serviceGroups = [
  {
    slug: "corporate-identity",
    title: "Corporate identity",
    items: [
      "Logo development",
      "ID card design",
      "Letterhead and envelope design",
      "Tagline creation",
    ],
    evidence: [],
  },
  {
    slug: "brand-identity",
    title: "Brand identity",
    items: [
      "Website design",
      "Packaging design",
      "Brand and event logo design",
    ],
    evidence: [
      "otc-cavifast",
      "otc-bytcoblack",
      "otc-half-ticket",
      "otc-surf-excel",
    ],
  },
  {
    slug: "stationery",
    title: "Stationery",
    items: ["Forms", "Invoices", "Labels", "Gift coupons", "Menus"],
    evidence: [],
  },
  {
    slug: "concept-creation",
    title: "Concept creation",
    items: [
      "Communication text and visual ideas",
      "POP: posters, dispensers, danglers, stickers",
    ],
    evidence: [
      "hc-hiv",
      "otc-no-tobacco-day",
      "hc-doctors-day",
      "hc-ppi-rhino",
    ],
  },
  {
    slug: "outdoor",
    title: "Outdoor",
    items: [
      "Kiosk design",
      "Hoardings",
      "Brand activation",
      "Bus shelter design",
    ],
    evidence: [
      "otc-railways-smoking",
      "otc-railways-danger",
      "otc-videocon",
    ],
  },
  {
    slug: "collateral",
    title: "Collateral",
    items: [
      "Leaflets and brochures",
      "Catalogues and dockets",
      "Direct mailers, folders, calendars",
      "Greeting cards, trophies, certificates",
      "Annual reports, PPTs, newsletters, invitation cards",
    ],
    evidence: [
      "hc-apmalt-news",
      "hc-quintana-rhinitis",
      "hc-rebless",
      "hc-post-corona-care",
    ],
  },
  {
    slug: "press-and-film",
    title: "Press and film",
    items: [
      "Press and magazine ads",
      "TVCs and radio jingles",
      "Cinema slides and promotional videos",
      "Corporate AVs",
      "Event ideas and photography",
    ],
    evidence: [
      "otc-times-of-india",
      "otc-icici",
      "otc-bayliner",
      "otc-kotak",
    ],
  },
];

// Flat list used where a single running list of capabilities reads better.
export const services = serviceGroups.map((group) => group.title);

export const clients = {
  healthcare: [
    { name: "Mankind", logo: "/images/clients/mankind.png" },
    { name: "Ajanta Pharma Limited", logo: "/images/clients/ajanta-pharma.png" },
    { name: "Micro Labs", logo: "/images/clients/micro-labs.png" },
    { name: "Precia Lifesciences", logo: "/images/clients/precia-lifesciences.png" },
    { name: "Translumina", logo: "/images/clients/translumina.png" },
    { name: "Muller & Phipps (I) Ltd", logo: "/images/clients/muller-phipps.png" },
  ],
  otc: [
    { name: "Flubbers", logo: "/images/clients/flubbers.png" },
    { name: "Ajit Sweets", logo: "/images/clients/ajit-sweets.png" },
    { name: "Sahaj Electronics", logo: "/images/clients/sahaj-electronics.png" },
    { name: "Triveni Global", logo: "/images/clients/triveni-global.png" },
    { name: "Falah International", logo: "/images/clients/falah-international.png" },
    { name: "EDS Technologies", logo: "/images/clients/eds-technologies.png" },
    { name: "Edelweiss Housing Finance", logo: "/images/clients/edelweiss.png" },
    { name: "JDB", logo: "/images/clients/jdb.png" },
    { name: "Abhison Engineering LLP", logo: "/images/clients/abhison.png" },
  ],
};

export const clientCount =
  clients.healthcare.length + clients.otc.length;

export type ClientLogo = (typeof clients.healthcare)[number];

type Work = { src: string; alt: string };

export const healthcareWork: Work[] = [
  { src: "/images/work/hc-linmox.jpg", alt: "Linmox — expertise in precision always win trust" },
  { src: "/images/work/hc-macalvit.jpg", alt: "Macalvit Syrup — 100% vegetarian calcium syrup in pregnancy" },
  { src: "/images/work/hc-dyldes.jpg", alt: "Dyldes — like coffee, keeps you alert, anti-allergic with no sedation" },
  { src: "/images/work/hc-es-ulcizone.jpg", alt: "ES-Ulcizone — 70% upper GI ulcers induced by NSAIDs" },
  { src: "/images/work/hc-apmalt-boxing.jpg", alt: "Apmalt — highest elemental iron, strong enough to beat competitor" },
  { src: "/images/work/hc-quintana-syrup.jpg", alt: "Quintana Syrup — allergic rhinitis detailer" },
  { src: "/images/work/hc-doctors-day.jpg", alt: "God cannot be everywhere so he sends doctors — Doctor's Day" },
  { src: "/images/work/hc-hiv.jpg", alt: "Stick to only one partner and cut the risk of HIV" },
  { src: "/images/work/hc-unbeatable-3.jpg", alt: "Unbeatable 3 — beat the multi tablets malaria dose" },
  { src: "/images/work/hc-ibumol.jpg", alt: "Ibumol — relieve tension in pain and fever" },
  { src: "/images/work/hc-rebless.jpg", alt: "Rebless Rivaroxaban — meta-analysis on VTE in SARS-CoV-2 patients" },
  { src: "/images/work/hc-lactonic.jpg", alt: "Lactonic — six months of breast feeding enhances life long immunity" },
  { src: "/images/work/hc-orixo.jpg", alt: "Orixo — creating self mediated pathway" },
  { src: "/images/work/hc-world-brain-day.jpg", alt: "World Brain Day — thank you doctor" },
  { src: "/images/work/hc-uti-doors.jpg", alt: "60% and 12% have at least one UTI during their lifetime" },
  { src: "/images/work/hc-just-2-drops.jpg", alt: "Just 2 Drops — are your patients eye itchy" },
  { src: "/images/work/hc-apramol.jpg", alt: "Apramol Effervescent — fever and pain relief in 15 minutes" },
  { src: "/images/work/hc-combimal.jpg", alt: "Combimal — prevention of malaria during pregnancy" },
  { src: "/images/work/hc-quintana-rhinitis.jpg", alt: "Quintana Mequitazine — allergic rhinitis symptom wheel" },
  { src: "/images/work/hc-hypertension-day.jpg", alt: "World Hypertension Day — measure your blood pressure accurately" },
  { src: "/images/work/hc-urticaria.jpg", alt: "Is chronic urticaria preventing you from daily activities" },
  { src: "/images/work/hc-ocular-allergy.jpg", alt: "In ocular allergy relieve your patients from ocular itch within 3 minutes" },
  { src: "/images/work/hc-ppi-rhino.jpg", alt: "There are many rhinos but African rhino is one of its kind — PPI campaign" },
  { src: "/images/work/hc-orixo-pathway.jpg", alt: "Orixo — the only fluoroquinolone which creates a unique pathway" },
  { src: "/images/work/hc-gerd-winner.jpg", alt: "ES-Ulcizone Plus — who wants to be a GERD winner" },
  { src: "/images/work/hc-apmalt-news.jpg", alt: "Apmalt — breaking news, highest elemental iron 125 mg / 5 ml" },
  { src: "/images/work/hc-reinvention.jpg", alt: "Re-invention is more powerful than the actual invention" },
  { src: "/images/work/hc-post-corona-care.jpg", alt: "Chhattisgarh State Association of Physicians of India — virtual conference on post corona care" },
];

export const otcWork: Work[] = [
  { src: "/images/work/otc-colgate-total.jpg", alt: "Colgate Total — advance whitening and 12 hrs germ protection" },
  { src: "/images/work/otc-colgate-total-2.jpg", alt: "Colgate Total — advance whitening and 12 hrs germ protection, coconut execution" },
  { src: "/images/work/otc-bisleri.jpg", alt: "Bisleri Mountain — pavitra to sab jal hai, shuddh sirf Bisleri" },
  { src: "/images/work/otc-maggi.jpg", alt: "Maggi — jab chahe Maggi ho jaye" },
  { src: "/images/work/otc-long-hair.jpg", alt: "Long and strong hair — hair oil campaign" },
  { src: "/images/work/otc-no-tobacco-day.jpg", alt: "World No Tobacco Day — world's deadliest weapon, quit smoking" },
  { src: "/images/work/otc-unicef-donation.jpg", alt: "UNICEF — DO-NATION, this Independence Day it's your turn" },
  { src: "/images/work/otc-triveni-frozen.jpg", alt: "Triveni Global — ready to eat frozen foods, snack time in just 3 minutes" },
  { src: "/images/work/otc-medimix.jpg", alt: "Medimix Advance Ayurveda — for pimple free face within 3 days" },
  { src: "/images/work/otc-surf-excel.jpg", alt: "Surf Excel — effective stain remover for your children's wares" },
  { src: "/images/work/otc-railways-smoking.jpg", alt: "Indian Railways — smoking is injurious to your health and so of other's" },
  { src: "/images/work/otc-railways-danger.jpg", alt: "Indian Railways — carrying volatile material in train means travelling with danger" },
  { src: "/images/work/otc-treatabs-mango.jpg", alt: "Treatabs — frozen Alphonso mango bar, ab har mausam mein upalabdh" },
  { src: "/images/work/otc-rin-ala.jpg", alt: "Rin Ala — fabric whitener" },
  { src: "/images/work/otc-bayliner.jpg", alt: "Bayliner — enjoy the aquatic fun with your own Bayliner" },
  { src: "/images/work/otc-icici.jpg", alt: "ICICI Bank Business Banking — forex is volatile, start protecting" },
  { src: "/images/work/otc-kotak.jpg", alt: "Kotak — trusted partner gives impetus to business" },
  { src: "/images/work/otc-ajit-sweets.jpg", alt: "Ajit Sweets — unique gift option for chocolates, dry fruits and other sweets" },
  { src: "/images/work/otc-bytcoblack.jpg", alt: "BYTCOblack charcoal toothpaste" },
  { src: "/images/work/otc-cavifast.jpg", alt: "Cavisan and Cavifast toothpaste range" },
  { src: "/images/work/otc-ammonia-ppd.jpg", alt: "Colorbar hair colour — ammonia aur PPD nahi, to sab kuch sahi" },
  { src: "/images/work/otc-cavisan.jpg", alt: "Cavisan — thanda ya garam khaate daanto mein jhanjhanahat ka dar" },
  { src: "/images/work/otc-half-ticket.jpg", alt: "Half Ticket — free surprise gift inside pack design" },
  { src: "/images/work/otc-rumecin.jpg", alt: "Rumecin power — ab behegi doodh ki dhaara, dairy campaign" },
  { src: "/images/work/otc-pidilite.jpg", alt: "Mother and baby care campaign" },
  { src: "/images/work/otc-cosmetic-surgeon.jpg", alt: "The Cosmetic Surgeon — life is beautiful if you look beautiful" },
  { src: "/images/work/otc-times-of-india.jpg", alt: "The Times of India campaign" },
  { src: "/images/work/otc-videocon.jpg", alt: "Videocon Hitech GHz — tu tu mai mai" },
  { src: "/images/work/otc-magnolia-pizza.jpg", alt: "The real artisan pizza — extra virgin olive oil" },
  { src: "/images/work/otc-cockroach.jpg", alt: "Cockroach Mardobhai — disabler for cockroaches" },
  { src: "/images/work/otc-india-today.jpg", alt: "India Today — when amidst the enmity, enemies were honoured" },
];

// Attach measured intrinsic size, and derive orientation from the real file
// rather than by eye.
function decorate(item: Work, category: string, categoryLabel: string) {
  const slug = item.src.split("/").pop()!.replace(".jpg", "");
  const [w, h] = workDimensions[slug] ?? [800, 1000];
  return {
    ...item,
    slug,
    category,
    categoryLabel,
    w,
    h,
    portrait: h / w > 1.15,
  };
}

// Interleaved so the default "All" view alternates between the two practices
// instead of showing 28 pharma pieces before a single consumer one.
export const allWork = (() => {
  const hc = healthcareWork.map((item) =>
    decorate(item, "health-care", "Health care"),
  );
  const otc = otcWork.map((item) => decorate(item, "otc", "OTC"));

  const merged: typeof hc = [];
  for (let i = 0; i < Math.max(hc.length, otc.length); i += 1) {
    if (hc[i]) merged.push(hc[i]);
    if (otc[i]) merged.push(otc[i]);
  }
  return merged;
})();

export type WorkItem = (typeof allWork)[number];

const workBySlug = new Map(allWork.map((item) => [item.slug, item]));

/** Resolve portfolio slugs (e.g. service `evidence`) to full work items. */
export function piecesFor(slugs: string[]) {
  return slugs
    .map((slug) => workBySlug.get(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}

// A visually varied subset for the hero wall — enough to fill five drifting
// columns without shipping all 59 images above the fold.
export const heroWall = [
  "otc-colgate-total", "hc-linmox", "otc-bisleri", "hc-macalvit", "otc-maggi",
  "hc-doctors-day", "otc-long-hair", "hc-es-ulcizone", "otc-no-tobacco-day",
  "hc-apmalt-boxing", "otc-medimix", "hc-quintana-syrup", "otc-surf-excel",
  "hc-ibumol", "otc-triveni-frozen", "hc-hiv", "otc-treatabs-mango",
  "hc-unbeatable-3", "otc-ammonia-ppd", "hc-orixo",
].map((slug) => `/images/work/${slug}.jpg`);

export const workSections = [
  {
    slug: "health-care",
    title: "Health care",
    blurb:
      "Detailers, visual aids, leave-behinds, day campaigns and conference material for prescription brands",
    items: healthcareWork,
  },
  {
    slug: "otc",
    title: "OTC",
    blurb:
      "Press, packaging, outdoor and public-interest work for consumer brands, banks and institutions",
    items: otcWork,
  },
];
