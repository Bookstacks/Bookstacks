import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrder } from "../store";
import Payment from './Payment';
import PaymentMade from './PaymentMade';
import OrderDetail from './OrderDedail';

class Checkout extends Component {
    constructor() {
        super();
        this.state = {
          payment: false
        }

        this.onPay = this.onPay.bind(this);
    }

    onPay(){
      this.setState({
        payment: true
      })
    }

    componentDidMount() {
        this.setState({
          payment: false
        })
        return (
            this.props.fetchOrder(this.props.user.id)
        )
    }

    render() {
        const items = this.props.order.lineItems
        return (
            <div id='confirmation'>
              {
                this.state.payment ? <PaymentMade /> :
                                     <div>
                                       <OrderDetail order={this.props.order} />
                                       <Payment onPay={this.onPay} user={this.props.user} order={this.props.order} CURRENCY={'USD'}/>
                                     </div>
              }
            </div>
        );
    }
}

  const mapStateToProps = state => {
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
