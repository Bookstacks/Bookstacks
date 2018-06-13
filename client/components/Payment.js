import React, {Component} from "react";
import StripeCheckout from 'react-stripe-checkout';
import {PAYMENT_SERVER_URL, STRIPE_PUBLISHABLE} from "../constants";
import axios from 'axios';

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
    axios.post(PAYMENT_SERVER_URL,
      {
        description,
        source: token.id,
        currency: this.props.CURRENCY,
        amount,
      })
      .then(res => {
        console.log(res)
      })
      .then(this.props.onPay)
      .catch(this.errorPayment);
  }

  render() {
    const items = this.props.order.lineItems;
    const total = items ? this.fromDollarToCent(this.calculateTotal(items)) : 0;
    return (
      <div>
        <form id='promoForm'>
          <label>
            Promo code:
            <input type="text" />
          </label>
          <input type="submit" value="Submit" />
        </form>

        <StripeCheckout
          amount={total}
          name={'BOOKSTACK'}
          image={'bookOneImg.svg'}
          currency={this.props.CURRENCY}
          shippingAddress
          billingAddress
          zipCode
          token={this.onToken(total, 'Only Books')}
          stripeKey={STRIPE_PUBLISHABLE}
        />
      </div>
    );
  }
}
