import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import { Card, Col, Container, Row } from "react-bootstrap"
import Carousel from 'react-bootstrap/Carousel';
import { GatsbyImage, getImage } from "gatsby-plugin-image"

import '../../styles/components/prayer.css'

import staticData from '../../data/data.json'

const Image = ({ image, name }) =>
  <GatsbyImage image={getImage(image)} alt={name} title={name} imgClassName="img-fluid" />

const Hanumanchalisa = ({ data }) => {
  return (
    <Layout>
      <Row id="page-prayer" className='page-prayer hanumanchalisa justify-content-center align-middle'>
        <Col md={{ span: 9, offset: 0 }} className='vertical-center text-center' >
          <Container>
            <h3 className="center-title">{data.allHanumanchalisaJson.nodes[0].title}</h3>
            <Carousel variant="dark" keyboard={true} controls={false} indicators={false} interval={3000}>
              {data.allHanumanchalisaJson.nodes.map((doha) => {
                return (
                  <Carousel.Item key={doha.id}>
                    <Card>
                      <Image image={doha.image} name={doha.title} />

                      {/* <Card.Body>
                        <Card.Title>{doha.title}</Card.Title>
                        <div class="break"></div>
                        <Card.Text>{doha.description}</Card.Text>
                      </Card.Body> */}
                    </Card>
                  </Carousel.Item>
                )
              })}
            </Carousel>
          </Container>
        </Col>
      </Row>
    </Layout >
  )
}

export default Hanumanchalisa

export const Head = () => <title>Hanuman Chalisa | {staticData.info.name}</title>

export const query = graphql`
  query {
    allHanumanchalisaJson {
      nodes {
        id
        title
        description
        image {
          childImageSharp {
            gatsbyImageData(placeholder: BLURRED, formats: JPG, layout: FULL_WIDTH)
          }
        }
      }
    }
  }
`