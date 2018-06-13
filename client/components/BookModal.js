import React from "react";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";

class BookModal extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle(event) {    
    if (event.target.value === 'addToCart') this.props.addToCart(event)
    this.setState({
      modal: !this.state.modal
    });
  }

  render() {
    const { book } = this.props;
    return (
      <div>
        <Button color="link" size="sm" style={{paddingTop: 0}}onClick={this.toggle}>
          See Description
        </Button>
        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
          className={this.props.className}
        >
          <ModalHeader toggle={this.toggle}>{book.title}</ModalHeader>
          <ModalBody>{book.description}</ModalBody>
          <ModalFooter>
            <div>Price : ${book.price}</div>
            <Button color="primary" value="addToCart" name={book.id} onClick={this.toggle}>
              ADD TO CART
            </Button>{" "}
            <Button color="secondary" onClick={this.toggle}>
              Go Back
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default BookModal;
