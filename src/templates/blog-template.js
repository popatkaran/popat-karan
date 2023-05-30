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
      <Row id="page-blog-details" className='page-blog-details margin-headbar justify-content-center'>
        <Col>
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

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      html
      frontmatter {
        slug
        title
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