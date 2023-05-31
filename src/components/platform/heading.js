import React from 'react'
import { Col, Row } from 'react-bootstrap'
import SectionTitle from '../section-title'

export default function Heading({ value }) {
    return (
        <Row id="platform-heading" className="text-center justify-content-center">
            <Col>
                <SectionTitle highlightedString={value} normalString={""} />
            </Col >
        </Row >
    )
}
