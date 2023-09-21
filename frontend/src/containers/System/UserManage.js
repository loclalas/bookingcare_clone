import React, { Component } from "react";
import { FormattedMessage } from "react-intl";
import { connect } from "react-redux";
import "./UserManage.scss";
import {
  getAllUsers,
  createNewUserService,
  handleDeleteUserService,
} from "../../services/userService";
import UserModal from "./UserModal";
import { reject } from "lodash";
import { emitter } from "../../utils/emitter";
import EditModal from "./EditModal";

class UserManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrUsers: [],
      isOpenModalUser: false,
      isOpenModalEdit: false,
      user: {},
    };
  }

  async componentDidMount() {
    await this.getAllUsersFromReact();
  }

  getAllUsersFromReact = async () => {
    let response = await getAllUsers("ALL");
    console.log("get user from nodejs: ", response);

    if (response && response.errCode === 0) {
      this.setState({
        arrUsers: response.user,
      });
    }
  };

  handleAddNewUser = () => {
    this.setState({
      isOpenModalUser: true,
    });
  };

  toggleUser = () => {
    this.setState({
      isOpenModalUser: !this.state.isOpenModalUser,
    });
  };

  toggleEdit = () => {
    this.setState({
      isOpenModalEdit: !this.state.isOpenModalEdit,
    });
  };

  createNewUser = async (data) => {
    try {
      const response = await createNewUserService(data);

      if (response && response.message.errCode !== 0) {
        alert(response.message.message);
      } else {
        await this.getAllUsersFromReact();
        this.setState({
          isOpenModalUser: !this.state.isOpenModalUser,
        });
        emitter.emit("EVENT_CLEAR_MODAL_DATA");
      }
    } catch (error) {
      console.log(error);
    }
  };

  handleDeleteUser = async (data) => {
    console.log("delete");
    try {
      const response = await handleDeleteUserService(data);
      console.log("response", response);

      if (response && response.message.errCode !== 0) {
        alert(`Loi ${response.message.errCode}`);
      } else {
        await this.getAllUsersFromReact();
      }
    } catch (error) {
      reject(error);
    }
  };

  handleEditUser = (data) => {
    console.log(data);
    this.setState({
      user: data,
      isOpenModalEdit: true,
    });
  };

  editUser = () => {};

  render() {
    let arrUsers = this.state.arrUsers;
    return (
      <div className="users-container">
        <div className="title text-center">Manage User</div>
        <div className="mx-1">
          <button
            className="btn btn-primary px-3"
            onClick={() => this.handleAddNewUser()}
          >
            Add New User
          </button>
        </div>

        <UserModal
          isOpenModalUser={this.state.isOpenModalUser}
          toggleFromParent={this.toggleUser}
          createNewUser={this.createNewUser}
        />

        {this.state.isOpenModalEdit && (
          <EditModal
            user={this.state.user}
            isOpenModalEdit={this.state.isOpenModalEdit}
            toggleFromParent={this.toggleEdit}
          />
        )}

        <div className="users-table mt-3 mx-1">
          <table id="customers">
            <tbody>
              <tr>
                <th>Email</th>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Address</th>
                <th>Action</th>
              </tr>
              {arrUsers &&
                arrUsers.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>{item.email}</td>
                      <td>{item.firstName}</td>
                      <td>{item.lastName}</td>
                      <td>{item.address}</td>
                      <td>
                        <button onClick={() => this.handleEditUser(item)}>
                          Edit
                        </button>
                        <button onClick={() => this.handleDeleteUser(item.id)}>
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(UserManage);
