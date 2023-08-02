import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import { Col, Container, Row } from "react-bootstrap"

import staticData from '../../data/data.json'
import Heading from "../../components/platform/heading"
import IntroBannerWithTagline from "../../components/platform/intro_banner-tagline"
import AboutPlatform from "../../components/platform/about"
import Features from "../../components/platform/features"
import Benefits from "../../components/platform/benefits"
import ArchitectureOverview from "../../components/platform/architecture-overview"
import WhyMe from "../../components/platform/why-me"

const CommerceTools = ({ data }) => {
  const platformInfo = data.platformsJson
  return (
    <Layout>
      <Row id="page-platform" className='page-platform half-page commercetools padding-headbar justify-content-center'>
        <Col md={{ span: 10, offset: 0 }} className='vertical-center text-center' >
          <Container>
            <Heading value={platformInfo.platform} />
            <IntroBannerWithTagline banner={platformInfo.banner} tagline={platformInfo.tagline} platform={platformInfo.platform} />
            {/* <AboutPlatform value={platformInfo.about} platform={platformInfo.platform} /> */}
            <Features platform={platformInfo.platform} features={platformInfo.features} />
            <ArchitectureOverview
              platform={platformInfo.platform}
              banner={platformInfo.arch_image}
              description={platformInfo.arch_description} />
            <Benefits platform={platformInfo.platform} benefits={platformInfo.benefits} />
            <WhyMe whyMe={platformInfo.why_me} />
          </Container>
        </Col>
      </Row>
    </Layout >
  )
}

export default CommerceTools

export const Head = () => <title>CommerceTools | {staticData.info.name}</title>

export const query = graphql`
  query {
    platformsJson(key: {eq: "commercetools"}) {
      platform
      banner {
        childImageSharp {
          gatsbyImageData(placeholder: BLURRED, formats: PNG)
        }
      }
      tagline
      about
      why
      features {
        title
        description
      }
      arch_description
      arch_image {
        childImageSharp {
          gatsbyImageData(formats: PNG, placeholder: BLURRED)
        }
      }
      benefits {
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