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
          <CardSubtitle>{props.review.userName}</CardSubtitle>
      </CardBody>
      <CardBody>
      <CardText>{props.review.content}</CardText>
      </CardBody>
    </Card>
  );
};

export default ReviewCard;
