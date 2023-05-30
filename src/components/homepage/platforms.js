import React from 'react'
import { Col, Row } from 'react-bootstrap'

import PlatformsCard from '../platforms-card'

export default function Platforms({ data }) {
  if (data.config.home_platforms.display) {
    return (
      <Row id="home-platforms"
        className="half-page text-center justify-content-center"
        style={{ background: `${data.config.home_platforms.bg_color}` }}>
        <Col md={{ span: 9, offset: 0 }} className='vertical-center'>
          <div className="section-title">
            <strong>Platforms</strong> I'm experienced
          </div>
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
