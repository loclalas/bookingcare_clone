import React, { Component } from "react";
import { connect } from "react-redux";
import "./Specialty.scss";
import { getAllSpecialtyService } from "../../../services/userService";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import { withRouter } from "react-router";

class Specialty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSpecialty: [],
    };
  }
  async componentDidMount() {
    let res = await getAllSpecialtyService();
    console.log("res--------------------", res);
    if (res && res.errCode === 0) {
      this.setState({
        dataSpecialty: res.data,
      });
    }
  }

  handleViewDetailSpecialty = (item) => {
    this.props.history.push(`/detail-specialty/${item.id}`);
  };
  render() {
    let { dataSpecialty } = this.state;
    console.log("dataSpecialty", dataSpecialty);
    return (
      <div className="section-share section-specialty">
        <div className="section-content">
          <div className="section-header">
            <span className="title-section">Chuyên khoa phổ biến</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              {dataSpecialty &&
                dataSpecialty.length > 0 &&
                dataSpecialty.map((item, index) => {
                  return (
                    <div
                      className="wrap-pictures-vs-text margin-image-1"
                      key={index}
                      onClick={() => this.handleViewDetailSpecialty(item)}
                    >
                      <div
                        style={{
                          backgroundImage: `url(${item.image})`,
                        }}
                        className="img-customize-1"
                        onClick={() => this.handleViewDetailSpecialty(item)}
                      ></div>
                      <span
                        onClick={() => this.handleViewDetailSpecialty(item)}
                        className="text-image"
                      >
                        {item.name}
                      </span>
                      <br />
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
  return;
};

const mapDispatchToProps = (dispatch) => {
  return;
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Specialty)
);
