import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorSchedule.scss";
import HomeHeader from "../../HomePage/HomeHeader";
import * as actions from "../../../store/actions";
import {
  getDetailDoctor,
  getScheduleDoctorByDate,
} from "../../../services/userService";
import localization from "moment/locale/vi";
import moment from "moment";
import BookingModal from "../Doctor/Modal/BookingModal";

class DoctorSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      allDays: [],
      allAvailableTime: [],
      isOpenModalBooking: false,
      dataScheduleTimeModal: [],
    };
  }

  componentDidMount() {
    let allDays = this.getArrDays();
    this.setState({
      allDays: allDays,
    });
  }

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  getArrDays = () => {
    let allDays = [];

    for (let i = 0; i < 7; i++) {
      let object = {};

      if (i === 0) {
        let ddMM = moment(new Date()).format("DD/MM");
        let today = `Hôme nay - ${ddMM}`;
        object.label = today;
      } else {
        object.label = this.capitalizeFirstLetter(
          moment(new Date()).add(i, "days").format("dddd - DD/MM")
        );
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();

      allDays.push(object);
    }
    return allDays;
  };

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let allDays = this.getArrDays();
      let res = await getScheduleDoctorByDate(
        this.props.doctorIdFromParent,
        allDays[0].value
      );
      if (this.props.doctorIdFromParent) {
        let res = await getScheduleDoctorByDate(
          this.props.doctorIdFromParent,
          allDays[0].value
        );

        this.setState({
          allAvailableTime: res.data ? res.data : [],
        });
      }

      this.setState({
        allAvailableTime: res.data ? res.data : [],
      });
    }
  }

  handleOnChangeSelect = async (event) => {
    if (this.props.doctorIdFromParent && this.props.doctorIdFromParent !== -1) {
      let doctorId = this.props.doctorIdFromParent;
      let date = event.target.value;
      let { info } = await getScheduleDoctorByDate(doctorId, date);

      if (info && info.errCode == 0) {
        this.setState({
          allAvailableTime: info.data ? info.data : [],
        });
      }
    }
  };

  handleClickScheduleTime = (time) => {
    this.setState({
      isOpenModalBooking: true,
      dataScheduleTimeModal: time,
    });
  };

  closeBookingClose = () => {
    this.setState({
      isOpenModalBooking: false,
    });
  };

  render() {
    const {
      allDays,
      allAvailableTime,
      isOpenModalBooking,
      dataScheduleTimeModal,
    } = this.state;
    return (
      <>
        <div className="doctor-schedule-container">
          <div className="all-schedule">
            <select onChange={(event) => this.handleOnChangeSelect(event)}>
              {allDays &&
                allDays.length > 0 &&
                allDays.map((item, index) => {
                  return (
                    <option value={item.value} key={index}>
                      {item.label}
                    </option>
                  );
                })}
            </select>
          </div>
          <div className="all-available-time">
            <div className="text-calendar">
              <i className="fas fa-calendar-alt">
                <span>Lịch Khám</span>
              </i>
            </div>

            <div className="time-content">
              {allAvailableTime && allAvailableTime.length > 0 ? (
                <>
                  <div className="time-content-btns">
                    {allAvailableTime.map((item, index) => {
                      let timeDisplay = item.timeTypeData.valueVi;
                      return (
                        <button
                          key={index}
                          className="btn-vie"
                          onClick={() => this.handleClickScheduleTime(item)}
                        >
                          {timeDisplay}{" "}
                        </button>
                      );
                    })}
                  </div>

                  <div className="book-free">
                    <span>
                      <i className="far fa-hand-point-up"></i>
                    </span>
                  </div>
                </>
              ) : (
                <div>
                  Không có lịch hẹn trong lúc này, vui lòng chọn thời điểm khác
                </div>
              )}
            </div>
          </div>
        </div>
        <BookingModal
          isOpenModal={isOpenModalBooking}
          closeBookingClose={this.closeBookingClose}
          dataTime={dataScheduleTimeModal}
        />
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorSchedule);
