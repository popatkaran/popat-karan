import React from 'react'
import { Col, Row } from 'react-bootstrap'

export default function AboutPlatform({ value, platform }) {
    return (
        <Row id="platform-about" className="text-center half-page justify-content-center">
            <Col md={{ span: 9, offset: 0 }} className='vertical-center'>
                <Row>
                    <Col>
                        <div className="section-title">Why {platform}?</div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <div className="description">
                            {value}
                        </div>
                    </Col>
                </Row>

            </Col>
        </Row >
    )
}
