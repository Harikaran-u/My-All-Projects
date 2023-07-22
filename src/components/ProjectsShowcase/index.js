import {Component} from 'react'

import Loader from 'react-loader-spinner'

import ProjectCard from '../ProjectCard'
import FailureView from '../FailureView'

import './index.css'

const responseConst = {
  success: 'success',
  failure: 'failure',
}

const categoriesList = [
  {id: 'ALL', displayText: 'All'},
  {id: 'STATIC', displayText: 'Static'},
  {id: 'RESPONSIVE', displayText: 'Responsive'},
  {id: 'DYNAMIC', displayText: 'Dynamic'},
  {id: 'REACT', displayText: 'React'},
]

const loader = (
  <div data-testid="loader">
    <Loader type="ThreeDots" color="#00BFFF" height={50} width={50} />
  </div>
)

class ProjectsShowcase extends Component {
  state = {
    activeTab: categoriesList[0].id,
    isLoading: true,
    projectsData: [],
    status: '',
  }

  componentDidMount() {
    this.getProjectsDetails()
  }

  onSuccessResponse = projects => {
    const updatedProjects = projects.map(eachProject => ({
      id: eachProject.id,
      imageUrl: eachProject.image_url,
      name: eachProject.name,
    }))
    this.setState({
      isLoading: false,
      projectsData: updatedProjects,
      status: 'success',
    })
  }

  onFailureResponse = () => {
    this.setState({isLoading: false, status: 'failure', projectsData: []})
  }

  getProjectsDetails = async () => {
    const {activeTab} = this.state
    const projectsApiUrl = `https://apis.ccbp.in/ps/projects?category=${activeTab}`
    const response = await fetch(projectsApiUrl)
    const data = await response.json()
    if (response.ok === true) {
      this.onSuccessResponse(data.projects)
    } else {
      console.log('failure')
      this.onFailureResponse()
    }
  }

  onChangeSelectInput = event => {
    this.setState({activeTab: event.target.value}, this.getProjectsDetails)
  }

  displaySuccessView = () => {
    const {projectsData} = this.state
    const successView = (
      <ul className="projects-list-container">
        {projectsData.map(eachProject => (
          <ProjectCard key={eachProject.id} project={eachProject} />
        ))}
      </ul>
    )
    return successView
  }

  displayFailureView = () => (
    <FailureView anyFunction={this.getProjectsDetails} />
  )

  renderDisplayContent = () => {
    const {status} = this.state

    switch (status) {
      case responseConst.success:
        return this.displaySuccessView()
      case responseConst.failure:
        return this.displayFailureView()
      default:
        return null
    }
  }

  render() {
    const {activeTab, isLoading} = this.state

    const app = (
      <div className="main-container">
        <nav className="nav-cont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/projects-showcase/website-logo-img.png"
            alt="website logo"
            className="app-logo"
          />
        </nav>
        <div className="display-projects-container">
          <select
            className="select-input"
            value={activeTab}
            onChange={this.onChangeSelectInput}
          >
            {categoriesList.map(eachCategory => (
              <option value={eachCategory.id} key={eachCategory.id}>
                {eachCategory.displayText}
              </option>
            ))}
          </select>
          {isLoading ? loader : this.renderDisplayContent()}
        </div>
      </div>
    )
    return app
  }
}

export default ProjectsShowcase
