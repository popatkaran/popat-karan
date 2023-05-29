import * as React from 'react'
import { Badge, Col, Row } from 'react-bootstrap'

import resume from '../../data/popatkaran.json'
import '../../styles/components/resume.css'

const Resume = () => {
  return (
    <>
      <RenderIntro resume={resume} />
      <RenderSummary resume={resume} />
      {/* <RenderSkills resume={resume} /> */}
      <RenderWorkday resume={resume} />
      <RenderSkillBadges resume={resume} />
      <RenderExperiences resume={resume} />
      {/* <RenderPortfolio resume={resume} /> */}
      <RenderEducation resume={resume} />
      <RenderCertifications resume={resume} />
    </>
  )
}
export default Resume

function RenderIntro({ resume }) {

  return (
    <Row>
      <Col className="heading">
        <h2 className='resume-title'>{resume.name}</h2>
        <h5 className='resume-subtitle'>{resume.subTitle}</h5>
        <h5 className='resume-email'><strong>{`Email:`}</strong> {resume.email}</h5>
        <h5 className='resume-phone'><strong>{`Phone:`}</strong> {resume.contact}</h5>
        <h5 className='resume-location'><strong>{`Location:`}</strong> {resume.location}</h5>
      </Col >
    </Row >
  )
}

function RenderSummary({ resume }) {
  return (
    <Row>
      <Col>
        <h5 className='resume-section-title'>Overview</h5>
        <p>{resume.professionalSummary}</p>
      </Col>
    </Row>
  )
}

function RenderSkills({ resume }) {
  return (
    <Row>
      <Col>
        <h5 className='resume-section-title'>Skills</h5>
        {resume.skills.map((skill) => (
          <>
            <h5>{skill.title}</h5>
            <ul>
              {skill.items.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          </>
        ))}
      </Col>
    </Row>
  )
}

function RenderSkillBadges({ resume }) {
  return (
    <Row>
      <Col>
        <h5 className='resume-section-title'>Skills</h5>
        {resume.skill_badges.map((item) => (
          <Badge bg="dark">{item}</Badge>
        ))}
      </Col>
    </Row>
  )
}

function RenderWorkday({ resume }) {
  return (
    <Row>
      <Col>
        <h5 className='resume-section-title'>{resume.workday.title}</h5>
        <ul>
          {resume.workday.duties.map((duty) => (
            <li>{duty}</li>
          ))}
        </ul>
      </Col>
    </Row>
  )
}

function RenderExperiences({ resume }) {
  return (
    <Row>
      <Col>
        <h5 className='resume-section-title'>{resume.experience.title}</h5>
        {resume.experience.companies.map((company) => (
          <>
            <h5 className='company'><strong>{company.role}</strong> | {company.company}</h5>
            <div className='duration'>{company.duration}</div>
            <ul className='duties'>
              {company.duties.map((duty) => (
                <li>{duty}</li>
              ))}
            </ul>
          </>
        ))}
      </Col>
    </Row>
  )
}

function RenderPortfolio({ resume }) {
  return (
    <Row>
      <Col>
        <h5 className='resume-section-title'>{resume.portfolio.title}</h5>
        {resume.portfolio.projects.map((project) => (
          <>
            <h6>{project.project}</h6>
            <ul>
              {project.duties.map((duty) => (
                <li>{duty}</li>
              ))}
            </ul>
          </>
        ))}
      </Col>
    </Row>
  )
}

function RenderEducation({ resume }) {

  return (
    <Row>
      <Col>
        <h5 className='resume-section-title'>{resume.education.title}</h5>

        {resume.education.degrees.map((edu) => (
          <>
            <h5 className='company'><strong>{edu.degree}</strong> | {edu.institution}</h5>
            <div className='duration'>{edu.duration}</div>
          </>
        ))}
      </Col>
    </Row>
  )
}

function RenderEducationGeneric({ resume }) {

  return (
    <Row>
      <Col>
        <h5 className='resume-section-title'>{resume.education.title}</h5>

        {resume.education.degrees.map((edu) => (
          <>
            <h5>{edu.degree} with {edu.grades}</h5>
            <p>
              {edu.institution} during {edu.duration}
            </p>
          </>
        ))}
      </Col>
    </Row>
  )
}

function RenderCertifications({ resume }) {
  return (
    <Row>
      <Col>
        <h5 className='resume-section-title'>Certifications</h5>
        <ul>
          {resume.certifications.map((certification) => (
            <li>
              <a target='_blank' rel="noreferrer" href={certification.url}>{certification.title}</a>
            </li>
          ))}
        </ul>
      </Col>
    </Row>
  )
}
