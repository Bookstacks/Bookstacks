import React, { Component } from 'react';
import { Col, Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';

export default class ReviewFrom extends Component {
    constructor(props){
        super(props);
        this.state = {
            inputTitle: ''
        }
    }
  render() {
    return (
      <Form>
        <FormGroup row>
          <Label for="reviewTitle" sm={2}>Title</Label>
          <Col sm={10}>
            <Input type="title" name="title" id="reviewTitle" placeholder="Please Title Your Review" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="reviewName" sm={2}>Name {'(optional)'}</Label>
          <Col sm={10}>
            <Input type="name" name="name" id="reviewName" placeholder="Anonymous" />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="exampleSelect" sm={2}>Select</Label>
          <Col sm={10}>
            <Input type="select" name="select" id="exampleSelect" >
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
            <Input type="textarea" name="content" id="reviewContent" />
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