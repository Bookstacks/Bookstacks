import React, {Component} from "react";
import {connect} from "react-redux";
import {Link, Redirect} from "react-router-dom";
import {fetchOrder} from "../store";
import StripeCheckout from 'react-stripe-checkout';
import {PAYMENT_SERVER_URL, STRIPE_PUBLISHABLE} from "../constants";

export default class extends Component {
  constructor() {
    super();
    this.errorPayment = this.errorPayment.bind(this);
    this.successPayment = this.successPayment.bind(this);
    this.fromDollarToCent = this.fromDollarToCent.bind(this);
    this.onToken = this.onToken.bind(this);
    this.calculateTotal = this.calculateTotal.bind(this);
  }

  calculateTotal(items) {
    const reducer = (accumulatedTotal, currentItemObject) => {
      return accumulatedTotal + currentItemObject.quantity * currentItemObject.price
    };
    return items.reduce(reducer, 0)
  }

  errorPayment = data => {
    alert('Payment Error');
  };

  successPayment = data => {
    alert('Payment Successful');
  };

  fromDollarToCent = amount => amount * 100;

  onToken = (amount, description) => token => {
    // fetch('PAYMENT_SERVER_URL', {
    //   method: 'POST',
    //   body: JSON.stringify(token),
    // }).then(response => {
    //   response.json().then(data => {
    //     alert(`We are in business, ${data.email}`);
    //   });
    // });

    axios.post(PAYMENT_SERVER_URL,
      {
        description,
        source: token.id,
        currency: this.props.CURRENCY,
        amount: this.fromEuroToCent(amount)
      })
      .then(this.successPayment)
      .catch(this.errorPayment);
  }

  render() {
    const items = this.props.order.lineItems;
    return (
      <div>
        <h1>Inside Payment Component</h1>
        <StripeCheckout
          amount={items ? this.fromDollarToCent(this.calculateTotal(items)) : 0}
          name={'Bookstack'}
          image={'bookOneImg.svg'}
          currency={this.props.CURRENCY}
          shippingAddress
          billingAddress
          zipCode
          token={this.onToken}
          closed={this.props.onPay}
          stripeKey={STRIPE_PUBLISHABLE}
        />
      </div>
    );
  }
}
