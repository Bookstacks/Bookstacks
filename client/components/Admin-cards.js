import React from 'react';
import { Card, CardImg, CardText, CardBody,
  CardTitle, Button } from 'reactstrap';

const AdminCard = (props) => {
  return (
    <div>
      <Card>
        <CardImg top width="100%" src={props.Img} alt="Card image cap" />
        <CardBody>
          <CardTitle>View All {props.title}</CardTitle>
          <CardText>Click below to see all {props.title}.</CardText>
          <Button>View All {props.title}</Button>
        </CardBody>
      </Card>
    </div>
  );
};

export default AdminCard;