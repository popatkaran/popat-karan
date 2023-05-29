import React from 'react'
import { Col, Image } from 'react-bootstrap'

export default function CertificationsCard({ certification }) {
  return (
    <Col xs={12} sm={6} md={6} lg={6} xl={3} xxl={3} className="text-center">
      <a href={certification.link} target='_blank' rel="noreferrer" title={certification.title}>
        <Image
          className="credential-badge"
          src={certification.picture}
          alt={certification.title}
          title={certification.title}
          width={200}
          height="auto"
        />
      </a>
      <a href={certification.link}
        target='_blank'
        rel="noreferrer"
        title={certification.title}>
        <strong>{certification.title}</strong>
      </a>
    </Col>
  )
}
