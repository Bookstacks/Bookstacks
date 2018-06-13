import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import AdminCard from './Admin-cards'
import {Container, Row, Col} from 'reactstrap'
/**
 * COMPONENT
 */
export const UserHome = (props) => {
  const { email } = props

  return (
    <div>
    <Container>
      <Row>
        <Col xs="6" sm="4">
          <AdminCard title="Users" Img="https://upload.wikimedia.org/wikipedia/commons/thumb/1/12/User_icon_2.svg/220px-User_icon_2.svg.png"/>
        </Col>
        <Col xs="6" sm="4">
          <AdminCard title="Products" Img="https://i.pinimg.com/236x/89/2c/df/892cdf29e28bed2b9ac0c64f6ce20198--books-of-bible-clipart-black-and-white.jpg"/>
        </Col>
        <Col xs="6" sm="4" >
          <AdminCard title="Orders" Img="https://cdn2.iconfinder.com/data/icons/wayfinding-system-basic-icon-set/512/salesroom-512.png"/>
        </Col>
      </Row>
    </Container>
    </div>
  )
  
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
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
