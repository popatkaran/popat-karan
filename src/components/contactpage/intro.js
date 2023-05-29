import React from 'react'
import { Col, Row } from 'react-bootstrap'

export default function ContactIntro({ data }) {
    return (
        <Row>
            <Col>
                <h2>{data.info.name}</h2>
                <div className="brand-tagline">
                    {data.info.role || data.info.tagline || data.info.short_description}
                </div>
                <p>
                    {data.info.short_description || data.info.description}
                </p>
            </Col>
        </Row>
    )
}