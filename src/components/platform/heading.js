import React from 'react'
import { Col, Row } from 'react-bootstrap'
import SectionTitle from '../section-title'

export default function Heading({ value }) {
    return (
        <Row id="heading" className="text-center justify-content-center">
            <Col md={{ span: 9, offset: 0 }} className='vertical-center'>
                <SectionTitle highlightedString={value} normalString={""} />
            </Col >
        </Row >
    )
}
