import React from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  Badge
} from "reactstrap";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import AllBooks from "./AllBooks";
import { fetchCart, logout } from "../store";
import {toast} from 'react-toastify'

class MyNavbar extends React.Component {
  constructor(props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true,
     };
  }

  componentDidMount(){
    if (this.hasNoUser()) {
      localStorage.setItem('sessionId', '');
      localStorage.setItem('userId', '');
    }
    const userId = this.props.user.email ? this.props.user.id : localStorage.getItem('userId')
    this.props.loadCart(+userId);
  }

  componentDidUpdate(prevProps) {
    const userId = this.props.user.email ? this.props.user.id : localStorage.getItem('userId')
    let currPropsItem
    let prevPropsItem
    if (this.props.cart.lineItems){
      currPropsItem = this.props.cart.lineItems.reduce((sumOfItems, item) => {
        sumOfItems += item.quantity;
        return sumOfItems;
      }, 0);
    }
    if (prevProps.cart.lineItems){
      prevPropsItem = prevProps.cart.lineItems.reduce((sumOfItems, item) => {
        sumOfItems += item.quantity;
        return sumOfItems;
      }, 0);
    }
    if (currPropsItem !== prevPropsItem) {
      this.props.loadCart(+userId);
    }
  }

  hasNoUser(){
    const hasNoSession = !localStorage.getItem('sessionId') || localStorage.getItem('sessionId') === 'undefined';
    const hasNoUser = !localStorage.getItem('userId') || localStorage.getItem('userId') === 'undefined'
    return hasNoSession || hasNoUser;
  }

  toggleNavbar() {
    this.setState({
      collapsed: !this.state.collapsed
    });
    const userId = this.props.user.email ? this.props.user.id : localStorage.getItem('userId')
    this.props.loadCart(+userId);
  }

  render() {
    if (this.hasNoUser()) {
      localStorage.setItem('sessionId', this.props.user.sessionId);
      localStorage.setItem('userId', this.props.user.id);
    }

    const userId = this.props.user.email ? this.props.user.id : localStorage.getItem('userId')
    return (
      <div>
        <Navbar color="light" light>
          <NavbarBrand onClick={this.toggleNavbar} tag={Link} to="/allbooks" className="mr-auto">
            <img src ={'/images/bookstacks-logo.jpg'} id = 'bookstacks-logo' alt = 'bookstacks-logo'/>
          </NavbarBrand>
          <p id = 'empty-cart'>“I spent all the money I had, to get the sacred books of my life.”<br/>― Lailah Gifty Akita</p>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <Collapse isOpen={!this.state.collapsed} navbar>
            <Nav navbar>
              <NavItem>
                <NavLink onClick={this.toggleNavbar} tag={Link} to="/allbooks">Books</NavLink>
              </NavItem>
              <NavItem>
                <NavLink onClick={this.toggleNavbar} tag={Link} to={`/cart/${userId}`}>
                  My Cart{" "}
                  {this.props.cart.lineItems ? (
                    <Badge color="secondary">
                      {this.props.cart.lineItems.reduce((sumOfItems, item) => {
                        sumOfItems += item.quantity;
                        return sumOfItems;
                      }, 0)}
                    </Badge>
                  ) : null}
                </NavLink>
              </NavItem>
              {this.props.isLoggedIn ? (
                <div>
                  <NavItem>
                    <NavLink onClick={this.toggleNavbar} tag={Link} to="/home">Home</NavLink>
                  </NavItem>
                  <NavItem onClick={this.toggleNavbar}>
                    <NavLink tag={Link} to="#" onClick={this.props.handleClick}>
                      Logout
                    </NavLink>
                  </NavItem>
                </div>
              ) : (
                <div>
                  <NavItem>
                    <NavLink onClick={this.toggleNavbar} tag={Link} to="/login">Login</NavLink>
                  </NavItem>
                  <NavItem>
                    <NavLink onClick={this.toggleNavbar} tag={Link} to="/signup">Sign Up</NavLink>
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
    isLoggedIn: !!state.user.email,
    user: state.user,
    cart: state.cart
  };
};

const mapDispatch = dispatch => {
  return {
    handleClick : () => {
      dispatch(logout());
      toast.error("Bye, We're Sad to See You Go!!", {
        position: toast.POSITION.TOP_RIGHT
      });
    },
    loadCart: userId => {
      dispatch(fetchCart(userId));
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
