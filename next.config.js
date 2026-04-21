module.exports = {
  images: {
    domains: ['cdn.sanity.io'],
  },
  // experimental: {
  //   scrollRestoration: true,
  // },
  compiler: {
    styledComponents: true,
  },
  async redirects() {
    return [
      // Keep temporary so browser-language detection in pages/index.js can still run
      // if the client-side logic is ever re-enabled.
      { source: "/", destination: "/fr", permanent: false },
      // Structural redirects — these paths are permanently retired; 301 allows browsers to cache them.
      { source: "/saison", destination: "/fr/saison", permanent: true },
      { source: "/saison/:slug", destination: "/fr/saison/:slug", permanent: true },
      { source: "/l-ensemble", destination: "/fr/l-ensemble", permanent: true },
      { source: "/l-ensemble/:slug", destination: "/fr/l-ensemble/:slug", permanent: true },
      { source: "/media", destination: "/fr/media", permanent: true },
      { source: "/media/:media", destination: "/fr/media/:media", permanent: true },
      { source: "/media/:media/:slug", destination: "/fr/media/:media/:slug", permanent: true },
      { source: "/editions", destination: "/fr/a-propos/editions", permanent: true },
      { source: "/billetterie", destination: "/fr/billetterie", permanent: true },
      { source: "/en/publishing", destination: "/fr/a-propos/editions", permanent: true },
      { source: "/fr/publishing", destination: "/fr/a-propos/editions", permanent: true },
    ];
  }
}
