import * as React from "react"
import { Col, Image, Nav, Row } from "react-bootstrap"

import Logo from '../images/logo-light.png'
import '../styles/components/footer.css'

const Footer = ({ data }) => {
    return (
        <Row id="footer" className="footer half-page" >
            <Col className="vertical-center">
                <ImageLogo data={data} />
                <TextLogo data={data} />
                <NavLinks data={data} />
                <SocialLinks data={data} />
                <CopyrightText data={data} />
            </Col>
        </Row>
    )
}

export default Footer


function ImageLogo({ data }) {
    if (data.config.image_logo.display) {
        return (
            <Row className="brand-logo">
                <Col>
                    <Image
                        className="center-block img-responsive"
                        src={Logo}
                        width={160}
                        height={'auto'}
                        title={data.title}
                        alt={data.title}
                    />
                </Col>
            </Row>
        )
    }
}

function TextLogo({ data }) {
    if (data.config.text_logo.display) {
        return (
            <Row>
                <Col>
                    <div className="text-logo h5">{data.info.name}</div>
                </Col>
            </Row>
        )
    }
}

function SocialLinks({ data }) {
    if (data.config.social_media.display) {
        return (
            <Row>
                <Col>
                    <Nav className="justify-content-center flex-grow-1 pe-3">
                        {data.socialmedia.map((link) => {
                            return (<Nav.Link target="_blank" rel="noreferrer" key={link.title} href={link.url}>{link.title}</Nav.Link>)
                        })}
                    </Nav>
                </Col>
            </Row>
        )
    }
}

function NavLinks({ data }) {
    if (data.config.footer_links.display) {
        return (
            <Row>
                <Col>
                    <Nav className="justify-content-center flex-grow-1 pe-3">
                        {data.footerlinks.map((link) => {
                            return (<Nav.Link key={link.title} href={link.url}>{link.title}</Nav.Link>)
                        })}
                    </Nav>
                </Col>
            </Row>
        )
    }
}

function CopyrightText({ data }) {
    if (data.config.copyright.display) {
        return <Row className="copyright"><Col>Copyright © {(new Date().getFullYear())} <a href="/" alt={data.info.name} title={data.info.name} >{data.info.name}</a>.</Col></Row>;
    }
}