import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserRedux.scss";

import "./TableManage.scss";
import * as actions from "../../../store/actions";

import "react-markdown-editor-lite/lib/index.css";

class TableManage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  async componentDidMount() {
    this.props.getAllUserStart();
  }

  handleDeleteUser = (itemID) => {
    this.props.deleteUserStart(itemID);
  };

  handleEditUser = (user) => {
    console.log(user);
    this.props.handleEditFromParent(user);
  };

  render() {
    const { user } = this.props;
    const userArr = user.reverse();
    return (
      <>
        <div className="users-table mt-3 mx-1">
          <table id="table-manage">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
              {userArr &&
                userArr.length > 0 &&
                userArr.map((user, index) => (
                  <tr key={index}>
                    <td>{user.email}</td>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td>{user.address}</td>
                    <td>
                      <button
                        className="edit-btn"
                        onClick={() => this.handleEditUser(user)}
                      >
                        <i class="fas fa-edit"></i>
                      </button>
                      <button
                        className="edit-delete"
                        onClick={() => this.handleDeleteUser(user.id)}
                      >
                        <i class="fas fa-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.admin.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllUserStart: () => dispatch(actions.fetchAllUserStart()),
    deleteUserStart: (userID) => dispatch(actions.deleteUserStart(userID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManage);
