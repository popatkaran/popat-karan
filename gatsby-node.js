const path = require(`path`)

const blogTemplate = path.resolve(`${__dirname}/src/templates/blog-template.js`)
const categoryTemplate = path.resolve(`${__dirname}/src/templates/category-template.js`)

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
      allCategoriesJson(sort: {category_key: ASC}) {
        nodes {
          category_key
          title
          locale
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

  result.data.allCategoriesJson.nodes.forEach((category) => {
    createPage({
      path: '/articles/' + category.category_key,
      component: categoryTemplate,
      context: {
        category_key: category.category_key,
        category: category.category
      },
    })
  })
}