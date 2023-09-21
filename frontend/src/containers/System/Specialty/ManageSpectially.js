import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageSpectially.scss";
import MarkdownIt from "markdown-it";
import MdEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import { createNewSpecialty } from "../../../services/userService";
import { toast } from "react-toastify";

const mdParser = new MarkdownIt();

class ManageSpectially extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
    };
  }

  componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let url = URL.createObjectURL(file);
      this.setState({
        imageBase64: url,
        avatar: base64,
      });
    }
  };

  handleSaveNewSpecialty = async () => {
    let res = await createNewSpecialty(this.state);
    if (res && res.errCode === 0) {
      toast.success("Thêm chuyên khoa thành công");
      this.setState({
        name: "",
        imageBase64: "",
        descriptionHTML: "",
        descriptionMarkdown: "",
      });
    } else {
      toast.error("Thêm chuyên khoa thất bại");
      console.log("Check res:   ", res);
    }
  };

  render() {
    const { name, imageBase64, descriptionHTML, descriptionMarkdown } =
      this.state;
    return (
      <>
        <div className="manage-specialty-container">
          <div className="ms-title">Quản lý chuyên khoa</div>

          <div className="add-new-specialty row">
            <div className="col-6 form-group">
              <label>Tên chuyên khoa</label>
              <input
                className="form-control"
                value={name}
                onChange={(event) => this.handleOnChangeInput(event, "name")}
              ></input>
            </div>
            <div className="col-6 form-group">
              <label>Ảnh chuyên khoa</label>
              <input
                onChange={(event) => this.handleChangeImage(event)}
                type="file"
                className="form-control-file"
              ></input>
            </div>
            <div className="col-12">
              <MdEditor
                value={descriptionMarkdown}
                style={{ height: "500px" }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={this.handleEditorChange}
              />
            </div>
            <div className="col-12">
              <button
                onClick={() => this.handleSaveNewSpecialty()}
                className="btn-save-specialty"
              >
                Save
              </button>
            </div>
          </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(ManageSpectially);
