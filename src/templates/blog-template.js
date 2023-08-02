import React from 'react'
import { graphql } from 'gatsby'
import { Col, Container, Row } from 'react-bootstrap'

import Layout from '../components/layout'

import DashboardIcon from '../images/placeholder.png'
import '../styles/components/blog-post.css'

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <Row id="page-blog-details" className='page-blog-details padding-headbar justify-content-center'>
        <Col md={{ span: 10, offset: 0 }} className='vertical-center'>
          <Container>
            <h2>{frontmatter.title}</h2>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </Container>
        </Col>
      </Row>
    </Layout>

  )
}

export const Head = ({ data }) => (
  <>
    <title>{data.markdownRemark.frontmatter.title}</title>
    <meta name="description" content="meta discription " />
  </>
)

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        tags
        slug
        order
        description
        date
        category
        type
      }
    }
  }
`
function DisplayDashboardIcon() {
  return (
    <Row className="bottom right">
      <Col sm={12}>
        <a href={'/dashboard'} title="Dashboard">
          <img
            src={DashboardIcon}
            width="32px"
            height="auto"
            alt="Dashboard"
          />
        </a>
      </Col>
    </Row>
  )
}