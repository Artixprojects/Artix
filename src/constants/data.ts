export interface ServiceItem {
  name: string;
  price: string;
  floor?: string;
}

export interface ServiceCategory {
  title: string;
  items: ServiceItem[];
}

export interface Package {
  name: string;
  price: string;
  desc: string;
  highlighted?: boolean;
}

export interface NichePackage {
  industry: string;
  basicPrice: string;
  proPrice: string;
}

export const SERVICES: ServiceCategory[] = [
  {
    title: "Design & Creative",
    items: [
      { name: "Logo Design", price: "₹1,999" },
      { name: "Brand Identity Pack", price: "₹4,999" },
      { name: "Social Media Post", price: "₹199" },
      { name: "Carousel (5–8 slides)", price: "₹599" },
      { name: "Thumbnail", price: "₹199" },
      { name: "Presentation", price: "₹1,499" },
      { name: "Ad Creatives", price: "₹699" },
      { name: "Packaging Design", price: "₹2,499" },
    ]
  },
  {
    title: "Video & Editing",
    items: [
      { name: "Reel Edit (≤60s)", price: "₹499" },
      { name: "YouTube Edit (≤10 min)", price: "₹999" },
      { name: "Motion Graphics", price: "₹1,499" },
      { name: "Ad Video", price: "₹2,999" },
    ]
  },
  {
    title: "Social Media",
    items: [
      { name: "Starter Plan", price: "₹3,499/mo" },
      { name: "Growth Plan", price: "₹5,999/mo" },
      { name: "Page Setup", price: "₹999" },
      { name: "Audit", price: "₹1,499" },
    ]
  },
  {
    title: "Website & Tech",
    items: [
      { name: "Landing Page", price: "₹3,999" },
      { name: "Business Website", price: "₹7,999" },
      { name: "SEO Setup", price: "₹1,999" },
      { name: "Domain Setup", price: "₹799" },
    ]
  },
  {
    title: "Marketing & Ads",
    items: [
      { name: "Meta Ads Setup", price: "₹2,999" },
      { name: "Ads Management", price: "₹3,999/mo" },
      { name: "Competitor Analysis", price: "₹1,499" },
      { name: "Funnel Setup", price: "₹3,499" },
    ]
  },
  {
    title: "AI & Automation",
    items: [
      { name: "AI Content", price: "₹1,999/mo" },
      { name: "AI Voiceover", price: "₹349" },
      { name: "Chat Automation", price: "₹2,499" },
      { name: "Repurposing", price: "₹1,299" },
    ]
  },
  {
    title: "Print & Offline",
    items: [
      { name: "Visiting Card", price: "₹349" },
      { name: "Flyer", price: "₹599" },
      { name: "Flex Design", price: "₹699" },
    ]
  }
];

export const GENERAL_PACKAGES: Package[] = [
  { name: "Starter", price: "₹6k–₹8k/month", desc: "Basic content & setup" },
  { name: "Growth", price: "₹10k–₹15k/month", desc: "Content + strategy + consistency", highlighted: true },
  { name: "Premium", price: "₹18k–₹25k/month", desc: "Full management + advanced growth" },
];

export const NICHE_PACKAGES: NichePackage[] = [
  { industry: "Restaurant", basicPrice: "₹3,999/mo", proPrice: "₹7,499/mo" },
  { industry: "Fashion", basicPrice: "₹3,499/mo", proPrice: "₹6,999/mo" },
  { industry: "Real Estate", basicPrice: "₹4,499/mo", proPrice: "₹8,999/mo" },
  { industry: "Salon", basicPrice: "₹2,999/mo", proPrice: "₹5,999/mo" },
  { industry: "Coaching", basicPrice: "₹3,499/mo", proPrice: "₹6,499/mo" },
  { industry: "Medical", basicPrice: "₹3,499/mo", proPrice: "₹6,999/mo" },
  { industry: "Gym", basicPrice: "₹2,999/mo", proPrice: "₹5,999/mo" },
  { industry: "Jewellery", basicPrice: "₹3,999/mo", proPrice: "₹7,499/mo" },
];
