import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBooks, fetchAddedItem } from "../store";

class AllBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleClick(event){
    event.preventDefault();
    const userId = this.props.userId;
    const bookId = +event.target.name;
    this.props.addBook(userId, bookId);
  }

  render() {
    const filteredBooks = this.props.books.filter(book =>
      book.title.match(this.state.inputValue)
    );
    return (
      <div>
        <h1>Available Books</h1>
        <input placeholder="Search by Title" onChange={this.handleChange} />
        <div>
          {filteredBooks.map(book => {
            return (
              <div key={book.id}>
                <Link to={`/books/${book.id}`}>
                <img id="book-img" key={book.imageUrl} src={book.imageUrl} />
                </Link>
                <br />
                Title : {book.title}
                <br />
                Author : {book.author}
                <br />
                Price : ${book.price}
                <br />
                Summary : {book.summary}
                <br />
                <button name = {book.id} onClick = {this.handleClick} >ADD TO CART</button>
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
    books: state.books,
    userId: state.user.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadAllBooks: dispatch(fetchBooks()),
    addBook : (userId, bookId) => dispatch(fetchAddedItem(userId, bookId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllBooks);
