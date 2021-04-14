import React, { useEffect, Fragment, useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentProfile, deleteAccount } from "../Redux/Actions/profile";
import LoadingScreen from "../UseComponents/LoadingScreen/LoadingScreen";
import Modal from "./../UseComponents/Modal/Modal";
import UpdateProfileForm from "./SavedProfile/UpdateProfileForm/UpdateProfileForm";
import Alert from "./../UseComponents/Alert/Alert";
import "./UserProfile.css";
import * as cn from "classnames";
import SavedSongs from "./SavedSongs/SavedSongs";
import SavedProfile from "./SavedProfile/SavedProfile";
import SavedAccount from "./SavedAccount/SavedAccount";

const UserProfile = ({
  deleteAccount,
  getCurrentProfile,
  auth: { user },
  profile: { profile },
}) => {
  useEffect(() => {
    getCurrentProfile();
  }, [getCurrentProfile]);

  let [modalOpened, toggleModal] = useState(false);
  let [backdropClickable, setBackdropClickable] = useState(true);

  const callback = (data) => {
    if (!data) {
      setBackdropClickable((backdropClickable = data));
    }
    if (data) {
      toggleModal((modalOpened = false));
      setBackdropClickable((backdropClickable = true));
    }
  };

  return profile === null ? (
    <LoadingScreen loadingText={"Profile data is loading"} />
  ) : (
    <Fragment>
      <div className={"profileHolder"}>
        <div className={"headline"}>
          <h1>Home</h1>
          <Alert />
        </div>
        <div className={"content"}>
          <div className={"userSongs"}>
            {profile !== null ? (
              <Fragment>
                <SavedSongs song={profile.songs ? profile.songs : []} />
              </Fragment>
            ) : (
              <h2>Songs</h2>
            )}
          </div>
          <div className={"userProfile"}>
            {profile !== null ? (
              <SavedProfile bio={profile.bio ? profile.bio : ""} />
            ) : (
              <h2>Profile</h2>
            )}
          </div>

          <div className="userAccount">
            {profile !== null ? (
              <SavedAccount user={user ? user : ""} />
            ) : (
              <h2>Profile</h2>
            )}
          </div>
        </div>
        <div className={"content"}>
          <div className={cn("updateLayout", "update1")}>
            <Link to="/">
              <button className={cn("buttonLayout")}>Find Songs</button>
            </Link>
          </div>
          <div className={cn("updateLayout", "update2")}>
            <button
              className={cn("buttonLayout")}
              onClick={() => toggleModal((modalOpened = true))}
            >
              Update Profile
            </button>
          </div>
          <div className={cn("updateLayout", "update3")}>
            <button className={cn("deleteAccount")} onClick={deleteAccount}>
              Delete Account
            </button>
          </div>
        </div>
      </div>
      <Modal
        closeModel={() => {
          toggleModal((modalOpened = false));
        }}
        show={modalOpened}
        clickable={backdropClickable ? true : false}
      >
        <UpdateProfileForm
          parentCallback={(data) => {
            callback(data);
          }}
          profile={profile}
          bio={profile.bio ? profile.bio : null}
        />
      </Modal>
    </Fragment>
  );
};

UserProfile.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile, deleteAccount })(
  UserProfile
);
