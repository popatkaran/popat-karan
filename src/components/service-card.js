import React from 'react'
import { Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';


export default function ServicesCard({ service }) {
  return (
    <Col xs={12} sm={6} md={6} lg={6} xl={4} xxl={4}>
      <Card>
        <Card.Body>
          <Card.Title>{service.title}</Card.Title>
          {/* <Card.Subtitle>{service.title}</Card.Subtitle> */}
          {/* <Card.Text>
            {service.description}
          </Card.Text> */}
        </Card.Body>
      </Card>
    </Col>
  )
}
