import React, { Component } from "react";
import "./Nav.css";

class Nav extends Component {
  render() {
    const { toggleNote, showNote } = this.props;
    return (
      <div className="nav-container">
        <div className="nav-logo">Note</div>
        <div
          className="nav-button"
          onClick={() => {
            toggleNote();
          }}
        >
          {showNote ? "Cancel" : "+ New Note"}
        </div>
      </div>
    );
  }
}

export default Nav;
