import React from "react"
import { Col } from "react-bootstrap"
import ReactWeather, { useOpenWeather } from 'react-open-weather';

export default function WeatherCard({ weatherData }) {

  // const { data, isLoading, errorMessage } = useOpenWeather({
  //   key: 'YOUR-API-KEY',
  //   lat: '48.137154',
  //   lon: '11.576124',
  //   lang: 'en',
  //   unit: 'metric', // values are (metric, standard, imperial)
  // });
  // console.log(data)

  // return (
  //   <Col sm={6} lg={6} className="gb-clock mobile-no-display">
  //     <div className="card-big-shadow">
  //       <div className="card">
  //         <div className="content">
  //           <ReactWeather
  //             isLoading={isLoading}
  //             errorMessage={errorMessage}
  //             data={data}
  //             lang={weatherData.lang}
  //             locationLabel={weatherData.city}
  //             unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
  //             showForecast
  //           />
  //         </div>
  //       </div>
  //     </div>
  //   </Col>
  // )

  const { data, isLoading, errorMessage } = useOpenWeather({
    key: '054253a8f266197c1e3a55911fa16551',
    lat: '48.137154',
    lon: '11.576124',
    lang: 'en',
    unit: 'metric', // values are (metric, standard, imperial)
  });
  return (
    <ReactWeather
      isLoading={isLoading}
      errorMessage={errorMessage}
      data={data}
      lang="en"
      locationLabel="Munich"
      unitsLabels={{ temperature: 'C', windSpeed: 'Km/h' }}
    />
  );
}
