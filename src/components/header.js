import * as React from "react"
import Headbar from "./headbar"

const Header = ({ data }) => {
    return (
        <Headbar key={`headbar`} siteTitle={data.title || `ADD TITLE AS CONFIGURATION`} />
    )
}

export default Header