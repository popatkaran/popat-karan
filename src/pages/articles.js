import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../components/layout"
import { Col, Row } from "react-bootstrap"

import staticData from '../data/data.json'
import '../styles/articles.css'

import BlogPostCard from "../components/blog-post-card"
import SectionTitle from "../components/section-title"

const Dashboard = ({ data }) => {
  const articles = data.allMarkdownRemark.nodes
  return (
    <Layout>
      <Row id="page-dashboard" className='page-dashboard padding-headbar justify-content-center align-middle'>
        <Col md={{ span: 10, offset: 0 }} className='vertical-center text-center' >
          <SectionTitle highlightedString={"Articles"} normalString={""} />
          <Row data-masonry='{"percentPosition": true }' >
            {articles.map((article, index) => {
              return <BlogPostCard post={article} key={index} />
            })}

          </Row>
        </Col>
      </Row>
    </Layout>
  )
}

export const query = graphql`
  query {
    allMarkdownRemark (
      # filter: {frontmatter: {category: {in: ["software_architecture","sap","spryker"]}}}
      sort: {frontmatter: {order: ASC}}
    ) {
      totalCount
        nodes {
          frontmatter {
            title
            tags
            slug
            order
            description
            date
            category
            type
            image {
              childImageSharp {
                gatsbyImageData(formats: PNG, placeholder: BLURRED)
              }
            }
          }
        }
      
    }
  }
`

export default Dashboard

export const Head = () => {
  return (
    <>
      <title>articles | {staticData.info.name}</title>
      <script
        src="https://cdn.jsdelivr.net/npm/masonry-layout@4.2.2/dist/masonry.pkgd.min.js"
        integrity="sha384-GNFwBvfVxBkLMJpYMOABq3c+d3KnQxudP/mGPkzpZSTYykLBNsZEnG2D9G/X/+7D"
        crossorigin="anonymous"
        async
      ></script>
    </>
  )
}


