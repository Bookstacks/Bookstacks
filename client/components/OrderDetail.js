import React, {Component} from "react";

export default class extends Component {

  render() {
    const items = this.props.order.lineItems
    return (
      <div id='orderDetail'>
        <h1>Order Confirmation</h1>
        <table>
          <tbody>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total</th>
          </tr>
          {
            items && items.map(item => {
              return (
                <tr key={item.id}>
                  <th>{item.book.title}</th>
                  <td>${item.price}</td>
                  <td>{item.quantity}</td>
                  <td id='totalColumn'>${item.quantity * item.price}</td>
                </tr>
              )
            })
          }
          </tbody>
        </table>
      </div>
    );
  }
}

