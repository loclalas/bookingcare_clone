import React, { Component } from "react";
import { connect } from "react-redux";

class About extends Component {
  render() {
    return (
      <div
        className="about"
        style={{ height: "300px", border: "1px red solid" }}
      ></div>
    );
  }
}

const mapStateToProps = (state) => {
  return;
};

const mapDispatchToProps = (dispatch) => {
  return;
};

export default connect(mapStateToProps, mapDispatchToProps)(About);
