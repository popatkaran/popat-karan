import * as React from "react"
import Layout from "../components/layout"
import { Col, Row } from "react-bootstrap"

import staticData from '../data/data.json'
import '../styles/home.css'

import IntroBanenr from "../components/homepage/intro-baner"
import Services from "../components/homepage/services"
import Certifications from "../components/homepage/certifications"
import Platforms from "../components/homepage/platforms"
const NotFoundPage = () => {
  return (
    <Layout>
      <Row id="page-404" className='page-home justify-content-center align-middle'>
        <Col>
          <IntroBanenr data={staticData} />
          <Services data={staticData} />
          <Certifications data={staticData} />
          <Platforms data={staticData} />
        </Col>
      </Row>
    </Layout>
  )
}

export default NotFoundPage

export const Head = () => <title>Not found</title>
