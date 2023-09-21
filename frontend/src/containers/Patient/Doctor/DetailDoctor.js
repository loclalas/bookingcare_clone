import React, { Component } from "react";
import { connect } from "react-redux";
import "./DetailDoctor.scss";
import * as actions from "../../../store/actions";
import HomeHeader from "../../HomePage/HomeHeader";
import { getDetailDoctor } from "../../../services/userService";
import DoctorSchedule from "./DoctorSchedule";
import DoctorExtrainfor from "./DoctorExtrainfor";

class DetailDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detailDoctor: {},
      currentDoctorId: -1,
    };
  }

  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      const id = this.props.match.params.id;
      this.setState({
        currentDoctorId: id,
      });

      const doctorData = await getDetailDoctor(id);
      if (doctorData && doctorData.errCode === 0) {
        this.setState({ detailDoctor: doctorData.doctor });
      }
    }
  }

  componentDidUpdate(prevProps, prevState, snapshot) {}

  render() {
    const { detailDoctor, currentDoctorId } = this.state;
    return (
      <>
        <HomeHeader isShowBanner={false} />

        <div className="doctor-detail-container">
          <div className="intro-doctor">
            <div
              className="content-left"
              style={{
                backgroundImage: `url(${
                  detailDoctor && detailDoctor.image ? detailDoctor.image : ""
                })`,
              }}
            ></div>
            <div className="content-right">
              <div className="up">
                {detailDoctor.positionData && detailDoctor.positionData.valueVi}
                {", "}
                {detailDoctor.lastName} {detailDoctor.firstName}
              </div>
              <div className="down">
                {detailDoctor.Markdown && detailDoctor.Markdown.description && (
                  <span>{detailDoctor.Markdown.description}</span>
                )}
              </div>
            </div>
          </div>
          <div className="schedule-doctor">
            <div className="content-left">
              <DoctorSchedule doctorIdFromParent={currentDoctorId} />
            </div>
            <div className="content-right">
              <DoctorExtrainfor doctorIdFromParent={currentDoctorId} />
            </div>
          </div>
          <div className="detail-info-doctor">
            {detailDoctor &&
              detailDoctor.Markdown &&
              detailDoctor.Markdown.contentHTML && (
                <div
                  dangerouslySetInnerHTML={{
                    __html: detailDoctor.Markdown.contentHTML,
                  }}
                ></div>
              )}
          </div>
          <div className="comment-doctor"></div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailDoctor);
