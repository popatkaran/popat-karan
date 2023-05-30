import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import { Col, Row } from "react-bootstrap"

import staticData from '../../data/data.json'
import Heading from "../../components/platform/heading"

const AdobeCommerce = ({ data }) => {
  const platformInfo = data.platformsJson
  return (
    <Layout>
      <Row id="page-platform" className='page-platform half-page adobe-commerce margin-headbar justify-content-center'>
        <Col md={{ span: 9, offset: 0 }} className='vertical-center text-center' >
          <Heading value={platformInfo.platform} />
        </Col>
      </Row>
    </Layout >
  )
}

export default AdobeCommerce

export const Head = () => <title>AdobeCommerce - Magento 2 | {staticData.info.name}</title>

export const query = graphql`
  query {
    platformsJson(key: {eq: "adobe-commerce"}) {
      platform
      banner {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, formats: PNG)
        }
      }
      tagline
      what_is
      why_use
      features {
        title
        description
      }
      architecture_overview {
        title
        description
        image {
          childImageSharp {
            gatsbyImageData(formats: PNG, placeholder: BLURRED)
          }
        }
      }
      bebefits {
        title
        description
      }
      why_me {
        title
        description
      }
    }
  }
`