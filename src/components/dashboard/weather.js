
import React from "react"
import { useStaticQuery, graphql } from "gatsby"
import { Row } from "react-bootstrap"
import WeatherCard from "../weather-card"

const ComponentWeather = () => {
    const data = useStaticQuery(graphql`
    query {
      allWeatherJson(filter: {onDashboard: {eq: true}}, sort: {order: ASC}) {
        nodes {
          city
          lat
          long
          lang
          unit
        }
        totalCount
      }
    }
  `)
    return (
        <Row>
            {data.allWeatherJson.nodes.map((weatherData, index) => {
                return (
                    <WeatherCard weatherData={weatherData} key={index} />
                )
            })}
        </Row>
    )
}

export default ComponentWeather