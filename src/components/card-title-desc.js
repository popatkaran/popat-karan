import React from 'react'
import { Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';

export default function CardTitleDescription({ info, xl, xxl }) {
  var exl = { xl } || 6
  var exxl = { xxl } || 6
  return (
    <Col xs={12} sm={6} md={6} lg={6} xl={exl} xxl={exxl}>
      <Card>
        <Card.Body>
          <Card.Title>{info.title}</Card.Title>
          <Card.Subtitle>{info.subtitle}</Card.Subtitle>
          <Card.Text>
            {info.description}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}
