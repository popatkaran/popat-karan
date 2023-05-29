import React from 'react'
import { Col, Row } from 'react-bootstrap'

import ServicesCard from '../service-card'

export default function Services({ data }) {
  if (data.config.home_services.display) {
    return (
      <Row className="full-page text-center justify-content-center" id="home-services" >
        <Col md={{ span: 9, offset: 0 }} className='vertical-center'>
          <div className="section-title">
            <strong>What</strong> I do?
          </div>
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
