import React from "react"
import { Col } from "react-bootstrap"
import Clock from "react-live-clock"

export default function ClockCard({ city }) {
  return (
    <Col sm={6} lg={6} className="gb-clock mobile-no-display">
      <div className="card-big-shadow">
        <div className="card">
          <div className="content">
            <h6>{city.title}</h6>
            <h3><Clock
              format={"dddd, MMMM Do YYYY, HH:mm:ss"}
              ticking={true}
              // timezone={city.timezone}
              className="gb-clock"
            /></h3>
          </div>
        </div>
      </div>
    </Col>
  )
}
