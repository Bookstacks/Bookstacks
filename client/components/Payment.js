import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrder } from "../store";

class Checkout extends Component {
    constructor() {
        super();
    }

    componentDidMount() {
        return (
            this.props.fetchOrder(this.props.user.id)
        )
    }

    render() {
        // console.log(this.props)
        const items = this.props.order.lineItems
        return (
            <div>
                <h1>Inside Payment Component</h1>
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
