import React from "react";
import "./Backdrop.css";

const backdrop = ({ show, clickable, closeModel }) =>
  show ? (
    <div className={"backdrop"} onClick={clickable ? closeModel : null}></div>
  ) : null;

export default backdrop;
