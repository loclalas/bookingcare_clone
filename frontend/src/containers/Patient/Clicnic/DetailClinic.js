import React, { Component, isValidElement } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./DetailClinic.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import DoctorSchedule from "../Doctor/DoctorSchedule";
import DoctorExtraInfo from "../Doctor/DoctorExtrainfor";
import ProfileDoctor from "../Doctor/ProfileDoctor";
import {
  getDetailClinicService,
  getAllCodeService,
} from "../../../services/userService";
import _ from "lodash";
import { LANGUAGES } from "../../../utils";

class DetailClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arrDoctorId: [],
      dataDetailClinic: {},
    };
  }
  async componentDidMount() {
    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id
    ) {
      let id = this.props.match.params.id;

      let res = await getDetailClinicService({
        id: id,
      });

      if (res && res.errCode === 0) {
        let data = res.data;
        let arrDoctorId = [];
        if (data && !_.isEmpty(res.data)) {
          let arr = data.doctorClinic;
          if (arr && arr.length > 0) {
            arr.map((item) => {
              arrDoctorId.push(item.doctorId);
            });
          }
        }

        this.setState({
          dataDetailClinic: res.data,
          arrDoctorId: arrDoctorId,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
    if (this.props.doctorId !== prevProps.doctorId) {
      let data = await this.getInfoDoctor(this.props.doctorId);
      this.setState({
        dataProfile: data,
      });
    }
  }
  getDataDetailSpecialty = () => {};

  render() {
    let { arrDoctorId, dataDetailClinic } = this.state;
    let { language } = this.props;
    return (
      <>
        <div className="detail-specialty-container">
          <HomeHeader />
          <div className="HomeHeader-fake"></div>
          <div className="detail-specialty-grid">
            <div className="description-specialty-img">
              <div className="description-specialty">
                {dataDetailClinic && !_.isEmpty(dataDetailClinic) && (
                  <>
                    <div>{dataDetailClinic.name}</div>
                    <div
                      dangerouslySetInnerHTML={{
                        __html: dataDetailClinic.contentHTML,
                      }}
                    ></div>
                  </>
                )}
              </div>
            </div>

            {arrDoctorId &&
              arrDoctorId.length > 0 &&
              arrDoctorId.map((item, index) => {
                return (
                  <div className="each-doctor" key={index}>
                    <div className="content-left">
                      <ProfileDoctor
                        doctorId={item}
                        isShowDescriptionDoctor={true}
                        isShowLinkDetail={true}
                        //  dataTime = {dataTime}
                      />
                    </div>
                    <div className="content-right1">
                      <DoctorSchedule doctorIdFromParent={item} />
                      <DoctorExtraInfo doctorIdFromParent={item} />
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailClinic);
