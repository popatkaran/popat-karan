import React from 'react'
import { GatsbyImage, getImage } from "gatsby-plugin-image"

const FluidImage = ({ image, name }) =>
    <GatsbyImage image={getImage(image)} alt={name} title={name} imgClassName="img-fluid" />

export default FluidImage