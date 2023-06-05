import * as React from "react"
import Layout from "../components/layout"
import { Col, Row } from "react-bootstrap"

import staticData from '../data/data.json'
import '../styles/home.css'

import BlogPostCard from "../components/blog-post-card"

const Dashboard = ({ data }) => {
  return (
    <Layout>
      <Row id="page-dashboard" className='page-dashboard margin-headbar justify-content-center align-middle'>
        <Col md={{ span: 9, offset: 0 }} className='vertical-center'>
          <Row>
            {staticData.platforms.map((platform, index) => {
              return <BlogPostCard platform={platform} key={index} />
            })}
          </Row>
        </Col>
      </Row>
    </Layout>
  )
}

export default Dashboard

export const Head = () => <title>Home | {staticData.info.name}</title>
