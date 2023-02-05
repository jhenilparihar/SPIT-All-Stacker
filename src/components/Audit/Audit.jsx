
import React, { Component } from "react";
import { BrowserRouter, Outlet, Route, Routes } from "react-router-dom";
import "./audit.css";


class Audit extends Component {
  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  

  render() {
    return (
      <>
      <div class="audit-main">
        <div className="sub-main">
            <div className="chart1"></div>
            <div className="chart2"></div>
        </div>
      </div>
      </>
    );
  }
}

export default Audit;
