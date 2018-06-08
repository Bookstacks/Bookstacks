import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios'

import { fetchCart, fetchUpdatedCart } from "../store";

class Cart extends Component {
    constructor(){
        super()
        this.handleAdd = this.handleAdd.bind(this)
    }

  componentDidMount(){
      const { userId } = this.props.match.params;
      this.props.loadCart(+userId);
  }


    handleAdd(ev) {
        ev.preventDefault();
       console.log(ev.target.name)
       this.props.reloadCart(ev.target.name);
    }

    handleSubtract(ev) {
       
    }

    render() {
        console.log(this.props);
        const { lineItems } = this.props.cart;
        console.log(lineItems)
        
        return lineItems ? (
            <div>
                <h1>Cart</h1>
                <div>
                    {lineItems.map(item => {
                        return (
                            <div key={item.id}>
                                <Link to={`/books/${item.book.id}`}>
                                    <img id="item-img" key={item.book.imageUrl} src={item.book.imageUrl} />
                                </Link>
                                <br />
                                Title : {item.book.title}
                                <br />
                                Author : {item.book.author}
                                <br />
                                Price : ${item.price}
                                <br />
                                Quantity: {item.quantity} 
                                <button onClick={this.handleSubtract}>-</button>
                                <button onClick={this.handleAdd} name={item.id} value={item.quantity}>+</button>
                                <br />
                            </div>
                        );
                    })}
                </div>
            </div>
        )
        : null;
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
        reloadCart : (lineItemId) => {
            dispatch(fetchUpdatedCart(lineItemId))
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);
