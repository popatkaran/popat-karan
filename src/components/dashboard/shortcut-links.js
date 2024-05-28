
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Row } from "react-bootstrap"
import { FaFacebookSquare } from "react-icons/fa";


const ComponentShorcutLinks = () => {
  const data = useStaticQuery(graphql`
  query {
    allDashboardLinksJson(sort: {key: ASC}) {
      nodes {
        key
        name
        page_url
        profile_url
      }
      totalCount
    }
  }
`)
  return (
    <Row>
      {data.allDashboardLinksJson.nodes.map((link) => {
        return (
          <a key={link.key} href={link.profile_url} className="dashboard-links" title={link.name}><FaFacebookSquare /></a>
        )
      })
      }
    </Row >)
}

export default ComponentShorcutLinks