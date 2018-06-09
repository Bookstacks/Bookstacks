import React from "react";
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
    <Container>
      <Row>
        <Col sm="12" md={{ size: 8, offset: 2 }}>
          <Card body outline color="secondary">
            <CardBody>
              <CardTitle>{props.book.title}</CardTitle>
              <CardSubtitle>{props.book.author}</CardSubtitle>
            </CardBody>
            <CardBody>
              <CardImg
                top
                width="100%"
                src={props.book.imageUrl}
                alt="Card image cap"
              />
              <CardText>{props.book.description}</CardText>
              <CardText>Price : ${props.book.price}</CardText>
              <Button name={props.book.id} onClick={props.handleClick}>
                ADD TO CART
              </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default BookCard;
