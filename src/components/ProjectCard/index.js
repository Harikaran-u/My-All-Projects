import './index.css'

const ProjectCard = props => {
  const {project} = props
  const {imageUrl, name} = project
  const card = (
    <li className="project-card">
      <img src={imageUrl} alt={name} className="project-img" />
      <p className="project-name">{name}</p>
    </li>
  )
  return card
}

export default ProjectCard
