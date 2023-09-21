import React, { Component } from "react";
import { connect } from "react-redux";
import "./ProfileDoctor.scss";
import { getProfileDoctorById } from "../../../services/userService";
import NumericFormat from "react-number-format";
import { withRouter } from "react-router";

class ProfileDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataProfile: [],
    };
  }

  async componentDidMount() {
    let data = await this.getInfoDoctor(this.props.doctorId);
    this.setState({
      dataProfile: data,
    });
  }

  getInfoDoctor = async (id) => {
    let result = {};
    if (id) {
      let res = await getProfileDoctorById(id);
      if (res && res.errCode === 0) {
        result = res.data;
      }
    }

    return result;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {}

  handleOnClickDetailDoctor = (doctorId) => {
    this.props.history.push(`/detail-doctor/${doctorId}`);
  };

  render() {
    const { dataProfile } = this.state;
    const { isShowLinkDetail, doctorId } = this.props;
    let name = "";

    if (dataProfile && dataProfile.positionData) {
      name = `${dataProfile.positionData.valueVi}, ${dataProfile.lastName} ${dataProfile.firstName}`;
    }

    return (
      <div className="profile-doctor-container">
        <div className="intro-doctor">
          <div
            className="content-left"
            style={{
              backgroundImage: `url(${
                dataProfile && dataProfile.image ? dataProfile.image : ""
              })`,
            }}
          ></div>
          <div className="content-right">
            <div className="up">{name}</div>
            <div className="down">
              {dataProfile &&
                dataProfile.Markdown &&
                dataProfile.Markdown.description && (
                  <span>{dataProfile.Markdown.description}</span>
                )}
            </div>
          </div>
        </div>
        {isShowLinkDetail === true && (
          <div
            onClick={() => this.handleOnClickDetailDoctor(doctorId)}
            className="detailSpecialty-profile"
          >
            Xem them
          </div>
        )}
        <div className="price">
          <b> Giá khám: </b>
          {dataProfile &&
            dataProfile.Doctor_Infor &&
            // <NumericFormat
            //   className="currency"
            //   value={dataProfile.Doctor_Infor.priceTypeData.valueVi}
            //   displayType={"text"}
            //   thousandSeparator={true}
            //   thousandsGroupStyle="VND"
            //   suffix={"VND"}
            // />
            dataProfile.Doctor_Infor.priceTypeData.valueVi}
          <span onClick={() => this.showHideDetailInfor(true)}>
            Xem chi tiết
          </span>
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
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(ProfileDoctor)
);
