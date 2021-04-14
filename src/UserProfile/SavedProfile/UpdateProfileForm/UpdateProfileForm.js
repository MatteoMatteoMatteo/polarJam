import React, { useState, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { updateProfile } from "../../../Redux/Actions/profile";
import LoadingSpinner from "../../../UseComponents/LoadingSpinner/LoadingSpinner";

const UpdateProfileForm = ({ updateProfile, parentCallback, profile }) => {
  const [formData, setFormData] = useState({
    bio: "",
  });
  const { bio } = formData;

  const sendData = (data) => {
    parentCallback(data);
  };

  const onChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    profileGettingSaved((savingProfile = true));
    sendData(false);
    await updateProfile(formData);
    sendData(true);
    profileGettingSaved((savingProfile = false));
  };

  let [savingProfile, profileGettingSaved] = useState(false);
  return savingProfile ? (
    <LoadingSpinner spinnerVariation={1} text={"Profile is getting updated!"} />
  ) : (
    <Fragment>
      <form className={"formHolder"} onSubmit={(e) => onSubmit(e)}>
        <textarea
          style={{ whiteSpace: "pre-wrap" }}
          maxLength="1000"
          onChange={(e) => onChange(e)}
          value={bio}
          name="bio"
          className={"feedback-input"}
          placeholder={"Let other's know something about you"}
        ></textarea>

        <input type="submit" value="Update!" />
      </form>
    </Fragment>
  );
};

updateProfile.PropTypes = {
  updateProfile: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({ profile: state.profile });

export default connect(mapStateToProps, { updateProfile })(UpdateProfileForm);
