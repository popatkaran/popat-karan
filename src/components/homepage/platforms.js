import React from 'react'
import { Col, Row } from 'react-bootstrap'

import PlatformsCard from '../platforms-card'
import SectionTitle from '../section-title'

export default function Platforms({ data }) {
  if (data.config.home_platforms.display) {
    return (
      <Row id="home-platforms"
        className="half-page text-center justify-content-center"
        style={{ background: `${data.config.home_platforms.bg_color}` }}>
        <Col md={{ span: 9, offset: 0 }} className='vertical-center'>
          <SectionTitle highlightedString={"platforms"} normalString={"I'm experienced"} />
          <Row>
            {data.platforms.map((platform, index) => {
              return <PlatformsCard platform={platform} key={index} />
            })}
          </Row>
        </Col >
      </Row >
    )
  }
}