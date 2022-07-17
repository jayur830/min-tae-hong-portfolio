/** @type {import('next-sitemap').IConfig} */
module.exports = {
	siteUrl: process.env.URL || 'https://min-tae-hong-portfolio.herokuapp.com',
	generateRobotsTxt: true,
	exclude: ['/sitemap.xml'],
	robotsTxtOptions: {
		additionalSitemaps: ['https://min-tae-hong-portfolio.herokuapp.com/sitemap.xml'],
	},
};
