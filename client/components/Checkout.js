import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrder } from "../store";

class Checkout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputValue: ""
        };
        this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        return (
            this.props.fetchUser,
            this.props.fetchOrder(1)
        )
    }

    handleChange(event) {
        this.setState({ inputValue: event.target.value });
    }

    render() {
        // console.log(this.props)
        const items = this.props.order.lineItems
        return (
            <div id='confirmation'>
                <h1>Order Confirmation</h1>
                <table>
                    <tbody>
                        <tr>
                            <th>Title</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                        {
                            items && items.map(item => {
                                return (
                                    <tr key={item.id}>
                                        <th>{item.book.title}</th>
                                        <td>${item.price}</td>
                                        <td>{item.quantity}</td>
                                        <td id='totalColumn'>${item.quantity * item.price}</td>
                                    </tr>
                                )
                            })
                        }

                    </tbody>
                </table>
                <Link to='/payment'>
                    <button >Confirm and Pay</button>
                </Link>
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
