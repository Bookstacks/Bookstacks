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
