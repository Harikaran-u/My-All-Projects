import './index.css'

const FailureView = props => {
  const {anyFunction} = props
  const onClickFunction = () => {
    anyFunction()
  }
  const failure = (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/projects-showcase/failure-img.png"
        alt="failure view"
        className="failure-img"
      />
      <h1 className="failure-head">Oops! Something Went Wrong</h1>
      <p className="failure-info">
        We cannot seem to find the page you are looking for
      </p>
      <button type="button" className="retry-btn" onClick={onClickFunction}>
        Retry
      </button>
    </div>
  )
  return failure
}

export default FailureView
