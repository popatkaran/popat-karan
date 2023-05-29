import * as React from "react"
import { graphql } from "gatsby"
import Layout from "../../components/layout"
import { Card, Col, Container, Row } from "react-bootstrap"
import Carousel from 'react-bootstrap/Carousel';

import '../../styles/components/prayer.css'
import staticData from '../../data/data.json'

const HanumanchalisaText = ({ data }) => {
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
                      <Card.Body>
                        <Card.Title>{doha.title}</Card.Title>
                        <div class="break"></div>
                        <Card.Text>{doha.description}</Card.Text>
                      </Card.Body>
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

export default HanumanchalisaText

export const Head = () => <title>Hanuman Chalisa | {staticData.info.name}</title>

export const query = graphql`
  query {
    allHanumanchalisaJson {
      nodes {
        id
        title
        description
      }
    }
  }
`