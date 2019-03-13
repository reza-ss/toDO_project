import React from "react";
import cancel from "../cancel.png";
import classNames from "classnames";
import posed, { PoseGroup } from "react-pose";

class ListItem extends React.Component {
  state = {
    editing: false,
    inputval: this.props.text
  };
  handlePressEdit = () => {
    this.setState(prevstate => {
      return {
        editing: !prevstate.editing
      };
    });
  };
  handleInput = e => {
    this.setState({
      inputval: e.target.value
    });
  };
  setedit = () => {
    this.props.edit(this.state.inputval);
    this.setState({
      editing: false
    });
  };
  render() {
    return (
      <>
        {this.state.editing ? (
          <>
            <input
              type="text"
              onChange={this.handleInput}
              value={this.state.inputval}
            />
            <button className="edit_btn" onClick={this.setedit}>
              ثبت تغییر
            </button>
            <button
              className="edit_btn"
              style={{ left: "15px" }}
              onClick={this.handlePressEdit}
            >
              کنسل کردن
            </button>
          </>
        ) : (
          <>
            <input
              className="checkbox"
              type="checkbox"
              checked={this.props.done}
              onChange={this.props.toggle}
            />
            <p>{this.props.text}</p>
            <img src={cancel} alt="" onClick={this.props.delete} />
            <button className="edit-btn" onClick={this.handlePressEdit}>
              ویرایش
            </button>
            {this.props.children ? this.props.children : null}
          </>
        )}
      </>
    );
  }
}
export default ListItem;
