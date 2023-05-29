import React from 'react'
import { Col, Row } from 'react-bootstrap'

import PlatformsCard from '../platforms-card'

export default function Platforms({ data }) {
  if (data.config.home_platforms.display) {
    return (
      <Row className="full-page text-center justify-content-center" id="home-platforms" >
        <Col md={{ span: 9, offset: 0 }} className='vertical-center'>
          <div className="section-title">
            <strong>Platforms</strong> I'm experienced
          </div>
          <Row>
            {data.platforms.map((platform) => {
              return <PlatformsCard platform={platform} />
            })}
          </Row>
        </Col >
      </Row >
    )
  }
}
