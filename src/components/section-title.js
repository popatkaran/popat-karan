import React from 'react'
import { Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';


export default function SectionTitle({ highlightedString, normalString }) {
    const highlightedTitleArray = `${highlightedString}`.split('')
    return (
        <div className="section-title">
            <strong>
                {
                    highlightedTitleArray.map((item, index) => {
                        return (<span key={index}>{item}</span>)
                    })
                }
            </strong> {normalString}
        </div>
    )
}
