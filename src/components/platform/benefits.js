import React from 'react'
import { Col, Row } from 'react-bootstrap'
import SectionTitle from '../section-title'
import CardTitleDescription from '../card-title-desc'

export default function Benefits({ platform, benefits }) {
    return (
        <Row id="platform-benefits"
            className="half-page text-center justify-content-center">
            <Col md={{ span: 10, offset: 0 }} className='vertical-center'>
                {/* <SectionTitle highlightedString={"What"} normalString={"I do?"} /> */}
                <Row>
                    <Col>
                        <h4 className='section-title'>benefits of {platform}</h4>
                    </Col>
                </Row>
                <Row className='benefits'>
                    {benefits.map((benefit, index) => {
                        return <CardTitleDescription key={index} info={benefit} />
                    })}
                </Row>
            </Col>
        </Row>
    )
}
