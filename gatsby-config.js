/**
 * @type {import('gatsby').GatsbyConfig}
 */
module.exports = {
  siteMetadata: {
    title: `Karan Popat`,
    description: `Thats's all about me!`,
    keywords: 'Karan, Karan Popat, Popat, e-commerce, e-commerce developer, e-commerce architect, technical architect, backend developer, lead developer, engineer, lead engineer, Spryker, Spryker Cloud Commerce OS, Adobe Comemrce, Magento, Magento 2, CommerceTools, SAP Commerce Cloud, SAP Hybris, popatkaran',
    author: `Karan Popat`,
    url: 'https://www.popatkaran.xyz/',
  },
  plugins: [
    `gatsby-plugin-image`,
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    'gatsby-plugin-sitemap',
    'gatsby-transformer-remark',
    `gatsby-transformer-json`,
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: `${__dirname}/src/images`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/data`,
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Karan Popat`,
        short_name: `Portfolio Website`,
        description: `It's all about Karan Popat.`,
        lang: `en`,
        display: `standalone`,
        icon: `src/images/kp.png`,
        start_url: `/`,
        theme_color_in_head: false,
      },
    },
    {
      // use this config to create markdown pages
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'markdown-pages',
        path: `${__dirname}/src/data/`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: 'yaml-content-images',
        path: `${__dirname}/src/images/`,
      },
    },
    {
      resolve: `gatsby-plugin-offline`,
      options: {
        precachePages: [`/`, `/about/`, `/contact/`, `prayers/hanumanchalisaImage/`, `prayers/hanumanchalisaText`],
      },
    },
  ],
}