import React from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardText,
  CardBody,
  CardTitle,
  CardSubtitle
} from "reactstrap";

const ReviewCard = props => {
  return (
    <Card body outline color="secondary">
      <CardBody style={{padding: ".5rem"}}>
        <CardTitle>{props.review.title}</CardTitle>
        <Link to={`/reviews/user/${props.review.userId}`}>
          <CardSubtitle>Users First Name</CardSubtitle>
        </Link>
      </CardBody>
      <CardBody>
      <CardText>{props.review.content}</CardText>
      </CardBody>
    </Card>
  );
};

export default ReviewCard;
