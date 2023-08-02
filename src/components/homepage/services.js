import React from 'react'
import { Col, Row } from 'react-bootstrap'

import ServicesCard from '../service-card'
import SectionTitle from '../section-title'

export default function Services({ data }) {
  if (data.config.home_services.display) {
    return (
      <Row id="home-services"
        className="half-page text-center justify-content-center"
        style={{ background: `${data.config.home_services.bg_color}` }}>
        <Col md={{ span: 10, offset: 0 }} className='vertical-center'>
          <SectionTitle highlightedString={"What"} normalString={"I do?"} />
          <Row className='services'>
            {data.services.map((service, index) => {
              return <ServicesCard key={index} service={service} />
            })}
          </Row>
        </Col>
      </Row>
    )
  }
}
