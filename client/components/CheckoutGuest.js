import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart } from "../store";
import Payment from './Payment';
import PaymentMade from './PaymentMade';
import OrderDetail from './OrderDedail';
import axios from 'axios';

class CheckoutGuest extends Component {
  constructor() {
    super();
    this.state = {
      payment: false
    }

    this.onPay = this.onPay.bind(this);
  }

  onPay(){
    axios.put('/api/order/', {orderId : this.props.cart.id})
    this.setState({
      payment: true
    })
  }

  componentDidMount() {
    const userId = localStorage.getItem('userId')
    this.setState({
      payment: false
    })
    return (
      this.props.loadCart(+userId)
    )
  }

  render() {
    return (
      <div id='confirmation'>
        {
          this.state.payment ? <PaymentMade /> :
            <div>
              <OrderDetail order={this.props.cart} />
              <Payment onPay={this.onPay}  order={this.props.cart} CURRENCY={'USD'}/>
            </div>
        }
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    cart : state.cart,
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadCart(id) {
      dispatch(fetchCart(id))
    }
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CheckoutGuest);
