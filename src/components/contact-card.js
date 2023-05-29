import React from 'react'
import { Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';

export default function ContactCard({ title, info }) {
  return (
    <Col xs={12} sm={6} md={6} lg={6} xl={6} xxl={6}>
      <Card>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Text>{info}</Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}
