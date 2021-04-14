import React, { Fragment } from "react";
import "./LoadingScreen.css";

const LoadingScreen = (props) => {
  return (
    <Fragment>
      <div className="lds-facebook">
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="loadingText">{props.loadingText}</div>
    </Fragment>
  );
};

export default LoadingScreen;
