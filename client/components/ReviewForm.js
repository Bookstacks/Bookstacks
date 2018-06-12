import React, { Component } from 'react';
import { connect } from "react-redux";
import { postReview } from "../store";
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

class ReviewFrom extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            name: '',
            rating: 1,
            content: ''
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
    }

    handleChange(event) {
        this.setState({[event.target.name]: event.target.value})
    }

    handleSubmit(event) {
        event.preventDefault()
        
        console.log({...this.state, bookId: this.props.bookId, userId: this.props.userId})
        this.props.submitReview({...this.state, bookId: this.props.bookId, userId: +this.props.userId})
    }


  render() {
    return (
      <Form onSubmit={this.handleSubmit}>
        <FormGroup row>
          <Label for="reviewTitle" sm={2}>Title</Label>
          <Col sm={10}>
            <Input type="title" name="title" value={this.state.title} onChange={this.handleChange} id="reviewTitle" placeholder="Please Title Your Review" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="reviewName" sm={2}>Name {'(optional)'}</Label>
          <Col sm={10}>
            <Input type="name" name="name" value={this.state.name} onChange={this.handleChange}  id="reviewName" placeholder="Anonymous" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleSelect" sm={2}>Select</Label>
          <Col sm={10}>
            <Input type="select" name="rating" value={this.state.rating} onChange={this.handleChange} id="exampleSelect" >
                <option>1</option>
                <option>2</option>
                <option>3</option>
                <option>4</option>
                <option>5</option>
            </Input>
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="reviewContent" sm={2}>Text Area</Label>
          <Col sm={10}>
            <Input type="textarea" name="content" value={this.state.content} onChange={this.handleChange}  id="reviewContent" />
          </Col>
        </FormGroup>
        <FormGroup check row>
          <Col sm={{ size: 10, offset: 2 }}>
            <Button>Submit</Button>
          </Col>
        </FormGroup>
      </Form>
    );
  }
}

const mapStateToProps = state => {
    return {
      bookId: state.singleBook.id,
      userId: state.user.id
    };
  };
  
  const mapDispatchToProps = dispatch => {
    return {
      submitReview: review => dispatch(postReview(review))
    };
  };
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(ReviewFrom);
  