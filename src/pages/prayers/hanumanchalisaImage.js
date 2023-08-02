import * as React from "react"
import Layout from "../../components/layout"
import { Card, Col, Container, Row } from "react-bootstrap"
import Carousel from 'react-bootstrap/Carousel';
//import { GatsbyImage, getImage } from "gatsby-plugin-image"

import '../../styles/components/prayer.css'
import staticData from '../../data/data.json'
import hanumanChalisaImages from '../../data/prayers/hanumanchalisa-images.json'

// const Image = ({ image, name }) =>
//   <GatsbyImage image={getImage(image)} alt={name} title={name} imgClassName="img-fluid" />

const Title = "|| श्री हनुमान चालीसा ||"

const HanumanChalisaImages = ({ data }) => {
  return (
    <Layout>
      <Row id="page-prayer" className='page-prayer hanumanchalisa padding-headbar justify-content-center align-middle'>
        <Col md={{ span: 10, offset: 0 }} className='vertical-center text-center' >
          <Container>
            <h3 className="center-title">{Title}</h3>
            <Carousel variant="dark" keyboard={true} controls={false} indicators={false} interval={3000}>
              {/* {data.allHanumanchalisaImagesJson.nodes.map((doha) => { */}
              {hanumanChalisaImages.map((doha) => {
                return (
                  <Carousel.Item key={doha.id}>
                    <Card>
                      {/* <Image image={doha.image} name={Title} /> */}
                      <img src={doha.image} alt={Title} title={Title} />

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

export default HanumanChalisaImages

export const Head = () => <title>Hanuman Chalisa | {staticData.info.name}</title>

// export const query = graphql`
//   query {
//     allHanumanchalisaImagesJson {
//       nodes {
//         image {
//           childImageSharp {
//             gatsbyImageData(placeholder: BLURRED, formats: AUTO)
//             fluid {
//               src
//             }
//           }
//         }
//         id
//       }
//     }
//   }
// `