import React from "react";
import {connect} from "react-redux";

const HelloComponent = ({message}) =>
  <div>
    <h1>{message}</h1>
  </div>

export default HelloComponent