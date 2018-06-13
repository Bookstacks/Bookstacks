import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchBooks, fetchAddedItem, fetchBook } from "../store";
import BookCard from "./BookCard";
import {toast} from 'react-toastify'
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
    const [ selectedBook ] = this.props.books.filter(book => book.id === bookId)
    
    if (selectedBook.inventoryQuantity >= 1){
      this.props.addBook(userId, bookId);
      toast.success("Added to Cart!", {
        position: toast.POSITION.BOTTOM_RIGHT
      });
    }
    else {
      toast.error("Sold Out", {
      position: toast.POSITION.BOTTOM_RIGHT
      });
    }
  }

  render() {
    const filteredBooks = this.props.books.filter(book =>
      book.title.toLowerCase().match(this.state.inputValue.toLowerCase())
    );

    return (
      <div className = 'search-by-title'>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
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
