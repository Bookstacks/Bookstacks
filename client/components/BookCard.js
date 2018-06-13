import React from "react";
import { Link } from "react-router-dom";
import BookModal from "./BookModal";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle,
  Button
} from "reactstrap";


const BookCard = props => {
  return (
    <Card body outline color="secondary">
      <CardBody style={{padding: ".5rem"}}>
        <CardTitle id = 'card-title'>{props.book.title}</CardTitle>
        <CardSubtitle>by {props.book.author}</CardSubtitle>
      </CardBody>
      <BookModal book={props.book} addToCart={props.handleClick}/>
      <CardBody>
        <Link to={`/books/${props.book.id}`}>
          <CardImg
            top
            width="100%"
            src={props.book.imageUrl}
            alt="Card image cap"
            className="book-img"
          />
        </Link>
        {props.item ? (
          <div>
            <CardText style={{marginTop: "1rem", marginBottom:".5rem"}}>Price : ${props.item.price}</CardText>
            <CardText>Quantity: {props.item.quantity}</CardText>
            <div id = 'button-pair'>
            <Button id= 'add-button' name={props.item.id} onClick={props.handleSubtract} value={props.item.quantity}>-</Button>
            <Button name={props.item.id} onClick={props.handleAdd} value={props.item.quantity}>+</Button>
            </div>
            <div className='center-button'>
              <Button name={props.item.id} onClick={props.handleDelete} >Remove Item</Button>
            </div>
          </div>
        ) : (
          <div>
          <CardText style={{marginTop: "1rem", marginBottom:".5rem"}} >Price : ${props.book.price}</CardText>
            <div className = 'center-button'>
              <Button name={props.book.id} onClick={props.handleClick} >
                ADD TO CART
              </Button>
            </div>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default BookCard;
