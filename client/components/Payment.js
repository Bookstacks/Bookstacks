import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrder } from "../store";
import StripeCheckout from 'react-stripe-checkout';

class Checkout extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        return (
            this.props.fetchOrder(this.props.user.id)
        )
    }

    onToken = (token) => {
      fetch('/save-stripe-token', {
        method: 'POST',
        body: JSON.stringify(token),
      }).then(response => {
        response.json().then(data => {
          alert(`We are in business, ${data.email}`);
        });
      });
    }

    render() {
        // console.log(this.props)
        const items = this.props.order.lineItems
        return (
            <div>
                <h1>Inside Payment Component</h1>
                <StripeCheckout
                  token={this.onToken}
                  stripeKey="my_PUBLISHABLE_stripekey"
                />
            </div>
        );
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        user: state.user,
        order: state.order
    };
};

const mapDispatchToProps = dispatch => {
    return {
        fetchOrder(id) {
            dispatch(fetchOrder(id))
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Checkout);
