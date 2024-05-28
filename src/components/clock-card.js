import React from "react"
import { Col } from "react-bootstrap"
import Clock from "react-live-clock"

export default function ClockCard({ city }) {
  return (
    <Col sm={6} lg={6} className="gb-clock mobile-no-display">
      <div className="card-big-shadow">
        <div className="card">
          <div className="content">
            <h1>{city.title}</h1>
            <Clock
              format={"dddd, MMMM Do YYYY, HH:mm:ss"}
              ticking={true}
              // timezone={city.timezone}
              className="gb-clock"
            />
          </div>
        </div>
      </div>
    </Col>
  )
}
