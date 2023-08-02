import * as React from "react"
import Headbar from "./headbar"

const Header = ({ data, theme }) => {
    return (
        <Headbar key={`headbar`} siteTitle={data.title || `ADD TITLE AS CONFIGURATION`} theme={theme} />
    )
}

export default Header