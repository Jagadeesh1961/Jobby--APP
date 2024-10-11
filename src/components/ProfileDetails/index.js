import './index.css'

import Loader from 'react-loader-spinner'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const ProfileDetails = props => {
  const {getProfileDetails} = props
  const renderProfileDetailsView = () => {
    const {profileDetails} = props
    const {name, shortBio, profileImageUrl} = profileDetails
    return (
      <div className="profile-bg-container">
        <img src={profileImageUrl} alt="profile" className="profile" />
        <h1 className="profile-name">{name}</h1>
        <p className="profile-bio">{shortBio}</p>
      </div>
    )
  }

  const renderProfileFailure = () => (
    <div className="profile-failure-container">
      <button
        className="retry-button"
        type="button"
        onClick={getProfileDetails}
      >
        Retry
      </button>
    </div>
  )

  const renderLoadingView = () => (
    <div className="loader-container-profile" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  const {apiProfileStatus} = props

  switch (apiProfileStatus) {
    case apiStatusConstants.success:
      return renderProfileDetailsView()
    case apiStatusConstants.inProgress:
      return renderLoadingView()
    case apiStatusConstants.failure:
      return renderProfileFailure()

    default:
      return null
  }
}

export default ProfileDetails
