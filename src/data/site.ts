// Company profile content, updated with the client brief and supplied color samples.

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
    "A-803, Raj Akshay, PDU Road",
    "Pleasant Park, Near Don Bosco English School",
    "Mira Road East, Thane 401107, Maharashtra, India",
  ],
  phones: [
    { display: "+91 98693 70124", href: "tel:+919869370124" },
    { display: "+91 99691 69263", href: "tel:+919969169263" },
  ],
  email: "creativesolution3dots@gmail.com",
  whatsapp: "919869370124",
  maps: "https://maps.app.goo.gl/cdLJBS4bUxP98q9A9?g_st=iw",
};

// The brief form posts to Web3Forms, which is free and needs no account — get
// an access key emailed to you at https://web3forms.com and paste it below.
// That is the only step; the endpoint and fields are already wired.
//
// While the key is empty the form falls back to opening the visitor's mail
// client, which silently fails for anyone on webmail. See README.
export const formAccessKey = "";
export const formEndpoint = "https://api.web3forms.com/submit";

export const director = {
  name: "Awdhut Pandharinath Sawant",
  role: "Creative Director",
  years: 21,
  // New color portrait supplied by the client.
  photo: { src: "/images/director.jpg", w: 693, h: 675 },
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

// `evidence` lists portfolio slugs that genuinely demonstrate the group. Some
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
    evidence: ["logo-02", "logo-06", "logo-09"],
  },
  {
    slug: "brand-identity",
    title: "Brand identity",
    items: [
      "Website design",
      "Packaging design",
      "Brand and event logo design",
    ],
    evidence: ["logo-01", "packaging-03", "packaging-04", "packaging-08"],
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
    evidence: ["otc-01", "otc-03", "health-care-19"],
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
    evidence: ["logo-03", "logo-08", "otc-02"],
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
    evidence: ["health-care-02", "health-care-11", "otc-09"],
  },
  {
    slug: "social-media-marketing",
    title: "Social media marketing",
    items: [
      "Social media creatives",
      "Campaign planning",
      "Content calendars",
      "Paid promotion support",
    ],
    evidence: [],
  },
  {
    slug: "press-and-film",
    title: "Press and film",
    items: [
      "Press and magazine ads",
      "TVCs and radio jingles",
      "Cinema slides and promotional videos",
      "Corporate AVs",
      "Event ideas",
      "Exhibition panel design",
      "Corporate photography",
    ],
    evidence: ["otc-09", "otc-10", "otc-17"],
  },
];

// Flat list used where a single running list of capabilities reads better.
export const services = serviceGroups.map((group) => group.title);

export const clients = {
  healthcare: [
    { name: "Mankind", logo: "/images/clients/mankind.png" },
    { name: "Ajanta Pharma Limited", logo: "/images/clients/ajanta-pharma.png" },
    { name: "Micro Labs", logo: "/images/clients/micro-labs.png" },
    { name: "Regaliz", logo: "/images/clients/regaliz.png" },
    { name: "Akumentis", logo: "/images/clients/akumentis.png" },
    { name: "Translumina", logo: "/images/clients/translumina.png" },
    { name: "Muller & Phipps (I) Ltd", logo: "/images/clients/muller-phipps.png" },
  ],
  otc: [
    { name: "Flubbers", logo: "/images/clients/flubbers.png" },
    { name: "Ajit Sweets", logo: "/images/clients/ajit-sweets.png" },
    { name: "Malu Engineers Pvt. Ltd.", logo: "/images/clients/malu-engineers.png" },
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

export const logoWork: Work[] = [
  { src: "/images/work/logo-01.webp", alt: 'Treatos mango drink brand identity' },
  { src: "/images/work/logo-02.webp", alt: 'Fidelity Lifesciences logo and office identity' },
  { src: "/images/work/logo-03.webp", alt: 'Naples Staples restaurant identity' },
  { src: "/images/work/logo-04.webp", alt: 'Laxmi Eye Institute identity' },
  { src: "/images/work/logo-05.webp", alt: 'Brandak product identity' },
  { src: "/images/work/logo-06.webp", alt: 'Apulki Charitable Trust logo' },
  { src: "/images/work/logo-07.webp", alt: 'Brochef brand and product identity' },
  { src: "/images/work/logo-08.webp", alt: 'BAPS multi specialty hospital identity' },
  { src: "/images/work/logo-09.webp", alt: 'Abhison Engineering Solutions identity' },
];

export const packagingWork: Work[] = [
  { src: "/images/work/packaging-01.webp", alt: 'DGMA product packaging' },
  { src: "/images/work/packaging-02.webp", alt: 'Cavifast toothpaste box packaging' },
  { src: "/images/work/packaging-03.webp", alt: 'Samosa snack box packaging' },
  { src: "/images/work/packaging-04.webp", alt: 'Half Ticket confectionery packaging' },
  { src: "/images/work/packaging-05.webp", alt: 'BYTCOblack charcoal toothpaste packaging' },
  { src: "/images/work/packaging-06.webp", alt: 'Cavisan toothpaste pack design' },
  { src: "/images/work/packaging-07.webp", alt: 'Cavisan toothpaste product packaging' },
  { src: "/images/work/packaging-08.webp", alt: 'Treatos mango and guava pulp packaging' },
  { src: "/images/work/packaging-09.webp", alt: 'Tic Tac product packaging' },
];

export const otcWork: Work[] = [
  { src: "/images/work/otc-01.webp", alt: 'World No Tobacco Day campaign' },
  { src: "/images/work/otc-02.webp", alt: 'Pikolan fans advertising concept' },
  { src: "/images/work/otc-03.webp", alt: 'UNICEF DO-NATION campaign' },
  { src: "/images/work/otc-04.webp", alt: 'Cockroach pest control ad' },
  { src: "/images/work/otc-05.webp", alt: 'Colgate Total campaign' },
  { src: "/images/work/otc-06.webp", alt: 'Hair colour without ammonia and PPD campaign' },
  { src: "/images/work/otc-07.webp", alt: 'Mother and baby care campaign' },
  { src: "/images/work/otc-08.webp", alt: 'Dairy product campaign' },
  { src: "/images/work/otc-09.webp", alt: 'India Today print ad' },
  { src: "/images/work/otc-10.webp", alt: 'The Times of India print ad' },
  { src: "/images/work/otc-11.webp", alt: 'Medimix Ayurveda campaign' },
  { src: "/images/work/otc-12.webp", alt: 'Long and strong hair campaign' },
  { src: "/images/work/otc-13.webp", alt: 'Volini sports campaign' },
  { src: "/images/work/otc-14.webp", alt: 'Clear dandruff care campaign' },
  { src: "/images/work/otc-15.webp", alt: 'Bisleri Mountain campaign' },
  { src: "/images/work/otc-16.webp", alt: 'Corporate services campaign' },
  { src: "/images/work/otc-17.webp", alt: 'Indian Railways anti-smoking campaign' },
  { src: "/images/work/otc-18.webp", alt: 'Surf Excel print ad' },
];

export const healthcareWork: Work[] = [
  { src: "/images/work/health-care-01.webp", alt: 'Firmatone health care ad' },
  { src: "/images/work/health-care-02.webp", alt: 'Chronic urticaria patient campaign' },
  { src: "/images/work/health-care-03.webp", alt: 'Macalvit syrup campaign' },
  { src: "/images/work/health-care-04.webp", alt: 'ES-Ulcizone GERD campaign' },
  { src: "/images/work/health-care-05.webp", alt: 'Linmox precision campaign' },
  { src: "/images/work/health-care-06.webp", alt: 'Voltaflam health care ad' },
  { src: "/images/work/health-care-07.webp", alt: 'Skin care product campaign' },
  { src: "/images/work/health-care-08.webp", alt: 'Apmalt iron supplement campaign' },
  { src: "/images/work/health-care-09.webp", alt: 'Neurology launch campaign' },
  { src: "/images/work/health-care-10.webp", alt: 'Co Orixo visual aid' },
  { src: "/images/work/health-care-11.webp", alt: 'ES-Ulcizone quick relief campaign' },
  { src: "/images/work/health-care-12.webp", alt: 'Juveskin product campaign' },
  { src: "/images/work/health-care-13.webp", alt: 'Ibumol pain relief campaign' },
  { src: "/images/work/health-care-14.webp", alt: 'Just One for All health care campaign' },
  { src: "/images/work/health-care-15.webp", alt: 'Just 2 Drops eye care campaign' },
  { src: "/images/work/health-care-16.webp", alt: 'Ocular allergy relief campaign' },
  { src: "/images/work/health-care-17.webp", alt: 'Weight management health care campaign' },
  { src: "/images/work/health-care-18.webp", alt: 'Breastfeeding immunity campaign' },
  { src: "/images/work/health-care-19.webp", alt: 'Ridmal mosquito concept' },
  { src: "/images/work/health-care-20.webp", alt: 'Mental health awareness poster' },
  { src: "/images/work/health-care-21.webp", alt: 'Cardiology conference creative' },
  { src: "/images/work/health-care-22.webp", alt: 'Skin repair detailer' },
  { src: "/images/work/health-care-23.webp", alt: 'Truderma sunscreen campaign' },
  { src: "/images/work/health-care-24.webp", alt: 'Alzheimer’s patient campaign' },
  { src: "/images/work/health-care-25.webp", alt: 'Collagen backbone campaign' },
  { src: "/images/work/health-care-26.webp", alt: 'Children’s health product concept' },
  { src: "/images/work/health-care-27.webp", alt: 'Dyldes anti-allergic campaign' },
  { src: "/images/work/health-care-28.webp", alt: 'Joint pain relief campaign' },
  { src: "/images/work/health-care-29.webp", alt: 'Polysorbate 80 product campaign' },
];

function decorate(item: Work, category: string, categoryLabel: string) {
  const slug = item.src.split("/").pop()!.replace(".webp", "");
  const [w, h] = workDimensions[slug];
  return { ...item, slug, category, categoryLabel, w, h, portrait: h / w > 1.15 };
}

export const workSections = [
  { slug: "logo", title: "Logo", blurb: "Brand identities and logo applications", items: logoWork },
  { slug: "packaging", title: "Packaging", blurb: "Packs and product presentation", items: packagingWork },
  { slug: "otc", title: "OTC", blurb: "Consumer campaigns and corporate communication", items: otcWork },
  { slug: "health-care", title: "Health care", blurb: "Pharma and health care communication", items: healthcareWork },
];

// Round robin across all four categories so the homepage and hero show the range.
export const allWork = (() => {
  const sections = workSections.map((section) =>
    section.items.map((item) => decorate(item, section.slug, section.title))
  );
  const merged: ReturnType<typeof decorate>[] = [];
  for (let i = 0; i < Math.max(...sections.map((section) => section.length)); i++) {
    for (const section of sections) if (section[i]) merged.push(section[i]);
  }
  return merged;
})();
export type WorkItem = (typeof allWork)[number];
const workBySlug = new Map(allWork.map((item) => [item.slug, item]));
export function piecesFor(slugs: string[]) {
  return slugs.map((slug) => workBySlug.get(slug))
    .filter((item): item is NonNullable<typeof item> => Boolean(item));
}
export const heroWall = allWork.slice(0, 20).map((item) => item.src);
export const workCount = allWork.length;
