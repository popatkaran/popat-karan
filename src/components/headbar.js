import * as React from "react"
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';

import navLinks from '../data/menu-links.json'
import '../styles/components/headbar.css'

const expand = `false`

function Headbar({ siteTitle }) {
    return (
        <Navbar key={expand} expand={expand} className="mb-3" fixed="top">
            <Container fluid={true}>
                <Navbar.Brand href="/">{siteTitle}</Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-${expand}`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>

                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                            {siteTitle}
                        </Offcanvas.Title>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            {navLinks.map((link) => {
                                return (<Nav.Link key={link.title} href={link.url}>{link.title}</Nav.Link>)
                            })}
                        </Nav>
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar>
    );
}

export default Headbar;