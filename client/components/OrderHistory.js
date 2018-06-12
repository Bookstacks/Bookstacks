import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { fetchOrders, fetchAllOrders } from "../store";
import BookCard from "./BookCard";
import AllBooks from './AllBooks'
import { Container, Row, Col, Input, FormGroup, Label, CardDeck, Jumbotron } from "reactstrap";

class OrderHistory extends Component {

  componentDidMount(){
    const userId = this.props.user.email ? this.props.user.id : localStorage.getItem('userId');
    (this.props.user.admin) ? this.props.fetchAllOrders : this.props.getPastOrders(+userId);
  }

  render() {
    const pastOrders = this.props.orders;
    const items = this.props.orders.map(order => order.lineItems);//nestted Array of LineItems;
    return (
      <div>  
        {pastOrders.length 
          ? <div>
            <h2>Your Orders</h2>
            {pastOrders.map(order => {
              return(
                <div key = {order.id} className="a-box-inner"> 
                  <Jumbotron>
                      <p className="lead" >Order #{order.id}</p>
                      <p className="lead">Order Placed : {order.updatedAt.slice(0, 10)}</p>
                      { (this.props.user.admin) ? <p className="lead">Order Placed by User #{order.userId}</p> : null}
                      <hr className="my-2" />
                      <CardDeck>
                      {order.lineItems.map(item => {
                      return (
    
                        <Col xs="6" sm="4" key={item.id}>
                          <BookCard book={item.book} />
                        </Col>
    
                      )
                      })}
                      </CardDeck>
                      <br/>
                      <p>
                      Total : 
                      $ {order.lineItems.reduce((accum, curr) => accum + Number(curr.price), 0).toFixed(2)}
                      </p>
                  </Jumbotron>
              </div>
              )
              }) }          
          
          </div>
          : <div>
            <h2>Make your first purchase!</h2>
            <AllBooks from= 'order history'/>
            </div>}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    orders: state.order,
    user: state.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    getPastOrders: (userId) => dispatch(fetchOrders(userId)),
    fetchBook: id => dispatch(fetchBook(id)),
    fetchAllOrders: dispatch(fetchAllOrders())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrderHistory);
