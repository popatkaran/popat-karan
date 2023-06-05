import React from 'react'
import { Card, Col } from 'react-bootstrap'

export default function PlatformsCard({ platform }) {
  return (
    <Col xs={12} sm={6} md={6} lg={6} xl={3} xxl={3} className='d-flex align-items-stretch'>
      {/* <a href={platform.link} target='_blank' rel="noreferrer" title={platform.title}> */}
      <Card>
        <Card.Img
          width={240}
          height={'auto'}
          className="credential-badge"
          variant="top" src={platform.picture}
          alt={platform.title}
          title={platform.title} />
        {/* <Card.Body>
          <Card.Title>{platform.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted">{platform.title}</Card.Subtitle>
        </Card.Body> */}
      </Card>
      {/* </a> */}
    </Col>
  )
}
