import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import Admin from './Admin'
import { Link } from "react-router-dom";
/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { email } = props

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <Link to = "/order"> Past Orders </Link>
    {
      props.isAdmin ? (
        <Admin />
      ) : (
          <div>
            <h3>Welcome, Regular User{email}</h3>
          </div>
        )
    }
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isAdmin: state.user.admin,
    email: state.user.email
  }
}

export default connect(mapState)(UserHome)

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
}
