import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import Header from '../Header'

import './index.css'
import JobItem from '../JobItem'
import FilterGroup from '../FilterGroups'
import ProfileDetails from '../ProfileDetails'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

class Jobs extends Component {
  state = {
    jobsList: [],
    profileDetails: [],
    activeEmploymentType: [],
    activeSalaryRange: '',
    searchInput: '',
    apiJobStatus: apiStatusConstants.initial,
    apiProfileStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getJobs()
    this.getProfileDetails()
  }

  getProfileDetails = async () => {
    this.setState({
      apiProfileStatus: apiStatusConstants.inProgress,
    })

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      const fetchedProfileDetails = {
        shortBio: data.profile_details.short_bio,
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
      }
      this.setState({
        profileDetails: fetchedProfileDetails,
        apiProfileStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiProfileStatus: apiStatusConstants.failure,
      })
    }
  }

  getJobs = async () => {
    this.setState({
      apiJobStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {activeEmploymentType, activeSalaryRange, searchInput} = this.state
    const employTypes = activeEmploymentType.join(',')

    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employTypes}&minimum_package=${activeSalaryRange}&search=${searchInput}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const data = await response.json()
      const fetchedJobList = data.jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        packagePerAnnum: eachItem.package_per_annum,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      this.setState({
        jobsList: fetchedJobList,
        apiJobStatus: apiStatusConstants.success,
      })
      console.log(fetchedJobList)
    } else {
      this.setState({
        apiJobStatus: apiStatusConstants.failure,
      })
    }
  }

  onChangeEmploymentType = employmentType => {
    const {activeEmploymentType} = this.state

    let updatedList = activeEmploymentType

    if (activeEmploymentType.includes(employmentType)) {
      updatedList = activeEmploymentType.filter(
        eachType => eachType !== employmentType,
      )
    } else {
      updatedList = [...updatedList, employmentType]
    }
    this.setState(
      {
        activeEmploymentType: updatedList,
      },
      this.getJobs,
    )
  }

  onChangeSalaryRange = salary => {
    this.setState(
      {
        activeSalaryRange: salary,
      },
      this.getJobs,
    )
  }

  renderJobItemDetailFailureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="fail-img"
      />
      <h1 className="failure-heading">Oops! Something Went wrong</h1>
      <p className="failure-description">
        We cannot seem to find the page you are looking for.
      </p>
      <button
        type="button"
        className="retry-btn"
        onClick={() => this.getJobs()}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderJobsView = () => {
    const {jobsList} = this.state

    return (
      <>
        {jobsList.length > 0 ? (
          <ul className="jobs-list">
            {jobsList.map(eachJob => (
              <JobItem jobItem={eachJob} key={eachJob.id} />
            ))}
          </ul>
        ) : (
          this.renderNoJobsFoundView()
        )}
      </>
    )
  }

  renderJobsItems = () => {
    const {apiJobStatus} = this.state

    switch (apiJobStatus) {
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      case apiStatusConstants.success:
        return this.renderJobsView()
      case apiStatusConstants.failure:
        return this.renderJobItemDetailFailureView()

      default:
        return null
    }
  }

  onChangeSearchInput = event => {
    this.setState({
      searchInput: event.target.value,
    })
  }

  onClickSearch = () => {
    this.getJobs()
  }

  renderNoJobsFoundView = () => (
    <div className="no-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1 className="no-jobs-found-heading">No Jobs Found</h1>
      <p className="no-jobs-found-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderSearchBar = searchBarId => {
    const {searchInput} = this.state
    return (
      <div className="search-container" id={searchBarId}>
        <input
          type="search"
          className="input-search"
          placeholder="Search"
          value={searchInput}
          onChange={this.onChangeSearchInput}
        />
        <button
          type="button"
          data-testid="searchButton"
          className="search-icon-container"
          onClick={this.onClickSearch}
        >
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  renderSideBar = () => {
    const {activeSalaryRange, profileDetails, apiProfileStatus} = this.state

    return (
      <>
        {this.renderSearchBar('smallBar')}
        <ProfileDetails
          profileDetails={profileDetails}
          apiProfileStatus={apiProfileStatus}
          getProfileDetails={this.getProfileDetails}
        />
        <FilterGroup
          salaryRangesList={salaryRangesList}
          employmentTypesList={employmentTypesList}
          onChangeEmploymentType={this.onChangeEmploymentType}
          onChangeSalaryRange={this.onChangeSalaryRange}
          activeSalaryRange={activeSalaryRange}
        />
      </>
    )
  }

  render() {
    return (
      <div className="jobs-container">
        <Header />
        <div className="sidebar-jobs-container">
          <div className="jobs-left-container">{this.renderSideBar()}</div>
          <div className="right-container">
            {this.renderSearchBar('largeBar')}
            {this.renderJobsItems()}
          </div>
        </div>
      </div>
    )
  }
}

export default Jobs
