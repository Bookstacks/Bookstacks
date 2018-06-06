import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout, fetchBooks} from '../store'
import axios from 'axios';

class AllBooks extends Component{
	componentDidMount(){
		return this.props.loadAllBooks;
	}

	render(){
		return (
			<div>
			<h1>Available Books</h1>
			<div>
			{
				this.props.books.map(book => {
					return (
						<div key = {book.id}>
							<img id = 'book-img' key = {book.imageUrl} src = {book.imageUrl}/><br/>
							Title : {book.title}<br/>
							Author : {book.author}<br/>
							Price : ${book.price}<br/>
							Summary : {book.summary}<br/>
						</div>
						)
				})
			}
			</div>
			</div>
			)
	}
}

const mapStateToProps = (state) => {
	return {
		books: state.books
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		loadAllBooks: dispatch(fetchBooks())
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(AllBooks);
