import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSchedule.scss";
import * as actions from "../../../store/actions";
import { CRUDActions, LANGUAGES, dateFormat } from "../../../utils";
import { saveBulkScheduleDoctor } from "../../../services/userService";

import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import { toast } from "react-toastify";
import _ from "lodash";

class ManageSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      listDoctor: [],
      selectedDoctor: {},
      currentDate: "",
      rangeTime: [],
    };
  }

  componentDidMount() {
    this.props.getAllDoctorStart();
    this.props.fetchAllScheduleTimeStart();
  }
  buildInputData = (inputData) => {
    let options = [];
    if (inputData && inputData.length > 0) {
      inputData.map((input) => {
        let object = {};
        let doctorName = `${input.firstName} ${input.lastName}`;
        object.value = input.id;
        object.label = doctorName;
        options.push(object);
      });
    }
    return options;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let dataSelect = this.buildInputData(this.props.allDoctors);

      this.setState({
        listDoctor: dataSelect,
      });
    }

    if (prevProps.allScheduleTime !== this.props.allScheduleTime) {
      let data = this.props.allScheduleTime;
      if (data && data.length > 0) {
        data = data.map((item) => ({ ...item, isSelected: false }));
      }

      this.setState({
        rangeTime: data,
      });
    }
  }

  handleClickBtnTime = (time) => {
    let { rangeTime } = this.state;
    if (rangeTime && rangeTime.length > 0) {
      rangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });

      this.setState({
        rangeTime: rangeTime,
      });
    }
  };

  hanldeSaveSchedule = async () => {
    let { rangeTime, selectedDoctor, currentDate } = this.state;
    let result = [];

    if (!currentDate) {
      toast.error("Invalid date!!");
      return;
    }

    if (selectedDoctor && _.isEmpty(selectedDoctor)) {
      toast.error("Invalid selected doctor!");
      return;
    }

    let formatedDate = new Date(currentDate).getTime();

    if (rangeTime && rangeTime.length > 0) {
      let selectedTime = rangeTime.filter((item) => item.isSelected === true);

      if (selectedTime && selectedTime.length > 0) {
        selectedTime.map((schedule) => {
          let object = {};
          object.doctorId = selectedDoctor.value;
          object.date = formatedDate;
          object.timeType = schedule.keyMap;
          result.push(object);
        });
      } else {
        toast.error("Invalid selected time!");
        return;
      }
    }

    let res = await saveBulkScheduleDoctor({
      arrSchedule: result,
      doctorId: selectedDoctor.value,
      formatedDate: formatedDate,
    });

    if (res && res.errCode === 0) {
      toast.success("Lưu thông tin thành công");
    } else {
      toast.error("Lưu thông tin thất bại");
      console.log("error from bulk schedule", res.errMessage);
    }
  };

  handleChangeSelect = async (selectedOptions) => {
    this.setState({ selectedDoctor: selectedOptions });
  };

  handleOnChangeDatePicker = (date) => {
    this.setState({
      currentDate: date,
    });
  };

  render() {
    let { rangeTime, selectedDoctor, listDoctor, currentDate } = this.state;
    let yesterday = new Date(new Date().setDate(new Date().getDate() - 1));

    return (
      <div className="manage-schedule-container">
        <div className="m-s-title">Quản lý kế hoạch khám bệnh</div>
        <div className="container">
          <div className="row">
            <div className="col-6 form-group">
              <label>Chọn bác sĩ</label>
              <Select
                value={selectedDoctor}
                onChange={this.handleChangeSelect}
                options={listDoctor}
              />
            </div>

            <div className="col-6 form-group date-picker">
              <label>Chọn ngày</label>
              <DatePicker
                className="form-control"
                onChange={this.handleOnChangeDatePicker}
                minDate={yesterday}
                value={currentDate}
              />
            </div>

            <div className="col-12 pick-hour-container">
              {rangeTime &&
                rangeTime.length > 0 &&
                rangeTime.map((item, index) => {
                  return (
                    <button
                      className={
                        item.isSelected === true
                          ? "btn btn-schedule active"
                          : "btn btn-schedule"
                      }
                      key={index}
                      onClick={() => this.handleClickBtnTime(item)}
                    >
                      {item.valueVi}
                    </button>
                  );
                })}
            </div>

            <div className="col-12">
              <button
                className="btn btn-primary btn-save-schedule"
                onClick={() => this.hanldeSaveSchedule()}
              >
                Lưu thông tin
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    allDoctors: state.admin.allDoctors,
    allScheduleTime: state.admin.allScheduleTime,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctorStart: () => dispatch(actions.getAllDoctorStart()),
    fetchAllScheduleTimeStart: () =>
      dispatch(actions.fetchAllScheduleTimeStart()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageSchedule);
