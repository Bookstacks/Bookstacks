import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout, fetchBook, fetchAddedItem } from "../store";
import axios from "axios";
import BookCard from "./BookCard";
import { Container, Row, Col } from "reactstrap";

class SingleBook extends Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.url.slice(
      this.props.match.url.lastIndexOf("/") + 1
    );
    return this.props.fetchBook(id);
  }

  handleClick(event) {
    event.preventDefault();
    const userId = this.props.userId;
    const bookId = +this.props.book.id;
    this.props.addBook(userId, bookId);
  }

  render() {
    // all properties in books: title, author, genre, description, price, imageUrl
    const book = this.props.book;
    return (
      <div>
        <Container>
          <Row>
            <Col xs="6" sm="4">
              <BookCard book={book} handleClick={this.handleClick} />
            </Col>
          </Row>
        </Container>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    book: state.singleBook,
    userId: state.user.id
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBook: id => dispatch(fetchBook(id)),
    addBook: (userId, bookId) => dispatch(fetchAddedItem(userId, bookId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleBook);
