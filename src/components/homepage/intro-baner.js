import React from 'react'
import { Col, Image, Row } from 'react-bootstrap'

import Logo from '../../images/logo-dark-x.png'

export default function IntroBanenr({ data }) {
  var homeIntroRowClass = ''
  var homeIntroStyle = {
    background: `${data.config.home_intro.bg_color}`
  }
  if (data.config.hero_banner.display) {
    homeIntroRowClass = "bg-image"
    homeIntroStyle = {
      backgroundImage: "url('https://mdbootstrap.com/img/Photos/Others/images/76.jpg')",
      height: 'calc(100vh-53px)',
    }
  }
  return (
    <Row id="home-intro"
      className={`${homeIntroRowClass} top-padding-required full-page`}
      style={homeIntroStyle}>
      <Col className="text-center vertical-center">
        <Image
          className="center-block img-responsive"
          src={Logo}
          title={data.info.name}
        />
        <div className="brand-tagline">
          {data.info.role || data.info.tagline || data.info.short_description}
        </div>
        <div className="brand-description">
          {data.info.short_description || data.info.description}
        </div>
      </Col>
    </Row >
  )
}