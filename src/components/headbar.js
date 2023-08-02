import * as React from "react"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { Image } from "react-bootstrap";

import navLinks from '../data/menu-links.json'
import '../styles/components/headbar.css'
import siteLogo from '../images/logo-bg-v3.png'
import NavbarOffcanvas from "react-bootstrap/esm/NavbarOffcanvas";
import ReactSwitch from "react-switch";
import { ThemeContext } from "./layout";


const expand = `false`

function Headbar({ siteTitle }) {
    const themeContext = React.useContext(ThemeContext)
    return (

        <Navbar key={expand} expand={expand} className="mb-3" fixed="top" bg={themeContext.theme} variant={themeContext.theme} id={themeContext.theme}>
            <Container fluid={true}>
                {/* <Navbar.Brand href="/">{siteTitle}</Navbar.Brand> */}
                <Navbar.Brand href="/"><Image src={siteLogo} title={siteTitle} alt={siteTitle} width={180} /></Navbar.Brand>
                <ReactSwitch
                    onChange={themeContext.toggleTheme}
                    checked={themeContext.theme === "light"}
                    className="theme-switch"
                    checkedIcon={false}
                    onColor="#1d65cd"
                    offColor="#07e9ae"
                    uncheckedIcon={false}
                />
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <NavbarOffcanvas
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end"
                    variant={themeContext.theme}
                    bg={themeContext.theme}
                    className={themeContext.theme}
                >
                    <Offcanvas.Header closeButton />

                    <Offcanvas.Body>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                            <Navbar.Brand href="/"><Image src={siteLogo} title={siteTitle} alt={siteTitle} width={180} /></Navbar.Brand>
                        </Offcanvas.Title>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            {navLinks.map((link) => {
                                return (<Nav.Link key={link.title} href={link.url}>{link.title}</Nav.Link>)
                            })}
                        </Nav>
                    </Offcanvas.Body>
                </NavbarOffcanvas>
            </Container>
        </Navbar>

    );
}

export default Headbar;