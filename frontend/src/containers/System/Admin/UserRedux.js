import React, { Component } from "react";
import { connect } from "react-redux";
import "./UserRedux.scss";
import { LANGUAGES, CRUDActions } from "../../../utils/constant";
import * as actions from "../../../store/actions";
import Lightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import TableManage from "./TableManage";
import CommonUtils from "./../../../utils/CommonUtils";

class UserRedux extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",

      arrGender: [],
      arrPosition: [],
      arrRole: [],
      isOpen: false,
      fileURL: "",

      avatar: "",
      action: CRUDActions.CREATE,
      userID: "",
    };
  }

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    const genderArr = this.props.genders;
    const positionArr = this.props.positions;
    const roleArr = this.props.roles;
    if (prevProps.genders !== this.props.genders) {
      this.setState({
        arrGender: genderArr,
        gender: genderArr && genderArr.length > 0 ? genderArr[0].keyMap : "",
      });
    }

    if (prevProps.positions !== this.props.positions) {
      this.setState({
        arrPosition: positionArr,
        position:
          positionArr && positionArr.length > 0 ? positionArr[0].keyMap : "",
      });
    }

    if (prevProps.roles !== this.props.roles) {
      this.setState({
        arrRole: roleArr,
        role: roleArr && roleArr.length > 0 ? roleArr[0].keyMap : "",
      });
    }

    if (prevProps.listUser !== this.props.listUser) {
      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: genderArr && genderArr.length > 0 ? genderArr[0].keyMap : "",
        position:
          positionArr && positionArr.length > 0 ? positionArr[0].keyMap : "",
        role: roleArr && roleArr.length > 0 ? roleArr[0].keyMap : "",
        avatar: "",
        userID: "",
        fileURL: "",
      });
    }
  }

  handleChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let url = URL.createObjectURL(file);
      this.setState({
        fileURL: url,
        avatar: base64,
      });
    }
  };

  previewImage = () => {
    this.setState({
      isOpen: true,
    });
  };

  validateInput = () => {
    const arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
      "address",
      "gender",
      "position",
      "role",
    ];

    let isValid = true;

    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        alert(`Missing parameter ${arrCheck[i]}`);
        isValid = false;
        break;
      }
    }

    return isValid;
  };

  handleChangeInput = (event, id) => {
    const copyState = { ...this.state };
    copyState[id] = event.target.value;

    this.setState({
      ...copyState,
    });
  };

  submitUserInfo = () => {
    const isValid = this.validateInput();
    const { action } = this.state;
    if (!isValid) return;

    const userData = {
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      address: this.state.address,
      gender: this.state.gender,
      position: this.state.position,
      role: this.state.role,
      avatar: this.state.avatar,
      action: this.state.action,
      userID: this.state.userID,
      avatar: this.state.avatar,
    };

    if (action === CRUDActions.CREATE) {
      this.props.createUserStart(userData);
    }

    if (action === CRUDActions.UPDATE) {
      console.log("da vao update");
      this.props.updateUserStart(userData);

      const genderArr = this.props.genders;
      const positionArr = this.props.positions;
      const roleArr = this.props.roles;

      this.setState({
        email: "",
        password: "",
        firstName: "",
        lastName: "",
        phoneNumber: "",
        address: "",
        gender: genderArr && genderArr.length > 0 ? genderArr[0].keyMap : "",
        position:
          positionArr && positionArr.length > 0 ? positionArr[0].keyMap : "",
        role: roleArr && roleArr.length > 0 ? roleArr[0].keyMap : "",
        avatar: "",
        action: CRUDActions.CREATE,
        userID: "",
        fileURL: "",
      });
    }
  };

  handleEditFromParent = (userData) => {
    let imageBase64;
    if (userData.image) {
      imageBase64 = new Buffer(userData.image, "base64").toString("binary");
    }

    this.setState({
      email: userData.email,
      password: "hardcode",
      firstName: userData.firstName,
      lastName: userData.lastName,
      phoneNumber: userData.phonenumber,
      address: userData.address,
      gender: userData.gender,
      position: userData.positionId,
      role: userData.roleId,
      fileURL: imageBase64,

      avatar: "",
      action: CRUDActions.UPDATE,
      userID: userData.id,
    });
  };

  render() {
    const {
      email,
      password,
      firstName,
      lastName,
      phoneNumber,
      address,
      gender,
      position,
      role,
      arrGender,
      arrRole,
      arrPosition,
      fileURL,
      isOpen,
      action,
    } = this.state;

    const { language, isLoading } = this.props;
    return (
      <div className="user-redux-container">
        <div className="title">User Redux Manage</div>
        <div className="user-redux-container">
          <div className="container">
            <div className="row">
              <div>{isLoading && "Loading"}</div>
              <div className="col-12">Thêm mới người dùng</div>
              <div className="col-3 ">
                <label>Email</label>
                <input
                  className="form-control"
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={(event) => this.handleChangeInput(event, "email")}
                  disabled={action === CRUDActions.UPDATE ? true : false}
                />
              </div>
              <div className="col-3">
                <label>Mật khẩu</label>
                <input
                  value={password}
                  className="form-control"
                  type="password"
                  placeholder="Mật khẩu"
                  onChange={(event) =>
                    this.handleChangeInput(event, "password")
                  }
                  disabled={action === CRUDActions.UPDATE ? true : false}
                />
              </div>
              <div className="col-3">
                <label>Tên</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Tên"
                  value={firstName}
                  onChange={(event) =>
                    this.handleChangeInput(event, "firstName")
                  }
                />
              </div>
              <div className="col-3">
                <label>Họ</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Họ"
                  value={lastName}
                  onChange={(event) =>
                    this.handleChangeInput(event, "lastName")
                  }
                />
              </div>
              <div className="col-3">
                <label>Số điện thoại</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Số điện thoại"
                  value={phoneNumber}
                  onChange={(event) =>
                    this.handleChangeInput(event, "phoneNumber")
                  }
                />
              </div>
              <div className="col-9">
                <label>Địa chỉ</label>
                <input
                  className="form-control"
                  type="text"
                  placeholder="Địa chỉ"
                  value={address}
                  onChange={(event) => this.handleChangeInput(event, "address")}
                />
              </div>
              <div className="col-3 ">
                <label>Giới tính</label>
                <select
                  className="form-control"
                  value={gender}
                  onChange={(event) => this.handleChangeInput(event, "gender")}
                >
                  <option selected>Chọn...</option>
                  {arrGender &&
                    arrGender.length > 0 &&
                    arrGender.map((gender, index) => (
                      <option key={index} value={gender.keyMap}>
                        {language === LANGUAGES.VI
                          ? gender.valueVi
                          : gender.valueEn}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-3 ">
                <label>Chức danh</label>
                <select
                  className="form-control"
                  value={position}
                  onChange={(event) =>
                    this.handleChangeInput(event, "position")
                  }
                >
                  <option selected>Chọn...</option>
                  {arrPosition &&
                    arrPosition.length > 0 &&
                    arrPosition.map((position, index) => (
                      <option key={index} value={position.keyMap}>
                        {language === LANGUAGES.VI
                          ? position.valueVi
                          : position.valueEn}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-3 ">
                <label>Vai trò</label>
                <select
                  className="form-control"
                  value={role}
                  onChange={(event) => this.handleChangeInput(event, "role")}
                >
                  <option selected>Chọn...</option>
                  {arrRole &&
                    arrRole.length > 0 &&
                    arrRole.map((role, index) => (
                      <option key={index} value={role.keyMap}>
                        {language === LANGUAGES.VI
                          ? role.valueVi
                          : role.valueEn}
                      </option>
                    ))}
                </select>
              </div>
              <div className="col-3">
                <label>Ảnh đại diện</label>
                <input
                  type="file"
                  id="previewImg"
                  onChange={(event) => this.handleChangeImage(event)}
                  hidden
                />
                <div>
                  <label className="label-upload" htmlFor="previewImg">
                    Tải ảnh <i className="fas fa-upload"></i>
                  </label>
                  <div
                    className="preview-image"
                    style={{ backgroundImage: `url(${fileURL})` }}
                    onClick={() => this.previewImage()}
                  ></div>

                  {isOpen && (
                    <Lightbox
                      mainSrc={this.state.fileURL}
                      onCloseRequest={() => this.setState({ isOpen: false })}
                    />
                  )}
                </div>
              </div>
              <div className="col-12 mt-3">
                <button
                  className={
                    action === CRUDActions.UPDATE
                      ? "btn btn btn-warning p-3"
                      : "btn btn-primary p-3"
                  }
                  onClick={this.submitUserInfo}
                >
                  {action === CRUDActions.UPDATE ? "Save Change" : "Save"}
                </button>
              </div>
            </div>

            <div className="col-12 mt-3">
              <TableManage handleEditFromParent={this.handleEditFromParent} />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    genders: state.admin.genders,
    isLoading: state.admin.isLoading,
    roles: state.admin.roles,
    positions: state.admin.positions,
    listUser: state.admin.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    createUserStart: (userData) => dispatch(actions.createUserStart(userData)),
    getAllUserStart: () => dispatch(actions.fetchAllUserStart()),
    updateUserStart: (userID) => dispatch(actions.updateUserStart(userID)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UserRedux);
