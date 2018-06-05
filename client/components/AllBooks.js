import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'
import {logout} from '../store'
import axios from 'axios';

class AllBooks extends Component {

	constructor(){
		super();
		this.state = {
			allbooks : []
		}
	}

	componentDidMount(){
		axios.get('/api/books')
		.then(books => {
			this.setState({allbooks : books.data})
		})
	}

	render(){
		return (
			<div>
				<h1>Available Books</h1>
				<div>
				{
				this.state.allbooks.map(book => {
				return (
					<ul key = {book.id}>
						<img key = {book.imageUrl} src = {book.imageUrl}/>
						<li key = {book.title} >Title : {book.title}</li>
						<li key = {book.author} >Author : {book.author}</li>
						<li key = {book.price} >Price : ${book.price}</li>
						<li key = {book.summary} >Summary : {book.summary}</li>
					</ul>
				)
				})
				}
				</div>
			</div>
			)
	}
}

export default AllBooks