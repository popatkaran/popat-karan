import * as React from "react"
import Layout from "../components/layout"
import { Col, Container, Row } from "react-bootstrap"

import staticData from '../data/data.json'
import '../styles/home.css'

import IntroBanenr from "../components/homepage/intro-baner"
import Services from "../components/homepage/services"
import Certifications from "../components/homepage/certifications"
import Platforms from "../components/homepage/platforms"

const IndexPage = () => {
  return (
    <Layout>
      <Row id="page-home" className='page-home justify-content-center align-middle'>
        <Col>
          <Container className="padding-headbar">
            <IntroBanenr data={staticData} />
            <Services data={staticData} />
            <Certifications data={staticData} />
            <Platforms data={staticData} />
          </Container>
        </Col>
      </Row>
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>Home | {staticData.info.name}</title>
