import React, { Fragment } from "react";
import LoadingSpinner from "./../UseComponents/LoadingSpinner/LoadingSpinner";

const Browse = () => {
  return (
    <Fragment>
      <LoadingSpinner
        text={"Sometimes you need some loading.."}
        spinnerVariation={3}
        marginTop={"100px"}
      />
    </Fragment>
  );
};

export default Browse;
