import React from 'react'
import { graphql, Link } from "gatsby"
import { Col, Container, Row } from 'react-bootstrap'
import Layout from "../components/layout"
import SectionTitle from "../components/section-title"

const CategoryTemplate = ({ data }) => {
  return (
    <Layout>
      <Row id="page-dashboard" className='page-dashboard padding-headbar justify-content-center align-middle'>
        <Col md={{ span: 10, offset: 0 }} className='vertical-center text-center' >
          <SectionTitle highlightedString={"Articles"} normalString={""} />
          <Row data-masonry='{"percentPosition": true }' >
            {data.allCategoriesJson.nodes.map((category) => {
              return (
                <RenderCategoryCard category={category} />
              )
            })}

          </Row>
        </Col>
      </Row>
    </Layout>
  )
}

function RenderCategoryCard(props) {
  const category = props.category
  return (
    <Col xs={12} sm={6} md={6} lg={6} xl={4} xxl={3} id={category.category_key}>
      <Link to={category.category_key}><div class="card">
        <div class="card-body">
          <h5 class="card-title">{category.title}</h5>
        </div>
      </div></Link>
    </Col>
  )
}

export default CategoryTemplate

export const pageQuery = graphql`
  query {
    allCategoriesJson(sort: {category_key: ASC}) {
      nodes {
        title
        locale
        category_key
      }
    }
  }
`
