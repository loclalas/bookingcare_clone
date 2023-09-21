import React, { Component } from "react";
import { connect } from "react-redux";
import "./OutstandingDoctor.scss";
import Slider from "react-slick";
import * as actions from "../../../store/actions/index";
import { withRouter } from "react-router";

class OutstandingDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      doctorArr: [],
    };
  }

  componentDidMount() {
    this.props.getTopDoctorStart(10);
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.topDoctors !== this.props.topDoctors) {
      this.setState({
        doctorArr: this.props.topDoctors,
      });
    }
  }

  redirectToDoctorDetail = (id) => {
    this.props.history.push(`/detail-doctor/${id}`);
  };

  render() {
    const { doctorArr } = this.state;

    return (
      <div className="section-share section-outstanding-doctor">
        <div className="section-content">
          <div className="section-header">
            <span className="title-section">Bác sĩ nổi bật</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {doctorArr &&
                doctorArr.length > 0 &&
                doctorArr.map((doctor, index) => {
                  let imageBase64;
                  if (doctor.image) {
                    imageBase64 = new Buffer(doctor.image, "base64").toString(
                      "binary"
                    );
                  }
                  return (
                    <div className="section-customize">
                      <div className="customize-border">
                        <div className="outer-bg">
                          <div
                            className="bg-img section-outstanding-doctor"
                            style={{ backgroundImage: `url(${imageBase64})` }}
                            onClick={() =>
                              this.redirectToDoctorDetail(doctor.id)
                            }
                          ></div>
                        </div>
                        <div className="position text-center">
                          <div>
                            {doctor.positionData.valueVi}, {doctor.lastName}{" "}
                            {doctor.firstName}
                          </div>
                          <div>Cơ cương khớp</div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </Slider>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    topDoctors: state.admin.topDoctors,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTopDoctorStart: (limit) => dispatch(actions.getTopDoctorStart(limit)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(OutstandingDoctor)
);
