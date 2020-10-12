import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import ProjectCard from '../components/projectCard'
import { useStaticQuery, graphql } from "gatsby"

const IndexPage = () => {
  // this hook runs at build-time, querying for site data related to portfolio projects
  const query = useStaticQuery(graphql`
    query MyQuery {
    allProjectsJson {
      edges {
        node {
          id
          title
          description
          github_url
          demo_url
          image {
            childImageSharp {
              fluid {
                ...GatsbyImageSharpFluid
              }
            }
          }
        }
      }
    }
  }
  `)


  // this
  const projects = query.allProjectsJson.edges;

  return (
    <Layout>
      <SEO title="Home" />
      <h1>Hello, World!</h1>
      <h3>My Portfolio</h3>
      <div className="project-cards-container">
        {/*We're gonna map over the array of projects by destructuring the nodes, aliased as "project"*/}
        {projects.map(({node: project}) => {
          const id = project.id
          const title = project.title
          const description = project.description
          const demoURL = project.demo_url
          const githubURL = project.github_url
          const imageData = project.image.childImageSharp.fluid

          return (
            <ProjectCard
              key={id}
              title={title}
              description={description}
              demoURL={demoURL}
              githubURL={githubURL}
              imageData={imageData}
            />
          )
        })}
      </div>
    </Layout>
  )
}

export default IndexPage
