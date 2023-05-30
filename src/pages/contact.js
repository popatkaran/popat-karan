import * as React from "react"
import Layout from "../components/layout"
import { Col, Container, Image, Row } from "react-bootstrap"

import CoverImage from '../images/contact-cover.png'
import staticData from '../data/data.json'
import '../styles/contact.css'

import ContactInformation from "../components/contactpage/information"
import ContactIntro from "../components/contactpage/intro"

const ContactPage = () => {
  return (
    <Layout>
      <Row id="page-contact" className='page-contact justify-content-center margin-headbar align-middle'>
        <Col sm={12} md={12} lg={6} className="member-cover">
          <Image
            src={CoverImage}
            className="resize_fit_center img-fluid"
            alt={staticData.info.name}
            title={staticData.info.name}
          />
        </Col>
        <Col sm={12} md={12} lg={6} className="member-details margin-headbar">
          <Container>
            <ContactIntro data={staticData} />
            <ContactInformation data={staticData} />
          </Container>
        </Col>

      </Row>
    </Layout >
  )
}

export default ContactPage

export const Head = () => <title>Contact | {staticData.info.name}</title>
