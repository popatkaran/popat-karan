import React from 'react'
import { Col, Row } from 'react-bootstrap'

import CertificationsCard from '../certification-card'
import SectionTitle from '../section-title'

export default function Certifications({ data }) {
  if (data.config.home_certifications.display) {
    return (
      <Row id="home-certification"
        className="half-page text-center justify-content-center"
        style={{ background: `${data.config.home_certifications.bg_color}` }} >
        <Col md={{ span: 10, offset: 0 }} className='vertical-center'>
          <SectionTitle highlightedString={"Certifications"} normalString={"I earned"} />
          <Row>
            {data.certifications.map((certification, index) => {
              return <CertificationsCard key={index} certification={certification} />
            })}
          </Row>
        </Col>
      </Row>
    )
  }
}
