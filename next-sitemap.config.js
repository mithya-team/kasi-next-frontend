/**
 * @type {import('next-sitemap').IConfig}
 * @see https://github.com/iamvishnusankar/next-sitemap#readme
 */
module.exports = {
  // !INITIAL_CONFIG Change the siteUrl
  /** Without additional '/' on the end, e.g. https://mithyalabs.com */
  siteUrl: 'https://mithyalabs.com',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    policies: [{ userAgent: '*', allow: '/' }],
  },
};
