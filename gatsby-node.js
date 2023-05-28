const path = require(`path`)

const blogTemplate = path.resolve(`${__dirname}/src/templates/blog-template.js`)

exports.createPages = async ({ graphql, actions }) => {
  const { createPage } = actions

  const result = await graphql(`
    query {
      allMarkdownRemark {
        nodes {
          frontmatter {
            slug
            type
          }
          id
        }
      }
    }
  `)

  result.data.allMarkdownRemark.nodes.forEach((page) => {
    createPage({
      path: page.frontmatter.slug,
      component: blogTemplate,
      context: {
        id: page.id,
        slug: page.frontmatter.slug,
      },
    })
  })
}