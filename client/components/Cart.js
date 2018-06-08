import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchCart } from "../store";

class Cart extends Component {
   

    componentDidMount(props){
        const { userId } = this.props.match.params;
        this.props.loadCart(+userId);
    }

    handleAdd(ev) {
       
    }

    handleSubtract(ev) {
       
    }

    render() {
        const { lineItems } = this.props.cart;
        console.log(this.props.cart, 'cart');

        return (
            <div>
                <h1>Cart</h1>
                <div>
                    {lineItems.map(item => {
                        return (
                            <div key={item.id}>
                                <Link to={`/books/${item.id}`}>
                                    <img id="item-img" key={item.imageUrl} src={item.imageUrl} />
                                </Link>
                                <br />
                                Title : {item.title}
                                <br />
                                Author : {item.author}
                                <br />
                                Price : ${item.price}
                                <br />
                                Quantity: {item.quantity} 
                                <button onClick={this.handleSubtract}>-</button>
                                <button onClick={this.handleAdd}>+</button>
                                <br />
                            </div>
                        );
                    })}

                </div> 

            </div>
        );
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
        }
    };
};


export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);
