import React from 'react'
import { Col, Row } from 'react-bootstrap'
import SectionTitle from '../section-title'
import CardTitleDescription from '../card-title-desc'

export default function Features({ platform, features }) {
    return (
        <Row id="platform-features"
            className="half-page text-center justify-content-center">
            <Col md={{ span: 10, offset: 0 }} className='vertical-center'>
                {/* <SectionTitle highlightedString={"What"} normalString={"I do?"} /> */}
                <Row>
                    <Col>
                        <h4 className='section-title'>Key features and advantages of {platform}</h4>
                    </Col>
                </Row>
                <Row className='features'>
                    {features.map((feature, index) => {
                        return <CardTitleDescription key={index} info={feature} />
                    })}
                </Row>
            </Col>
        </Row>
    )
}
