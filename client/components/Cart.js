import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios'
import { fetchCart, fetchUpdatedLineItem, fetchDeletedLineItem } from "../store";

class Cart extends Component {
    constructor(){
        super()
        this.handleAdd = this.handleAdd.bind(this)
        this.handleSubtract = this.handleSubtract.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
    }

    componentDidMount(){
        const { userId } = this.props.match.params;
        this.props.loadCart(+userId);
    }

    handleAdd(ev) {
        ev.preventDefault();
        const { userId } = this.props.match.params;
        this.props.updateAndReloadCart(ev.target.name, userId, 1);
    }

    handleSubtract(ev) {
        ev.preventDefault();
        const { userId } = this.props.match.params;
        const [lineItem] = this.props.cart.lineItems.filter(item => item.id)
        const bookId = ev.target.name;
        if (lineItem.quantity >=1) this.props.updateAndReloadCart(ev.target.name, userId, -1);  
    }

    handleDelete(ev) {
        ev.preventDefault();
        const { userId } = this.props.match.params;
        this.props.deleteAndReloadCart(ev.target.name, userId);  
    }

    render() {
        const {lineItems} = this.props.cart;
        
        return lineItems ? (
            <div>
                <h1>Cart</h1>
                <div>
                    {lineItems.map(item => {
                        return (
                            <div key={item.id}>
                                <Link to={`/books/${item.book.id}`}>
                                    <img id="book-img" key={item.book.imageUrl} src={item.book.imageUrl} />
                                </Link>
                                <br />
                                Title : {item.book.title}
                                <br />
                                Author : {item.book.author}
                                <br />
                                Price : ${item.price}
                                <br />
                                Quantity: {item.quantity} 
                                <button onClick={this.handleSubtract} name={item.id} value={item.quantity}>-</button>
                                <button onClick={this.handleAdd} name={item.id} value={item.quantity}>+</button>
                                <br />
                                <button onClick = {this.handleDelete} name={item.id} >Remove Item</button>
                            </div>
                        );
                    })}
                </div>
                <Link to='/checkout'><button>PROCEED TO CHECKOUT</button></Link>
            </div>
        )
        : <div>NO BOOKS ARE IN CART. ADD BOOKS</div>;
    }
}

const mapStateToProps = state => {
    return {
        cart: state.cart,
        user: state.user.id
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
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);
