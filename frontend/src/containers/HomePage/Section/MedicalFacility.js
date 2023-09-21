import React, { Component } from "react";
import { connect } from "react-redux";
import "./MedicalFacility.scss";
import Slider from "react-slick";

class MedicalFacility extends Component {
  render() {
    return (
      <div className="section-share section-medical-facility">
        <div className="section-content">
          <div className="section-header">
            <span className="title-section">Cơ sở y tế</span>
            <button className="btn-section">Xem thêm</button>
          </div>
          <div className="section-body">
            <Slider {...this.props.settings}>
              <div className="section-customize">
                <div className="bg-img section-medical-facility"></div>
                <div>Cơ cương khớp</div>
              </div>
              <div className="section-customize">
                <div className="bg-img section-medical-facility"></div>
                <div>Cơ cương khớp</div>{" "}
              </div>
              <div className="section-customize">
                <div className="bg-img section-medical-facility"></div>
                <div>Cơ cương khớp</div>{" "}
              </div>
              <div className="section-customize">
                <div className="bg-img section-medical-facility"></div>
                <div>Cơ cương khớp</div>{" "}
              </div>
              <div className="section-customize">
                <div className="bg-img section-medical-facility"></div>
                <div>Cơ cương khớp</div>{" "}
              </div>
              <div className="section-customize">
                <div className="bg-img section-medical-facility"></div>
                <div>Cơ cương khớp</div>{" "}
              </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MedicalFacility);
