import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {GoLinkExternal} from 'react-icons/go'

import './index.css'

import Header from '../Header'
import SkillItem from '../SkillItem'
import SimilarJobCard from '../SimilarJobCard'

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'INPROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  state = {
    apiStatus: apiStatusConstants.initial,
    jobDetails: [],
    skillsList: [],
    similarJobs: [],
  }

  componentDidMount() {
    this.getJobItemDetails()
  }

  getJobItemDetails = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    const {match} = this.props
    const {id} = match.params

    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)

    if (response.ok === true) {
      const data = await response.json()

      const {skills} = data.job_details

      const fetchedJobDetails = {
        companyLogoUrl: data.job_details.company_logo_url,
        companyWebsiteUrl: data.job_details.company_website_url,
        employmentType: data.job_details.employment_type,
        id: data.job_details.id,
        jobDescription: data.job_details.job_description,
        location: data.job_details.location,
        description: data.job_details.life_at_company.description,
        imageUrl: data.job_details.life_at_company.image_url,
        packagePerAnnum: data.job_details.package_per_annum,
        rating: data.job_details.rating,
        title: data.job_details.title,
      }

      const fetchedSkills = skills.map(eachItem => ({
        name: eachItem.name,
        imageUrl: eachItem.image_url,
      }))

      const fetchedSimilarJobs = data.similar_jobs.map(eachItem => ({
        companyLogoUrl: eachItem.company_logo_url,
        employmentType: eachItem.employment_type,
        id: eachItem.id,
        jobDescription: eachItem.job_description,
        location: eachItem.location,
        rating: eachItem.rating,
        title: eachItem.title,
      }))

      this.setState({
        jobDetails: fetchedJobDetails,
        skillsList: fetchedSkills,
        similarJobs: fetchedSimilarJobs,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderJobItemDetailView = () => {
    const {jobDetails, skillsList, similarJobs} = this.state
    const {
      companyLogoUrl,
      title,
      rating,
      location,
      employmentType,
      jobDescription,
      packagePerAnnum,
      companyWebsiteUrl,
      description,
      imageUrl,
    } = jobDetails
    return (
      <div className="detail-card-container">
        <div className="card-content-container">
          <div className="logo-title-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
              className="company-logo"
            />
            <div>
              <h1 className="company-title">{title}</h1>
              <div className="star-rating-container">
                <FaStar className="star-img" />
                <p className="rating">{rating}</p>
              </div>
            </div>
          </div>
          <div className="location-type-package-container">
            <div className="location-type-container">
              <div className="location-container">
                <MdLocationOn className="location-logo" />
                <p className="location-name">{location}</p>
              </div>
              <div className="job-type-container">
                <BsBriefcaseFill className="job-type" />
                <p className="job-name">{employmentType}</p>
              </div>
            </div>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="separator" />
          <div className="description-visit-container">
            <h1 className="job-description-heading">Description</h1>
            <a href={companyWebsiteUrl} className="link-container">
              <p className="visit">Visit</p>
              <GoLinkExternal className="link-img" />
            </a>
          </div>
          <p className="job-description">{jobDescription}</p>
          <h1 className="skills-heading">Skills</h1>
          <ul className="skill-list-container">
            {skillsList.map(eachSkill => (
              <SkillItem key={eachSkill.name} skillCard={eachSkill} />
            ))}
          </ul>
          <h1 className="life-at-company">Life at Company</h1>
          <div className="life-container">
            <p className="life-description">{description}</p>
            <img src={imageUrl} className="life-image" alt="life at company" />
          </div>
        </div>
        <h1 className="similar-job-heading">Similar Jobs</h1>
        <div className="similar-job-list">
          {similarJobs.map(eachJob => (
            <SimilarJobCard jobCard={eachJob} key={eachJob.id} />
          ))}
        </div>
      </div>
    )
  }

  renderJobItemDetailLoadingView = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

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
        onClick={() => this.getJobItemDetails()}
      >
        Retry
      </button>
    </div>
  )

  renderJobItemDetails = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobItemDetailView()
      case apiStatusConstants.failure:
        return this.renderJobItemDetailFailureView()
      case apiStatusConstants.inProgress:
        return this.renderJobItemDetailLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="job-item-detail-container">
        <Header />
        <div className="job-container">{this.renderJobItemDetails()}</div>
      </div>
    )
  }
}

export default JobItemDetails
