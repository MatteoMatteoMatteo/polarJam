import React, { Fragment } from "react";
import Backdrop from "./../Backdrop/Backdrop";
import "./Modal.css";

const Modal = ({ children, show, closeModel, clickable }) => {
  return (
    <Fragment>
      <Backdrop clickable={clickable} closeModel={closeModel} show={show} />
      <div
        className={"modalHolder"}
        style={{
          transform: show ? "translateY(0)" : "translateY(-100vh)",
          opacity: show ? "1" : "0",
        }}
      >
        {children}
      </div>
    </Fragment>
  );
};

Modal.propTypes = {};

export default Modal;
