import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, fetchBook, fetchAddedItem} from '../store'
import axios from 'axios';


class SingleBook extends Component {

  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    const id = this.props.match.url.slice(this.props.match.url.lastIndexOf('/')+1);
    return this.props.fetchBook(id);
  }

  handleClick(event){
    event.preventDefault();
    const userId = this.props.userId;
    const bookId = +this.props.book.id;
    this.props.addBook(userId, bookId);
  }

  render(){
    // all properties in books: title, author, genre, description, price, imageUrl
    // console.log("SingleBook")
    // console.log(this.props)
    // console.log(this.state)
    const book = this.props.book;
    // console.log(this.props)
    return (
      <div>
        <h1>{book.title}</h1>
        <p>{book.genre}</p>
        <p>{book.author}</p>
        <img src={book.imageUrl} />
        <p>{book.description}</p>
        <p>{book.price}</p>
        <button name = {book.id} onClick = {this.handleClick} >ADD TO CART</button>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    book: state.singleBook,
    userId : state.user.id
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBook: (id) => dispatch(fetchBook(id)),
    addBook : (userId, bookId) => dispatch(fetchAddedItem(userId, bookId))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBook)
