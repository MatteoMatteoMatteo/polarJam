import React, { Fragment } from "react";
import PropTypes from "prop-types";

const SavedAccount = ({ user }) => {
  return (
    <Fragment>
      <h2>Account</h2>
      <div style={{ padding: "5px 0px" }}>{user.name}</div>
      <div style={{ padding: "5px 0px" }}>{user.email}</div>
    </Fragment>
  );
};

SavedAccount.propTypes = {
  user: PropTypes.object.isRequired,
};

export default SavedAccount;
