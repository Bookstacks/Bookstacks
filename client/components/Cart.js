import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import axios from 'axios'

import { fetchCart, fetchUpdatedLineItem } from "../store";

class Cart extends Component {
    constructor(){
        super()
        this.handleAdd = this.handleAdd.bind(this)
    
        this.handleSubtract = this.handleSubtract.bind(this)
    }

  componentDidMount(){
      const { userId } = this.props.match.params;
      this.props.loadCart(+userId);
  }

    handleAdd(ev) {
        ev.preventDefault();
        const { userId } = this.props.match.params;
        this.props.reloadCart(ev.target.name, userId, 1);
    }

    handleSubtract(ev) {
        ev.preventDefault();
        const { userId } = this.props.match.params;
        this.props.reloadCart(ev.target.name, userId, -1);  
    }

    render() {
        console.log(this.props.cart, 'props in render');
        const {lineItems} = this.props.cart;
        
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
                                <button onClick={this.handleSubtract} name={item.id} value={item.quantity}>-</button>
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
    console.log(state, 'state')
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
        reloadCart : (lineItemId, userId, increment) => {
            dispatch(fetchUpdatedLineItem(lineItemId, userId, increment))
        }
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);
