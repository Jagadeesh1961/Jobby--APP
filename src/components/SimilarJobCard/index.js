import './index.css'

import {FaStar} from 'react-icons/fa'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'

const SimilarJobCard = props => {
  const {jobCard} = props
  const {
    companyLogoUrl,
    title,
    rating,
    location,
    employmentType,
    jobDescription,
  } = jobCard
  return (
    <div className="similar-card-container">
      <div className="similar-logo-title-container">
        <img
          src={companyLogoUrl}
          alt="similar job company logo"
          className="similar-company-logo"
        />
        <div>
          <h1 className="similar-company-title">{title}</h1>
          <div className="similar-star-rating-container">
            <FaStar className="similar-star-img" />
            <p className="similar-rating">{rating}</p>
          </div>
        </div>
      </div>
      <h1 className="similar-job-description-heading">Description</h1>
      <p className="similar-job-description">{jobDescription}</p>

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
    </div>
  )
}

export default SimilarJobCard
