const siteUrl = process.env.NEXT_PUBLIC_APP_URL || "https://amanfoo.vercel.app";

export const siteConfig = {
  name: "Amanfoo",
  url: siteUrl,
  ogImage: `${siteUrl}/opengraph-image`,
  description: "Seniors Membership App.",
  links: {
    twitter: "https://twitter.com/amanfoo",
  },
};

export type SiteConfig = typeof siteConfig;
