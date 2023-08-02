import React from 'react'
import { Col, Row } from 'react-bootstrap'
import SectionTitle from '../section-title'
import CardTitleDescription from '../card-title-desc'

export default function WhyMe({ whyMe }) {
    return (
        <Row id="platform-why_me"
            className="half-page text-center justify-content-center">
            <Col md={{ span: 10, offset: 0 }} className='vertical-center'>
                {/* <SectionTitle highlightedString={"What"} normalString={"I do?"} /> */}
                <Row>
                    <Col>
                        <h4 className='section-title'>Let's work togather! <em>Why me?</em></h4>
                    </Col>
                </Row>
                <Row className='why_me'>
                    {whyMe.map((reason, index) => {
                        return <CardTitleDescription key={index} info={reason} xl={3} xxl={3} />
                    })}
                </Row>
            </Col>
        </Row>
    )
}
