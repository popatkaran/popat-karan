
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Row } from "react-bootstrap"

import ClockCard from "../clock-card"

const ComponentClock = () => {
    const data = useStaticQuery(graphql`
    query {
      allClocksJson(sort: {order: ASC}, filter: {onDashboard: {eq: true}}) {
        nodes {
          title
          timezone
        }
        totalCount
      }
    }
    `)
    return (
        <Row>
            {data.allClocksJson.nodes.map((clockData, index) => {
                return (
                    <ClockCard city={clockData} key={index} />
                )
            })
            }
        </Row>)
}

export default ComponentClock