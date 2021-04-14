import React, { Fragment } from "react";
import "./LoadingSpinner.css";
import PropTypes from "prop-types";

const LoadingSpinner = ({ text, spinnerVariation, marginTop }) => {
  const spinnerVariation1 = (
    <div className="sk-fading-circle" style={{ maringTop: marginTop }}>
      <div className="sk-circle1 sk-circle"></div>
      <div className="sk-circle2 sk-circle"></div>
      <div className="sk-circle3 sk-circle"></div>
      <div className="sk-circle4 sk-circle"></div>
      <div className="sk-circle5 sk-circle"></div>
      <div className="sk-circle6 sk-circle"></div>
      <div className="sk-circle7 sk-circle"></div>
      <div className="sk-circle8 sk-circle"></div>
      <div className="sk-circle9 sk-circle"></div>
      <div className="sk-circle10 sk-circle"></div>
      <div className="sk-circle11 sk-circle"></div>
      <div className="sk-circle12 sk-circle"></div>
    </div>
  );
  const spinnerVariation1NextTo = (
    <div className="sk-fading-circle" style={{ margin: "0px" }}>
      <div className="sk-circle1 sk-circle"></div>
      <div className="sk-circle2 sk-circle"></div>
      <div className="sk-circle3 sk-circle"></div>
      <div className="sk-circle4 sk-circle"></div>
      <div className="sk-circle5 sk-circle"></div>
      <div className="sk-circle6 sk-circle"></div>
      <div className="sk-circle7 sk-circle"></div>
      <div className="sk-circle8 sk-circle"></div>
      <div className="sk-circle9 sk-circle"></div>
      <div className="sk-circle10 sk-circle"></div>
      <div className="sk-circle11 sk-circle"></div>
      <div className="sk-circle12 sk-circle"></div>
    </div>
  );
  const spinnerVariation2 = (
    <div className="spinner" style={{ marginTop: marginTop }}>
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="rect3"></div>
      <div className="rect4"></div>
    </div>
  );

  if (spinnerVariation === 1) {
    return (
      <Fragment>
        {spinnerVariation1}
        <div className={"loadingText"}>{text}</div>
      </Fragment>
    );
  } else if (spinnerVariation === 2) {
    return (
      <Fragment>
        <div style={{ display: "flex", alignItems: "center" }}>
          <div style={{ marginRight: "20px" }}>{text}</div>
          {spinnerVariation1NextTo}
        </div>
      </Fragment>
    );
  } else {
    return (
      <Fragment>
        {spinnerVariation2}
        <div text={text} className={"loadingText"}>
          {text}
        </div>
      </Fragment>
    );
  }
};

LoadingSpinner.propTypes = {
  spinnerVariation: PropTypes.number.isRequired,
};

export default LoadingSpinner;
