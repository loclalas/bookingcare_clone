import React, { Component } from "react";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";
import "./ManageDoctor.scss";
import { getDetailDoctor } from "../../../services/userService";
import { CRUDActions } from "./../../../utils/constant";

import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import "react-markdown-editor-lite/lib/index.css";
import Select from "react-select";

const mdParser = new MarkdownIt();

class ManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedOption: "",
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      doctorId: "",
      hasOldData: false,
      action: "",
      listDoctors: [],

      listPrice: [],
      listPayment: [],
      listProvince: [],
      listClinic: [],
      listSpecialty: [],
      selectedPrice: "",
      selectedPayment: "",
      selectedProvince: "",
      selectedClinic: "",
      selectedSpecialty: "",
      nameClinic: "",
      addressClinic: "",
      note: "",
    };
  }
  componentDidMount() {
    this.props.getAllDoctorStart();
    this.props.getAllRequiredDoctorInfo();
  }

  buildInputData = (inputData, type) => {
    let options = [];
    if (inputData && inputData.length > 0) {
      if (type === "USERS") {
        console.log("inputdata: ", inputData);
        inputData.map((input) => {
          let object = {};
          let doctorName = `${input.firstName} ${input.lastName}`;
          object.value = input.id;
          object.label = doctorName;
          options.push(object);
        });
      }
      if (type === "PRICE") {
        inputData.map((input) => {
          let object = {};
          let price = `${input.valueVi}`;
          object.value = input.keyMap;
          object.label = price;
          options.push(object);
        });
      }
      if (type === "PAYMENT" || type === "PROVINCE") {
        inputData.map((input) => {
          let object = {};
          object.value = input.keyMap;
          object.label = `${input.valueVi}`;
          options.push(object);
        });
      }

      if (type === "SPECIALTY") {
        inputData.map((input) => {
          let object = {};
          object.value = input.id;
          object.label = input.name;
          options.push(object);
        });
      }
      if (type === "CLINIC") {
        inputData.map((input) => {
          let object = {};
          object.value = input.id;
          object.label = input.name;
          options.push(object);
        });
      }
    }
    return options;
  };

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.allDoctors !== this.props.allDoctors) {
      let options = this.buildInputData(this.props.allDoctors, "USERS");
      this.setState({ listDoctors: options });
    }

    if (prevProps.allRequiredDoctorInfo !== this.props.allRequiredDoctorInfo) {
      let { resPayment, resPrice, resProvince, resSpecialty, resClinic } =
        this.props.allRequiredDoctorInfo;

      let dataSelectPrice = this.buildInputData(resPrice, "PRICE");
      let dataSelectPayment = this.buildInputData(resPayment, "PAYMENT");
      let dataSelectProvince = this.buildInputData(resProvince, "PROVINCE");
      let dataSelectSpecialty = this.buildInputData(resSpecialty, "SPECIALTY");
      let dataSelectClinic = this.buildInputData(resClinic, "CLINIC");

      this.setState({
        listPrice: dataSelectPrice,
        listPayment: dataSelectPayment,
        listProvince: dataSelectProvince,
        listSpecialty: dataSelectSpecialty,
        listClinic: dataSelectClinic,
      });
    }
  }

  handleEditorChange = ({ html, text }) => {
    this.setState({
      contentHTML: html,
      contentMarkdown: text,
    });
  };

  handleSelectChange = async (selectedOption) => {
    this.setState({ selectedOption });
    let { listPrice, listPayment, listProvince, listSpecialty, listClinic } =
      this.state;
    let res = await getDetailDoctor(selectedOption.value);
    if (res && res.errCode === 0 && res.data && res.data.Markdown) {
      let markdown = res.data.Markdown;
      let addressClinic,
        nameClinic,
        note,
        priceId,
        paymentId,
        provinceId,
        selectedPrice,
        selectedPayment,
        selectedProvince,
        specialtyId,
        clinicId,
        selectedSpecialty,
        selectedClinic = "";

      if (res.data.Doctor_Info) {
        addressClinic = res.data.Doctor_Info.addressClinic;
        nameClinic = res.data.Doctor_Info.nameClinic;
        note = res.data.Doctor_Info.note;
        priceId = res.data.Doctor_Info.priceId;
        paymentId = res.data.Doctor_Info.paymentId;
        provinceId = res.data.Doctor_Info.provinceId;
        specialtyId = res.data.Doctor_Info.specialtyId;
        clinicId = res.data.Doctor_Info.clinicId;

        selectedPrice = listPrice.find((item) => {
          return item && item.value === priceId;
        });
        selectedPayment = listPayment.find((item) => {
          return item && item.value === paymentId;
        });
        selectedProvince = listProvince.find((item) => {
          return item && item.value === provinceId;
        });
        selectedSpecialty = listSpecialty.find((item) => {
          return item && item.value === specialtyId;
        });
        selectedClinic = listClinic.find((item) => {
          return item && item.value === clinicId;
        });
        // paymentId = res.data.Doctor_Info.addressClinic
        // addressClinic = res.data.Doctor_Info.addressClinic
        this.setState({
          contentMarkdown: markdown.contentMarkdown,
          contentHTML: markdown.contentHTML,
          description: markdown.description,
          hasOldData: true,
          addressClinic: addressClinic,
          nameClinic: nameClinic,
          note: note,
          selectedPrice: selectedPrice,
          selectedPayment: selectedPayment,
          selectedProvince: selectedProvince,
          selectedSpecialty: selectedSpecialty,
          selectedClinic: selectedClinic,
        });
      } else {
        this.setState({
          contentMarkdown: markdown.contentMarkdown,
          contentHTML: markdown.contentHTML,
          description: markdown.description,
          hasOldData: true,
          addressClinic: "",
          nameClinic: "",
          note: "",
          selectedPrice: "",
          selectedPayment: "",
          selectedProvince: "",
          selectedSpecialty: "",
          selectedClinic: "",
        });
      }
    } else {
      this.setState({
        contentMarkdown: "",
        contentHTML: "",
        description: "",
        hasOldData: false,
        addressClinic: "",
        nameClinic: "",
        note: "",
        selectedPrice: "",
        selectedPayment: "",
        selectedProvince: "",
        selectedClinic: "",
      });
    }
  };

  handleOnChangeDesc = (event) => {
    this.setState({
      description: event.target.value,
    });
  };

  handleSubmitInfo = () => {
    console.log(this.state);
    this.props.createInfoDoctorStart({
      contentHTML: this.state.contentHTML,
      contentMarkdown: this.state.contentMarkdown,
      description: this.state.description,
      doctorId: this.state.selectedOption.value,
      action: this.state.action,
      selectedPrice: this.state.selectedPrice.value,
      selectedPayment: this.state.selectedPayment.value,
      selectedProvince: this.state.selectedProvince.value,
      addressClinic: this.state.addressClinic,
      nameClinic: this.state.nameClinic,
      note: this.state.note,
      clinicId:
        this.state.selectedClinic && this.state.selectedClinic.value
          ? this.state.selectedClinic.value
          : "",
      specialtyId: this.state.selectedSpecialty.value,
    });
    this.setState({
      selectedOption: "",
      contentMarkdown: "",
      contentHTML: "",
      description: "",
      doctorId: "",
    });
  };

  handleChangeSelectDoctorInfor = async (selectedOption, name) => {
    let stateName = name.name;
    let stateCopy = { ...this.state };
    stateCopy[stateName] = selectedOption;
    this.setState({
      ...stateCopy,
    });
  };

  handleOnChangeText = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  render() {
    const {
      selectedOption,
      hasOldData,
      listDoctors,
      listPayment,
      description,
      listPrice,
      listProvince,
      selectedPrice,
      selectedPayment,
      selectedProvince,
      nameClinic,
      addressClinic,
      note,
    } = this.state;
    console.log(description);

    return (
      <div className="manage-doctor-container">
        <div className="manage-doctor-title">Tạo thông tin bác sĩ</div>

        <div className="more-info">
          <div className="content-left form-group">
            <label>Chọn bác sĩ</label>
            <Select
              value={selectedOption}
              onChange={this.handleSelectChange}
              options={listDoctors}
              placeholder={"Chọn bác sĩ"}
            />
          </div>

          <div className="content-right">
            <label>Thông tin giới thiệu: </label>
            <textarea
              className="form-control"
              rows="4"
              onChange={(event) =>
                this.handleOnChangeText(event, "description")
              }
              value={description}
            >
              Tao thong tin
            </textarea>
          </div>
        </div>

        <div className="more-infor-extra row">
          <div className="col-4 form-group">
            <label>Chọn giá</label>
            <Select
              value={selectedPrice}
              options={listPrice}
              placeholder={"Chọn giá"}
              name="selectedPrice"
              onChange={this.handleChangeSelectDoctorInfor}
            />
          </div>
          <div className="col-4 form-group">
            <label>Phương thức thanh toán</label>
            <Select
              value={selectedPayment}
              onChange={this.handleChangeSelectDoctorInfor}
              options={listPayment}
              name="selectedPayment"
              placeholder={"Phương thức thanh toán"}
            />
          </div>
          <div className="col-4 form-group">
            <label>Chọn tỉnh thành</label>
            <Select
              value={selectedProvince}
              onChange={this.handleChangeSelectDoctorInfor}
              options={listProvince}
              name="selectedProvince"
              placeholder={"Chọn tỉnh thành"}
            />
          </div>
          <div className="col-4 form-group">
            <label>Tên phòng khám</label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "nameClinic")}
              value={nameClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label>Địa chỉ phòng khám</label>
            <input
              className="form-control"
              onChange={(event) =>
                this.handleOnChangeText(event, "addressClinic")
              }
              value={addressClinic}
            />
          </div>
          <div className="col-4 form-group">
            <label>Note</label>
            <input
              className="form-control"
              onChange={(event) => this.handleOnChangeText(event, "note")}
              value={note}
            />
          </div>
        </div>

        <div className="manage-doctor-editor">
          <MdEditor
            style={{ height: "500px" }}
            renderHTML={(text) => mdParser.render(text)}
            onChange={this.handleEditorChange}
            value={this.state.contentMarkdown}
          />
        </div>

        <button
          className="save-doctor-content"
          onClick={() => this.handleSubmitInfo()}
        >
          {hasOldData ? (
            <div>Thay đổi thông tin</div>
          ) : (
            <div className="save-info-doctor">Lưu thông tin</div>
          )}
        </button>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    allDoctors: state.admin.allDoctors,
    allRequiredDoctorInfo: state.admin.allRequiredDoctorInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAllDoctorStart: () => dispatch(actions.getAllDoctorStart()),
    createInfoDoctorStart: (doctorInfo) =>
      dispatch(actions.createInfoDoctorStart(doctorInfo)),
    getAllRequiredDoctorInfo: () =>
      dispatch(actions.getAllRequiredDoctorInfo()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ManageDoctor);
