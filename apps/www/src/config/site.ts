export const siteConfig = {
  name: "mta630.com",
  url: "https://www.mta630.com",
  ogImage: "https://www.mta630.com/og.jpg",
  description: "mta630's website. lotta random stuff, have fun!",
  links: {},
  nav: [
    { name: "Home", href: "/" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Posts", href: "/posts" },
    { name: "Gallery", href: "/gallery" },
    { name: "Tools", href: "/tools" },
  ],
  toolNav: [
    {
      name: "QR Code Generator",
      description: "Convert your text or link into a QR code!",
      href: "/tools/qr-code-gen",
    },
    {
      name: "Random Facts",
      description: "Get a random (and weird) fact!",
      href: "/tools/random-fact",
    },
    {
      name: "Color Contrast Analyzer",
      description: "Check to see how readable your color scheme/palette is!",
      href: "/tools/color-contrast-analyzer",
    },
  ],
}

export type SiteConfig = typeof siteConfig
