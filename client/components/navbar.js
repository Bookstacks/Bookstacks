import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../store";
import AllBooks from "./AllBooks";

class MyNavbar extends React.Component {
  constructor(props) {
    super(props);

    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
  render() {
    return (
      <div>
        <Navbar color="light" light>
          <NavbarBrand href="/allbooks" className="mr-auto">
            Bookstacks
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink href={`/cart/${this.props.userId}`}>My Cart</NavLink>
              </NavItem>
              {this.props.isLoggedIn ? (
                <div>
                  <NavItem>
                    <NavLink href="/home">Home</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="#" onClick={this.props.handleClick}>
                      Logout
                    </NavLink>
                  </NavItem>
                </div>
              ) : (
                <div>
                  <NavItem>
                    <NavLink href="/login">Login</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink href="/signup">Sign Up</NavLink>
                  </NavItem>
                </div>
              )}
            </Nav>
          </Collapse>
        </Navbar>
      </div>
    );
  }
}

//Allbooks component is added to render functionality. Make a route / move to other component later.

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isLoggedIn: !!state.user.id,
    userId: state.user.id
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick() {
      dispatch(logout());
    }
  };
};

export default connect(
  mapState,
  mapDispatch
)(MyNavbar);

/**
 * PROP TYPES
 */
Navbar.propTypes = {
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
};
