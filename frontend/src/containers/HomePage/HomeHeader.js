import React, { Component } from "react";
import { connect } from "react-redux";
import "./HomeHeader.scss";
import { FormattedMessage } from "react-intl";
import { changeLanguageApp } from "../../store/actions/appActions";
import { LANGUAGES } from "../../utils/index";
import { withRouter } from "react-router";

class HomeHeader extends Component {
  changeLanguage(language) {
    this.props.changeLanguageApp(language);
  }

  redirectToHome = () => {
    this.props.history.push("/home");
  };

  render() {
    return (
      <React.Fragment>
        <div className="home-header-container">
          <div className="home-header-content">
            <div className="left-content">
              <i class="fas fa-bars"></i>
              <div
                className="header-logo"
                onClick={() => this.redirectToHome()}
              ></div>
            </div>
            <div className="center-content">
              <div className="child-content">
                <div>
                  <b>
                    {" "}
                    <FormattedMessage id="homeheader.specialty" />
                  </b>
                </div>

                <div className="sub-titles">
                  <FormattedMessage id="homeheader.find-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.health-facilities" />
                  </b>
                </div>
                <div className="sub-titles">
                  <FormattedMessage id="homeheader.pick-clinic" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    {" "}
                    <FormattedMessage id="homeheader.doctor" />
                  </b>
                </div>
                <div className="sub-titles">
                  {" "}
                  <FormattedMessage id="homeheader.pick-doctor" />
                </div>
              </div>
              <div className="child-content">
                <div>
                  <b>
                    <FormattedMessage id="homeheader.checkup-package" />
                  </b>
                </div>
                <div className="sub-titles">
                  <FormattedMessage id="homeheader.general-health-check" />
                </div>
              </div>
            </div>
            <div className="right-content">
              <div className="support">
                <i class="far fa-question-circle"></i>
                <FormattedMessage id="homeheader.support" />
              </div>

              <div
                className={
                  this.props.language === LANGUAGES.VI
                    ? "language-vn active"
                    : "language-vn"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.VI)}>
                  VN
                </span>
              </div>
              <div
                className={
                  this.props.language === LANGUAGES.EN
                    ? "language-en active"
                    : "language-en"
                }
              >
                <span onClick={() => this.changeLanguage(LANGUAGES.EN)}>
                  EN
                </span>
              </div>
            </div>
          </div>
        </div>

        {this.props.isShowBanner && (
          <div className="home-header-banner">
            <div className="content-up">
              <div className="title-1">
                {" "}
                <FormattedMessage id="homeheader.medical-background" />
              </div>
              <div className="title-2">
                {" "}
                <FormattedMessage id="homeheader.comprehensive-health-care" />
              </div>
              <div className="search">
                <i class="fas fa-search"></i>
                <input type="text" placeholder="Tìm kiếm phòng khám" />
              </div>
            </div>

            <div className="content-down">
              <div className="options">
                <div className="option-child">
                  <div className="option-icon">
                    <i class="fas fa-hospital"></i>
                  </div>
                  <div className="option-text">
                    <FormattedMessage id="homeheader.specialist-examination" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="option-icon">
                    <i class="fas fa-hospital"></i>
                  </div>
                  <div className="option-text">
                    {" "}
                    <FormattedMessage id="homeheader.remote-examination" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="option-icon">
                    <i class="fas fa-hospital"></i>
                  </div>
                  <div className="option-text">
                    <FormattedMessage id="homeheader.general-examination" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="option-icon">
                    <i class="fas fa-hospital"></i>
                  </div>
                  <div className="option-text">
                    <FormattedMessage id="homeheader.dental-examination" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="option-icon">
                    <i class="fas fa-hospital"></i>
                  </div>
                  <div className="option-text">
                    <FormattedMessage id="homeheader.surgery-package" />
                  </div>
                </div>
                <div className="option-child">
                  <div className="option-icon">
                    <i class="fas fa-hospital"></i>
                  </div>
                  <div className="option-text">
                    {" "}
                    <FormattedMessage id="homeheader.medical-products" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    changeLanguageApp: (language) => dispatch(changeLanguageApp(language)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(HomeHeader)
);
