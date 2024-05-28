import * as React from "react"
import Layout from "../components/layout"
import { Col, Container, Row } from "react-bootstrap"

import staticData from '../data/data.json'
import '../styles/home.css'

import ComponentClock from "../components/dashboard/clock"
import ComponentShorcutLinks from "../components/dashboard/shortcut-links"


const IndexPage = () => {
  return (
    <Layout>
      <Row id="page-home" className='page-home justify-content-center align-middle'>
        <Col>
          <Container className="padding-headbar">
            <ComponentClock />
            {/* <ComponentWeather /> */}
            <ComponentShorcutLinks />
          </Container>
        </Col>
      </Row>
    </Layout>
  )
}

export default IndexPage

export const Head = () => <title>Home | {staticData.info.name}</title>
