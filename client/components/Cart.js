import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios'
import { fetchCart, fetchUpdatedLineItem, fetchDeletedLineItem } from "../store";
import { CardDeck, Col, Button } from "reactstrap";
import BookCard from "./BookCard";

class Cart extends Component {
    constructor(){
        super()
        this.handleAdd = this.handleAdd.bind(this)
        this.handleSubtract = this.handleSubtract.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount(){
        const userId = this.props.match.params.userId
        this.props.loadCart(+userId);
    }

    handleAdd(ev) {
        ev.preventDefault();
        const userId = this.props.user.email ? this.props.user.id : localStorage.getItem('userId')
        this.props.updateAndReloadCart(ev.target.name, userId, 1);
    }

    handleSubtract(ev) {
        ev.preventDefault();
        const userId = this.props.user.email ? this.props.user.id : localStorage.getItem('userId')
        const [lineItem] = this.props.cart.lineItems.filter(item => item.id)
        const bookId = ev.target.name;
        if (lineItem.quantity >=1) this.props.updateAndReloadCart(ev.target.name, userId, -1);
    }

    handleDelete(ev) {
        ev.preventDefault();
        const userId = this.props.user.email ? this.props.user.id : localStorage.getItem('userId')
        this.props.deleteAndReloadCart(ev.target.name, userId);
    }

    render() {
        const {lineItems} = this.props.cart;
        const userId = this.props.user.email ? this.props.user.id : localStorage.getItem('userId')
        const link = this.props.user.email ? '/checkout' : '/guestCheckout';
        return lineItems ? (
            <div>
                <h1 className='title' >Cart</h1>
                <div>
                    <CardDeck>
                    {lineItems.map(item => {
                        return (
                            <Col xs="6" sm="4" key={item.id}>
                                <BookCard book={item.book} item={item} handleSubtract={this.handleSubtract} handleAdd={this.handleAdd} handleDelete={this.handleDelete} />
                            </Col>
                        );
                    })}
                    </CardDeck>
                </div>
                <div id = 'link-checkout'>
                  <Link to={link}><button>PROCEED TO CHECKOUT</button></Link> 
                </div>
            </div>
        )
        : 
        <div>
            <h1>Add Items to Cart</h1>
        </div>;
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart,
        user: state.user
    };
};

const mapDispatchToProps = dispatch => {
    return {
        loadCart: (userId) => {
            dispatch(fetchCart(userId))
        },
        updateAndReloadCart : (lineItemId, userId, increment) => {
            dispatch(fetchUpdatedLineItem(lineItemId, userId, increment))
        },
        deleteAndReloadCart : (lineItemId, userId) => {
            dispatch(fetchDeletedLineItem(lineItemId, userId))
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);
