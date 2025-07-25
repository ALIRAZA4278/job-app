// scripts/seedCompanies.js
// Run: node scripts/seedCompanies.js

import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGODB_URI = process.env.MONGODB_URI;

const companySchema = new mongoose.Schema({
  name: String,
  industry: String,
  location: String,
  logo: String,
  size: String,
  openPositions: Number,
  description: String,
  website: String,
});

const Company = mongoose.models.Company || mongoose.model('Company', companySchema);

const companies = [
  {
    name: "Google",
    industry: "Technology",
    location: "Mountain View, CA",
    logo: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg",
    size: "Enterprise",
    openPositions: 45,
    description: "Google is a multinational technology company specializing in Internet-related services and products, including online advertising technologies, search engine, cloud computing, software, and hardware.",
    website: "https://google.com"
  },
  {
    name: "Microsoft",
    industry: "Technology",
    location: "Redmond, WA",
    logo: "https://img.icons8.com/color/144/microsoft.png",
    size: "Enterprise",
    openPositions: 38,
    description: "Microsoft Corporation is an American multinational technology company that produces computer software, consumer electronics, personal computers, and related services.",
    website: "https://microsoft.com"
  },
  {
    name: "Apple",
    industry: "Technology",
    location: "Cupertino, CA",
    logo: "https://img.icons8.com/ios-filled/150/mac-os.png",
    size: "Enterprise",
    openPositions: 32,
    description: "Apple Inc. is an American multinational technology company that specializes in consumer electronics, computer software, and online services.",
    website: "https://apple.com"
  },
  {
    name: "Meta",
    industry: "Social Media",
    location: "Menlo Park, CA",
    logo: "https://img.icons8.com/color/144/meta.png",
    size: "Large",
    openPositions: 28,
    description: "Meta Platforms, Inc., formerly Facebook, Inc., is an American multinational technology conglomerate based in Menlo Park, California.",
    website: "https://meta.com"
  },
  {
    name: "Amazon",
    industry: "E-commerce",
    location: "Seattle, WA",
    logo: "https://img.icons8.com/color/144/amazon.png",
    size: "Enterprise",
    openPositions: 52,
    description: "Amazon.com, Inc. is an American multinational technology company which focuses on e-commerce, cloud computing, digital streaming, and artificial intelligence.",
    website: "https://amazon.com"
  },
  {
    name: "Netflix",
    industry: "Entertainment",
    location: "Los Gatos, CA",
    logo: "https://img.icons8.com/color/144/netflix.png",
    size: "Large",
    openPositions: 18,
    description: "Netflix, Inc. is an American subscription streaming service and production company based in Los Gatos, California.",
    website: "https://netflix.com"
  },
  {
    name: "Tesla",
    industry: "Automotive",
    location: "Austin, TX",
    logo: "https://img.icons8.com/color/144/tesla-logo.png",
    size: "Large",
    openPositions: 35,
    description: "Tesla, Inc. is an American electric vehicle and clean energy company based in Austin, Texas.",
    website: "https://tesla.com"
  },
  {
    name: "Spotify",
    industry: "Music Streaming",
    location: "Stockholm, Sweden",
    logo: "https://img.icons8.com/color/144/spotify.png",
    size: "Medium",
    openPositions: 22,
    description: "Spotify Technology S.A. is a Swedish audio streaming and media services provider founded in 2006.",
    website: "https://spotify.com"
  },
  {
    name: "Uber",
    industry: "Transportation",
    location: "San Francisco, CA",
    logo: "https://img.icons8.com/color/144/uber.png",
    size: "Large",
    openPositions: 31,
    description: "Uber Technologies, Inc. is an American technology company that offers ride-hailing, food delivery, package delivery, couriers, freight transportation, and electric bicycle and motorized scooter rental via mobile app.",
    website: "https://uber.com"
  },
  {
    name: "Airbnb",
    industry: "Hospitality",
    location: "San Francisco, CA",
    logo: "https://img.icons8.com/color/144/airbnb.png",
    size: "Medium",
    openPositions: 19,
    description: "Airbnb, Inc. is an American company that operates an online marketplace for lodging, primarily homestays for vacation rentals, and tourism activities.",
    website: "https://airbnb.com"
  },
  {
    name: "Slack",
    industry: "Communication",
    location: "San Francisco, CA",
    logo: "https://img.icons8.com/color/144/slack-new.png",
    size: "Medium",
    openPositions: 14,
    description: "Slack Technologies, Inc. is an American international software company that develops a proprietary business communication platform.",
    website: "https://slack.com"
  },
  {
    name: "Adobe",
    industry: "Software",
    location: "San Jose, CA",
    logo: "https://img.icons8.com/color/144/adobe-creative-cloud.png",
    size: "Large",
    openPositions: 26,
    description: "Adobe Inc. is an American multinational computer software company incorporated in Delaware and headquartered in San Jose, California.",
    website: "https://adobe.com"
  },
  {
    name: "Shopify",
    industry: "E-commerce",
    location: "Ottawa, Canada",
    logo: "https://img.icons8.com/color/144/shopify.png",
    size: "Medium",
    openPositions: 23,
    description: "Shopify Inc. is a Canadian multinational e-commerce company headquartered in Ottawa, Ontario.",
    website: "https://shopify.com"
  },
  {
    name: "Discord",
    industry: "Communication",
    location: "San Francisco, CA",
    logo: "https://img.icons8.com/color/144/discord-logo.png",
    size: "Medium",
    openPositions: 16,
    description: "Discord Inc. is an American VoIP, instant messaging and digital distribution platform designed for creating communities.",
    website: "https://discord.com"
  },
  {
    name: "Canva",
    industry: "Design",
    location: "Sydney, Australia",
    logo: "https://img.icons8.com/color/144/canva.png",
    size: "Medium",
    openPositions: 21,
    description: "Canva is an Australian graphic design platform, used to create social media graphics, presentations, posters, documents and other visual content.",
    website: "https://canva.com"
  },
  {
    name: "Zoom",
    industry: "Video Conferencing",
    location: "San Jose, CA",
    logo: "https://img.icons8.com/color/144/zoom.png",
    size: "Medium",
    openPositions: 17,
    description: "Zoom Video Communications, Inc. is an American communications technology company headquartered in San Jose, California.",
    website: "https://zoom.us"
  },
  {
    name: "Dropbox",
    industry: "Cloud Storage",
    location: "San Francisco, CA",
    logo: "https://img.icons8.com/color/144/dropbox.png",
    size: "Medium",
    openPositions: 12,
    description: "Dropbox, Inc. is an American file hosting service company headquartered in San Francisco, California.",
    website: "https://dropbox.com"
  },
  {
    name: "GitLab",
    industry: "Software Development",
    location: "San Francisco, CA",
    logo: "https://img.icons8.com/color/144/gitlab.png",
    size: "Medium",
    openPositions: 29,
    description: "GitLab Inc. is an open-core company that operates GitLab, a DevOps software package that combines the ability to develop, secure, and operate software in a single application.",
    website: "https://gitlab.com"
  },
  {
    name: "GitHub",
    industry: "Software Development",
    location: "San Francisco, CA",
    logo: "https://img.icons8.com/ios-glyphs/120/github.png",
    size: "Large",
    openPositions: 24,
    description: "GitHub, Inc. is a provider of Internet hosting for software development and version control using Git.",
    website: "https://github.com"
  },
  {
    name: "Stripe",
    industry: "Fintech",
    location: "San Francisco, CA",
    logo: "https://img.icons8.com/color/144/stripe.png",
    size: "Medium",
    openPositions: 33,
    description: "Stripe, Inc. is an Irish-American financial services and software as a service (SaaS) company dual-headquartered in San Francisco, California and Dublin, Ireland.",
    website: "https://stripe.com"
  },
  {
    name: "Coinbase",
    industry: "Cryptocurrency",
    location: "San Francisco, CA",
    logo: "https://img.icons8.com/external-tal-revivo-shadow-tal-revivo/144/external-coinbase-a-digital-currency-exchange-headquartered-in-san-francisco-california-logo-shadow-tal-revivo.png",
    size: "Medium",
    openPositions: 27,
    description: "Coinbase Global, Inc., branded Coinbase, is an American company that operates a cryptocurrency exchange platform.",
    website: "https://coinbase.com"
  },
  {
    name: "Figma",
    industry: "Design",
    location: "San Francisco, CA",
    logo: "https://img.icons8.com/color/144/figma.png",
    size: "Small",
    openPositions: 15,
    description: "Figma, Inc. is an American web-based vector graphics editor and prototyping tool which is primarily web-based.",
    website: "https://figma.com"
  },
  {
    name: "Notion",
    industry: "Productivity",
    location: "San Francisco, CA",
    logo: "https://img.icons8.com/color/144/notion.png",
    size: "Small",
    openPositions: 11,
    description: "Notion Labs, Inc. is a productivity and note-taking web application developed by Notion Labs Inc.",
    website: "https://notion.so"
  },
  {
    name: "TikTok",
    industry: "Social Media",
    location: "Los Angeles, CA",
    logo: "https://img.icons8.com/color/144/tiktok.png",
    size: "Large",
    openPositions: 41,
    description: "TikTok is a short-form video hosting service owned by the Chinese company ByteDance.",
    website: "https://tiktok.com"
  },
  {
    name: "Twitter",
    industry: "Social Media",
    location: "San Francisco, CA",
    logo: "https://img.icons8.com/color/144/twitter.png",
    size: "Medium",
    openPositions: 8,
    description: "Twitter, Inc. is an American microblogging and social networking service on which users post and interact with messages known as tweets.",
    website: "https://twitter.com"
  }
];

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI);
    await Company.deleteMany({});
    await Company.insertMany(companies);
    console.log('Dummy companies seeded!');
    process.exit(0);
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
