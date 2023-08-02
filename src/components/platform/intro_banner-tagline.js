import React from 'react'
import { Col, Row } from 'react-bootstrap'
import FluidImage from '../fluid-image'

export default function IntroBannerWithTagline({ banner, tagline, platform }) {
    return (
        <Row id="platform-intro" className="text-center half-page justify-content-center">
            <Col md={{ span: 10, offset: 0 }} className='vertical-center'>
                <Row>
                    <Col xs={12} sm={12} lg={6} className='banner'>
                        <FluidImage image={banner} name={platform} />
                    </Col>
                    <Col xs={12} sm={12} md={6} lg={6} className='desc'>
                        <strong>{tagline}</strong>
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
