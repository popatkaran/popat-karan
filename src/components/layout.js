import * as React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import { Container } from "react-bootstrap"

import Header from "./header"
import Footer from "./footer"
import '../styles/global.css';
import staticData from '../data/data.json'

export const ThemeContext = React.createContext(null)

const Layout = ({ children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
          description
          author
          url
        }
      }
    }
  `)

  let initialTheme = (typeof window !== `undefined` && window.localStorage.getItem('theme') != null) ? window.localStorage.getItem('theme') : ((new Date().getHours() > 16) ? "dark" : "light")
  const [theme, setTheme] = React.useState(initialTheme)

  const toggleTheme = () => {
    setTheme((ct) => (ct === "light" ? "dark" : "light"))
  }

  React.useEffect(() => {
    if (typeof window !== `undefined`) {
      window.localStorage.setItem('theme', theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <Container className="container-fluid p-0" id={theme}>
        <Header data={data.site.siteMetadata} theme={theme} />
        {children}
        <Footer data={staticData} />
      </Container>
    </ThemeContext.Provider>
  )
}

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}

export default Layout