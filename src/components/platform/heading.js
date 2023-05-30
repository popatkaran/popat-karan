import React from 'react'
import { Col, Row } from 'react-bootstrap'

export default function Heading({ value }) {
    return (
        <Row id="heading" className="text-center justify-content-center">
            <Col md={{ span: 9, offset: 0 }} className='vertical-center'>
                <div className="section-title">
                    <strong>{value}</strong>
                </div>
            </Col >
        </Row >
    )
}
