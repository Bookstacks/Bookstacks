import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button,
  Container,
  Col,
  Row
} from "reactstrap";

const BookCard = props => {
  return (
    <Card body outline color="secondary">
      <CardBody>
        <CardTitle>{props.book.title}</CardTitle>
        <CardSubtitle>{props.book.author}</CardSubtitle>
      </CardBody>
      <CardBody>
        <Link to={`/books/${props.book.id}`}>
          <CardImg
            top
            width="100%"
            src={props.book.imageUrl}
            alt="Card image cap"
          />
        </Link>
        <CardText>{props.book.description}</CardText>
        <CardText>Price : ${props.book.price}</CardText>
        <Button name={props.book.id} onClick={props.handleClick}>
          ADD TO CART
        </Button>
      </CardBody>
    </Card>
  );
};

export default BookCard;
