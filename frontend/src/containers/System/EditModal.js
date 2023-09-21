import { isEmpty } from "lodash";
import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from "reactstrap";
import _ from "lodash";

class ProductManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstname: "",
      lastname: "",
      address: "",
    };
  }

  componentDidMount() {
    let user = this.props.user;
    if (user && !_.isEmpty(user)) {
      this.setState(
        {
          email: user.email,
          password: "asdhfjkdhfjk",
          firstname: user.firstName,
          lastname: user.lastName,
          address: user.address,
        },
        () => {
          console.log(this.state);
        }
      );
    }
  }

  toggle = () => {
    this.props.toggleFromParent();
  };

  handleOnchangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;

    this.setState({
      ...copyState,
    });
  };

  checkValidInput = () => {
    let isValid;
    let arrUser = ["email", "password", "firstname", "lastname", "address"];

    for (let i = 0; i < arrUser.length; i++) {
      if (!this.state[arrUser[i]]) {
        alert(`loi ${arrUser[i]}`);
        return (isValid = false);
      }
    }

    return (isValid = true);
  };

  // checkValidInput = () => {
  //   let arrUser = ["email", "password", "firstname", "lastname", "address"];

  //   const isValid = arrUser.every((value) => this.state[value]);
  //   return isValid;
  // };

  handleEditUser = () => {
    /**
     * Nếu validate: cho tạo thêm user.
     */
    const isValid = this.checkValidInput();
    if (isValid) {
      this.props.editUser(this.state);
    }
  };

  render() {
    return (
      <Modal
        isOpen={this.props.isOpenModalEdit}
        toggle={this.toggle}
        className="modal-user-container"
        size="xl"
      >
        <ModalHeader toggle={this.toggle}>Modal title</ModalHeader>
        <ModalBody>
          <div className="modal-user-body">
            <div className="input-container">
              <label>Email</label>
              <input
                type="email"
                onChange={(event) => this.handleOnchangeInput(event, "email")}
                value={this.state.email}
              ></input>
            </div>
            <div className="input-container">
              <label>Password</label>
              <input
                type="password"
                onChange={(event) =>
                  this.handleOnchangeInput(event, "password")
                }
                value={this.state.password}
              ></input>
            </div>
            <div className="input-container">
              <label>First Name</label>
              <input
                type="text"
                onChange={(event) =>
                  this.handleOnchangeInput(event, "firstname")
                }
                value={this.state.firstname}
              ></input>
            </div>
            <div className="input-container">
              <label>Last Name</label>
              <input
                type="text"
                onChange={(event) =>
                  this.handleOnchangeInput(event, "lastname")
                }
                value={this.state.lastname}
              ></input>
            </div>
            <div className="input-container max-width-input">
              <label>Address</label>
              <input
                type="text"
                onChange={(event) => this.handleOnchangeInput(event, "address")}
                value={this.state.address}
              ></input>
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <Button color="primary px-3" onClick={() => this.handleEditUser()}>
            Save Change
          </Button>{" "}
          <Button color="secondary px-3" onClick={this.toggle}>
            Cancel
          </Button>
        </ModalFooter>
      </Modal>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(ProductManage);
