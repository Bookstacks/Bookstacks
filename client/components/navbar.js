import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import AllBooks from './AllBooks'


const Navbar = ({ handleClick, isLoggedIn }) => (
  <div className='nav'>
    <h1 className='title'>Bookstacks</h1>
    <nav>
      <div className="nav-item">
        <Link to='/allbooks'>Books</Link>
        <Link to={`/cart/${userId}`}>My Cart</Link>
      </div>
      {isLoggedIn ? (
        <div>
          {/* The navbar will show these links after you log in */}
          <Link to="/home" className="nav-item">Home</Link>
          <a href="#" onClick={handleClick}>
            Logout
          </a>
        </div>
      ) : (
        <div className="nav-right">
          {/* The navbar will show these links before you log in */}
          <Link to="/login" className="nav-item nav-item-right">Login</Link>
          <Link to="/signup" className="nav-item nav-item-right">Sign Up</Link>
        </div>
      )}
    </nav>
    <hr />
  </div>
)

//Allbooks component is added to render functionality. Make a route / move to other component later. 

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  }
}

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout())
    }
  }
}

export default connect(mapState, mapDispatch)(Navbar)

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
