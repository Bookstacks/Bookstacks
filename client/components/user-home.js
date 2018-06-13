import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import Admin from "./Admin";
import { Link } from "react-router-dom";
import {
  Card,
  CardImg,
  CardText,
  CardBody,
  CardTitle,
  Button,
  Container,
  Row,
  Col
} from "reactstrap";
/**
 * COMPONENT
 */
export const UserHome = props => {
  const { email } = props;

  return (
    <div>
      {props.isAdmin ? (
        <div>
          <h3>Welcome, {email}</h3>
          <Admin />
        </div>
      ) : (
        <div>
          <h3>Welcome, {email}</h3>
          <Container>
            <Row style={{justifyContent: 'center'}}>
              <Col xs="6" sm="4">
                <Card>
                  <CardImg
                    top
                    width="100%"
                    src="https://cdn2.iconfinder.com/data/icons/wayfinding-system-basic-icon-set/512/salesroom-512.png"
                    alt="Card image cap"
                  />
                  <CardBody>
                  <CardTitle style={{textAlign: 'center', fontSize: '25pt'}}>Orders</CardTitle>
                    <CardText style={{margin: '0'}}>Click below to see your order history.</CardText>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                    <Link to="/order">
                      <Button>View All Past Orders</Button>
                    </Link>
                    </div>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      )}
    </div>
  );
};

/**
 * CONTAINER
 */
const mapState = state => {
  return {
    isAdmin: state.user.admin,
    email: state.user.email
  };
};

export default connect(mapState)(UserHome);

/**
 * PROP TYPES
 */
UserHome.propTypes = {
  email: PropTypes.string
};
