import React from 'react'
import { Col, Image } from 'react-bootstrap'

export default function DashboardCardImageAndTitle({ image, title }) {
  return (
    <Col
      xs={12}
      sm={6}
      md={6}
      lg={6}
      xl={4}
      xxl={3}
      className="dashboard-tile dc-image-and-title"
    >
      <div className="card-big-shadow">
        <div className="card">
          <div className="content">
            <Image
              className="center-block img-responsive"
              src={image}
              alt={title}
              title={title}
              width={128}
              height="auto"
            />
          </div>
        </div>
      </div>
    </Col>
  )
}
