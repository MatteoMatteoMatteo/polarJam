import React, { Fragment } from "react";
import PropTypes from "prop-types";

const SavedProfile = ({ bio }) => {
  const receivedBio = <div style={{ padding: "10px 0px" }}>{bio}</div>;

  const empty = (
    <Fragment>
      <p>Not much going on here either...</p>
      <p>Start adding infos!</p>
    </Fragment>
  );
  return (
    <Fragment>
      <h2>Profile</h2>
      {bio === "" ? empty : receivedBio}
    </Fragment>
  );
};

SavedProfile.propTypes = {
  bio: PropTypes.string.isRequired,
};

export default SavedProfile;
