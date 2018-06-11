import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchBooks, fetchAddedItem } from "../store";
import BookCard from "./BookCard";
import { Container, Row, Col, Input, FormGroup, Label } from "reactstrap";

class AllBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: ""
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount(){
    this.props.loadAllBooks();
  }

  handleChange(event) {
    this.setState({ inputValue: event.target.value });
  }

  handleClick(event) {
    event.preventDefault();
    const userId = this.props.user.email ? this.props.user.id : localStorage.getItem('userId');
    const bookId = +event.target.name;
    this.props.addBook(userId, bookId);
  }

  render() {
    const filteredBooks = this.props.books.filter(book =>
      book.title.match(this.state.inputValue)
    );
    return (
      <div>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <h1 className="title">Available Books</h1>
          <FormGroup row>
            <Label for="serach" sm={2}>
              Search by Title:
            </Label>
            <Col sm={10}>
              <Input
                type="searchBar"
                name="searchBar"
                id="searchBar"
                placeholder="Enter Title Here"
                onChange={this.handleChange}
              />
            </Col>
          </FormGroup>
        </Col>
        <div>
          <Container>
            <Row>
              {filteredBooks.map(book => {
                return (
                  <Col xs="6" sm="4" key={book.id}>
                    <BookCard book={book} handleClick={this.handleClick} />
                  </Col>
                );
              })}
            </Row>
          </Container>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    books: state.books,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    loadAllBooks: () => dispatch(fetchBooks()),
    addBook: (userId, bookId) => dispatch(fetchAddedItem(userId, bookId))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AllBooks);
