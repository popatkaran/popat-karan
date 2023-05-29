import React from 'react'
import { graphql } from 'gatsby'
import { Col, Container, Row } from 'react-bootstrap'

import Layout from '../components/layout'

import DashboardIcon from '../images/placeholder.png'

export default function Template({ data }) {
  const { markdownRemark } = data
  const { frontmatter, html } = markdownRemark
  return (
    <Layout>
      <Row id="page-blog-details" className='page-blog-details justify-content-center align-middle'>
        <Col>
          <Container>
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
function DisplayDashboardIcon({ }) {
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

function MarkdownContent({ content }) {
  const html = ''
  return (
    <Row>
      <Col sm={12}>
        <div className="blog-post-container">
          <div className="blog-post">
            <h1>{content.title}</h1>
            <div
              className="blog-post-content"
              dangerouslySetInnerHTML={{ __html: html }}
            />
          </div>
        </div>
      </Col>
    </Row>
  )
}