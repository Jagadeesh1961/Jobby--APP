import './index.css'

import {withRouter, Link} from 'react-router-dom'

import Cookies from 'js-cookie'

import {AiFillHome} from 'react-icons/ai'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

const Header = props => {
  const onLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="nav-header">
      <div className="header-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-header-logo"
          />
        </Link>
        <ul className="nav-mobile-menu">
          <Link to="/" className="link-item">
            <li className="nav-mobile-item">
              <AiFillHome className="nav-icon" />
            </li>
          </Link>
          <Link to="/jobs" className="link-item">
            <li className="nav-mobile-item">
              <BsBriefcaseFill className="nav-icon" />
            </li>
          </Link>
          <button type="button" className="logout-icon-btn" onClick={onLogout}>
            <li className="nav-mobile-item">
              <FiLogOut className="nav-icon" />
            </li>
          </button>
        </ul>

        <ul className="nav-menu">
          <Link to="/" className="link-item">
            <li className="nav-menu-item">Home</li>
          </Link>
          <Link to="/jobs" className="link-item">
            <li className="nav-menu-item">Jobs</li>
          </Link>
        </ul>
        <button type="button" className="logout-btn" onClick={onLogout}>
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
