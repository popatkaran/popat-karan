import React from 'react'
import { useStaticQuery, graphql } from "gatsby"
import { Col, Row } from 'react-bootstrap'

import PlatformsCard from '../platforms-card'
import SectionTitle from '../section-title'

export default function Platforms({ data }) {
  const platforms = useStaticQuery(graphql`
    query {
      allPlatformsJson(filter: {}) {
        nodes {
          banner {
            childImageSharp {
              gatsbyImageData(formats: PNG, placeholder: BLURRED)
            }
          }
          platform
        }
      }
    }
  `)
  return (
    <Row id="home-platforms"
      className="half-page text-center justify-content-center"
      style={{ background: `${data.config.home_platforms.bg_color}` }}>
      <Col md={{ span: 10, offset: 0 }} className='vertical-center'>
        <SectionTitle highlightedString={"platforms"} normalString={"I'm experienced"} />
        <Row>
          {platforms.allPlatformsJson.nodes.map((platform, index) => {
            return <PlatformsCard platform={platform} key={index} />
          })}
        </Row>
      </Col >
    </Row >
  )
}