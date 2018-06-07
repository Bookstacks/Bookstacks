import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBooks } from "../store";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            cart: []
        }
    }

    componentDidMount(){
        if (!localStorage.cart){
            localStorage.setItem('cart', JSON.stringify([]))
        }
        this.setState({cart: localStorage.cart})
    }

    handleAdd(ev) {
       
    }

    handleSubtract(ev) {
       
    }

    render() {
        
        return (
            <div>
                <h1>Cart</h1>
                <div>
                    {cart.map(item => {
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

// const mapStateToProps = state => {
//     return {
//         books: state.books
//     };
// };

// const mapDispatchToProps = dispatch => {
//     return {
//         loadAllBooks: dispatch(fetchBooks())
//     };
// };

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Cart);
