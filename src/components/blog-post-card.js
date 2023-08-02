import React from 'react'
import { Card, Col } from 'react-bootstrap'

import blogPostPlaceholderImage from '../images/logo-dark-x.png'
import FluidImage from './fluid-image'

export default function BlogPostCard({ post }) {
  return (
    <Col xs={12} sm={6} md={6} lg={6} xl={3} xxl={3} className="d-flex align-items-stretch blog-post-card">
      <a href={post.frontmatter.slug} target='_blank' rel="noreferrer" title={post.frontmatter.title}>
        <Card className={`${post.frontmatter.category} article-card`}>
          <FluidImage customClass='card-img-top credential-badge' image={post.frontmatter.image ? post.frontmatter.image : blogPostPlaceholderImage} name={post.title} />
          <Card.Body>
            <Card.Title>{post.frontmatter.title}</Card.Title>
            <Card.Subtitle className="mb-2 text-muted">{post.frontmatter.description}</Card.Subtitle>
          </Card.Body>
        </Card >
      </a >
    </Col >
  )
}
