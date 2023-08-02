import React from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const FluidImage = ({ image, name, customClass }) =>
    <GatsbyImage imgClassName={`${customClass} img-fluid`} image={getImage(image)} alt={name} title={name} />

export default FluidImage