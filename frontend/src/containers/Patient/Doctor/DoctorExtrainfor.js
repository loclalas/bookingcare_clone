import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtrainfor.scss";
import { getExtraInforDoctorById } from "../../../services/userService";
// import { NumericFormat } from "react-number-format";

class DoctorExtrainfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
      extraInfor: {},
    };
  }

  async componentDidMount() {
    if (this.props.doctorIdFromParent) {
      let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfo: res.data,
        });
      }
    }
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.doctorIdFromParent !== prevProps.doctorIdFromParent) {
      let res = await getExtraInforDoctorById(this.props.doctorIdFromParent);
      if (res && res.errCode === 0) {
        this.setState({
          extraInfor: res.data,
        });
      }
    }
  }

  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };

  render() {
    const { isShowDetailInfor, extraInfor } = this.state;
    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="text-address">ĐỊA CHỈ KHÁM</div>
          <div className="name-clinic">
            {extraInfor && extraInfor.nameClinic ? extraInfor.nameClinic : ""}
          </div>
          <div className="detail-address">
            {extraInfor && extraInfor.addressClinic
              ? extraInfor.addressClinic
              : ""}
          </div>
        </div>
        <div className="content-down">
          {isShowDetailInfor === false && (
            <div className="short-infor">
              {extraInfor.priceTypeData &&
                // <NumericFormat
                //   className="currency"
                //   value={extraInfor.priceTypeData.valueVi}
                //   displayType={"text"}
                //   thousandSeparator={true}
                //   thousandsGroupStyle="VND"
                //   suffix={"VND"}
                // />
                extraInfor.priceTypeData.valueVi}
              <span onClick={() => this.showHideDetailInfor(true)}>
                Xem chi tiết
              </span>
            </div>
          )}

          {isShowDetailInfor === true && (
            <>
              <div className="title-price">Giá Khám: .</div>
              <div className="detail-infor">
                <div className="price">
                  <div className="left">Giá khám</div>
                  <div className="right">
                    {extraInfor.priceTypeData &&
                      extraInfor.priceTypeData.valueVi}
                  </div>
                </div>
                <div className="note">
                  {extraInfor && extraInfor.note ? extraInfor.note : ""}
                </div>
              </div>
              <div className="payment">
                {extraInfor && extraInfor.paymentTypeData
                  ? extraInfor.paymentTypeData.valueVi
                  : ""}
              </div>
              <div className="hide-price">
                <span onClick={() => this.showHideDetailInfor(false)}>
                  Ẩn bảng giá
                </span>
              </div>
            </>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtrainfor);
