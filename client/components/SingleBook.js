import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBook, fetchAddedItem, fetchReviews } from "../store";
import BookCard from "./BookCard";
import ReviewCard from "./Reviews";
import {
  Container,
  Row,
  Col,
  Collapse,
  Button,
  CardBody,
  Card
} from "reactstrap";
import { toast } from "react-toastify";
import ReviewForm from "./ReviewForm";

class SingleBook extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      reviews: false,
      reviewForm: false
    };
    this.handleClick = this.handleClick.bind(this);
    this.toggleReviews = this.toggleReviews.bind(this);
    this.toggleForm = this.toggleForm.bind(this);
  }

  componentDidMount() {
    const id = this.props.match.url.slice(
      this.props.match.url.lastIndexOf("/") + 1
    );
    this.props.fetchBook(id);
    this.props.loadAllReviews();
  }

  handleClick(event) {
    event.preventDefault();
    const userId = this.props.user.email
      ? this.props.user.id
      : localStorage.getItem("userId");
    const bookId = +this.props.book.id;
    this.props.addBook(userId, bookId);
    toast.success(`${this.props.book.title} Added to Cart!`, {
      position: toast.POSITION.BOTTOM_RIGHT
    });
  }

  toggleReviews() {
    this.setState({ reviews: !this.state.reviews });
  }

  toggleForm(){
    this.setState({ reviewForm: !this.state.reviewForm });
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
          <Row style={{ justifyContent: "center" }}>
            <Col xs="6" sm="4">
              <BookCard book={book} handleClick={this.handleClick} />
            </Col>
          </Row>
        </Container>
        <div>
          <h2 className="title">Reviews</h2>
        </div>
        {filteredReviews.length ? (
          <div>
            <Button
              name='reviews'
              color="primary"
              onClick={this.toggleReviews}
              style={{ marginBottom: "1rem" }}
            >
              See {`${filteredReviews.length}`} Reviews
            </Button>
            <Collapse isOpen={this.state.reviews}>
              <Card>
                <CardBody style={{backgroundColor: '#c0deed'}}>
                  {filteredReviews.map(review => {
                    return (
                      <Container key={review.id}>
                        <Row style={{ marginTop: "25px" }}>
                          <Col sm="12" md={{ size: 8, offset: 2 }}>
                            <ReviewCard review={review} />
                          </Col>
                        </Row>
                      </Container>
                    );
                  })}
                </CardBody>
              </Card>
            </Collapse>
          </div>
        ) : (
          <div>
            <h3>Be the first to leave a review!</h3>
          </div>
        )}
        <div>
          <h4 className="title" style={{ marginTop: "30px" }}>
            Bought this book? Please write a review!
          </h4>
          <Container>
            <Button
              id='review-form-button'
              name='reviewForm'
              color="primary"
              onClick={this.toggleForm}
              style={{ marginBottom: "1rem" }}
            >
              Review Form
            </Button>
            <Collapse isOpen={this.state.reviewForm}>
              <Card>
                <CardBody style={{backgroundColor: '#c0deed'}}>
                  <Row style={{ flexWrap: "unset", marginTop: "30px" }}>
                    <Col sm="12" md={{ size: 8, offset: 2 }}>
                      <ReviewForm
                        bookId={book.id}
                        userId={this.props.user.id}
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
            </Collapse>
          </Container>
        </div>
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
    loadAllReviews: () => dispatch(fetchReviews())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleBook);
