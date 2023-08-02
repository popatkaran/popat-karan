import React from 'react'
import { Col, Row } from 'react-bootstrap'
import FluidImage from '../fluid-image'

export default function ArchitectureOverview({ platform, banner, title, description }) {
    return (
        <Row id="platform-arch" className="text-center half-page justify-content-center">
            <Col md={{ span: 10, offset: 0 }} className='vertical-center'>
                <Row>
                    <Col>
                        <h4 className='section-title'>{platform} architecture overview</h4>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12} sm={12} md={6} lg={6} className='desc'>
                        <strong>{description}</strong>
                    </Col>
                    <Col xs={12} sm={12} lg={6} className='banner'>
                        <FluidImage image={banner} name={platform} />
                    </Col>
                </Row>
            </Col>
        </Row>
    )
}
