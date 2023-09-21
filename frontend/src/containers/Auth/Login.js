import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";

import * as actions from "../../store/actions";
import "./Login.scss";
import { handleLoginApi } from "../../services/userService";

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: "",
      hidePassword: true,
      errMessage: "",
    };
  }

  handleOnchangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };
  handleOnchangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  handleValue = async () => {
    try {
      this.setState({
        errMessage: "",
      });
      let data = await handleLoginApi(this.state.username, this.state.password);
      console.log(data);

      if (data && data.errCode !== 0) {
        this.setState({
          errMessage: data.message,
        });
      }

      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.userData);
      }
    } catch (error) {
      if (error.response) {
        if (error.response.data) {
          this.setState({
            errMessage: error.response.data.message,
          });
        }
      }
      console.log(error.message);
    }
  };

  handleHidePassword = (event) => {
    this.setState({
      hidePassword: !this.state.hidePassword,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleLogin();
    }
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-container">
          <div className="login-content row">
            <div className="col-12 login-text">Login</div>
            <div className="col-12 form-group login-input">
              <label>Username</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Your User Name"
                value={this.state.username}
                onChange={(event) => this.handleOnchangeUsername(event)}
              />
            </div>
            <div className="col-12 form-group login-input">
              <label>Password</label>
              <input
                type={this.state.hidePassword ? "password" : "text"}
                className="form-control"
                placeholder="Enter Your Password"
                value={this.state.password}
                onChange={(event) => this.handleOnchangePassword(event)}
                onKeyDown={(event) => this.handleKeyDown(event)}
              />{" "}
              <span onClick={() => this.handleHidePassword()}>click</span>
            </div>
            <div className="col-12" style={{ color: "red" }}>
              {this.state.errMessage}
            </div>
            <div className="col-12">
              <button className="btn-login" onClick={() => this.handleValue()}>
                Login
              </button>
            </div>
            <div className="col-12">
              <span>Forgot your password?</span>
            </div>

            <div className="col-12 text-center">
              <span className="text-other-login">Or Login With:</span>
            </div>

            <div className="col-12 social-login">
              <i className="fa-brands fa-google-plus-g"></i>
              <i className="fa-brands fa-facebook-f"></i>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    lang: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    userLoginFail: () => dispatch(actions.userLoginFail()),
    userLoginSuccess: (userInfo) =>
      dispatch(actions.userLoginSuccess(userInfo)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
