import React from "react"
import { Col } from "react-bootstrap"

export default function SkillsCard({ skill }) {
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
        <div className={`${skill.Id} card`}>
          <div className="content">
            <div className="skill-name">{skill.Name}</div>
            <div className="skill-description">{skill.Definition}</div>
          </div>
        </div>
      </div>
    </Col>
  )
}
