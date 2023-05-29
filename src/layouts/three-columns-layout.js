import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Col, Container, Row } from "react-bootstrap"

import Header from "./header"
import Footer from "./footer"
import '../styles/global.css';
import staticData from '../data/data.json'

const ThreeColumnsLayout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          author
          url
        }
      }
    }
  `)

  return (
    <Container className="container-fluid p-0">
      <Header data={data.site.siteMetadata} />
      <Row>
        <Col></Col>
        <Col>{children}</Col>
        <Col></Col>
      </Row>
      <Footer data={staticData} />
    </Container>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default ThreeColumnsLayout