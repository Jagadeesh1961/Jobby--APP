import './index.css'

import {Link} from 'react-router-dom'

import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

const JobItem = props => {
  const {jobItem} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    packagePerAnnum,
    jobDescription,
    id,
  } = jobItem
  return (
    <Link to={`jobs/${id}`} className="link">
      <div className="job-item-container">
        <div className="logo-title-container">
          <img
            src={companyLogoUrl}
            alt="company logo"
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
        <h1 className="job-description-heading">Description</h1>
        <p className="job-description">{jobDescription}</p>
      </div>
    </Link>
  )
}

export default JobItem
