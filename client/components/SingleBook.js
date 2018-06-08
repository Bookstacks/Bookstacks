import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, fetchBook} from '../store'
import axios from 'axios';


class SingleBook extends Component {

  componentDidMount(){
    const id = this.props.match.url.slice(this.props.match.url.lastIndexOf('/')+1);
    return this.props.fetchBook(id);
  }

  render(){
    // all properties in books: title, author, genre, description, price, imageUrl
    console.log("SingleBook")
    console.log(this.props)
    console.log(this.state)
    const book = this.props.book;
console.log(this.props)
    return (
      <div>
        <h1>{book.title}</h1>
        <p>{book.genre}</p>
        <p>{book.author}</p>
        <img src={book.imageUrl} />
        <p>{book.description}</p>
        <p>{book.price}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    book: state.singleBook
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    fetchBook(id){
      dispatch(fetchBook(id))
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SingleBook)
