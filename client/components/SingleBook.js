import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBook, fetchAddedItem, fetchReviews } from "../store";
import BookCard from "./BookCard";
import ReviewCard from "./Reviews";
import { Container, Row, Col } from "reactstrap";
import {toast} from 'react-toastify'

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
    const userId = this.props.user.email ? this.props.user.id : localStorage.getItem('userId');
    const bookId = +this.props.book.id;
    this.props.addBook(userId, bookId); toast.success("Added to Cart!", {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  render() {
    // all properties in books: title, author, genre, description, price, imageUrl
    const book = this.props.book;
    const filteredReviews = this.props.reviews.filter(
      review => review.bookId === book.id
    );
    return (
      <div>
        <Container>
          <Row style={{justifyContent: 'center'}}>
            <Col xs="6" sm="4">
              <BookCard book={book} handleClick={this.handleClick} />
            </Col>
          </Row>
        </Container>
        <div>
          <h2>Reviews</h2>
        </div>
        {filteredReviews.length ? (
          filteredReviews.map(review => {
            return (
              <Container key={review.id}>
                <Row>
                  <Col sm="12" md={{ size: 8, offset: 2 }}>
                    <ReviewCard review={review} />
                  </Col>
                </Row>
              </Container>
            );
          })
        ) : (
          <div>
            <h3>Be the first to leave a review!</h3>
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    book: state.singleBook,
    user: state.user,
    reviews: state.reviews
  };
};

const mapDispatchToProps = dispatch => {
  return {
    fetchBook: id => dispatch(fetchBook(id)),
    addBook: (userId, bookId) => dispatch(fetchAddedItem(userId, bookId)),
    loadAllReviews: dispatch(fetchReviews())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleBook);
