import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBooks } from "../store";

class AllBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value });
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
    books: state.books
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadAllBooks: dispatch(fetchBooks())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllBooks);
