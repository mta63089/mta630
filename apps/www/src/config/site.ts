export const siteConfig = {
  name: "mta630",
  url: "https://www.mta630.com",
  ogImage: "https://www.mta630.com/og.jpg",
  description: "mta630's website. lotta random stuff, have fun!",
  links: {},
  nav: [
    { name: "Home", href: "/" },
    { name: "Docs", href: "/docs" },
    { name: "Posts", href: "/posts" },
    { name: "Gallery", href: "/gallery" },
  ],
}

export type SiteConfig = typeof siteConfig
