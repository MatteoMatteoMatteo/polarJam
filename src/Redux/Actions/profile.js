import axios from "axios";
import { setAlert } from "./alert";

import {
  GET_PROFILE,
  PROFILE_ERROR,
  CLEAR_PROFILE,
  ACCOUNT_DELETED,
  UPDATE_PROFILE,
} from "./types";

//Get current user profile
export const getCurrentProfile = () => async (dispatch) => {
  try {
    const res = await axios.get("/api/profile/me");
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Create profile
export const createProfile = (formData, history) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Conent-Type": "application/json",
      },
    };
    await axios.post("/api/users", formData, config);
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg)));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Update profile
export const updateProfile = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Conent-Type": "application/json",
      },
    };
    await timeout(3000);
    const res = await axios.post("/api/profile", formData, config);
    dispatch({
      type: GET_PROFILE,
      payload: res.data,
    });
    // dispatch(setAlert("Profile successfully updated", "greenAlert", 2000));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg)));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete account & profile
export const deleteAccount = () => async (dispatch) => {
  if (
    window.confirm(
      "Are you sure to delete your account? This can NOT be undone!"
    )
  ) {
    try {
      await axios.delete(`/api/profile`);
      dispatch({ type: CLEAR_PROFILE });
      dispatch({ type: ACCOUNT_DELETED });
      // dispatch(setAlert("Account deleted"));
    } catch (err) {
      dispatch({
        type: PROFILE_ERROR,
        payload: { msg: err.response.statusText, status: err.response.status },
      });
    }
  }
};

//Add Songs
export const addSongs = (formData) => async (dispatch) => {
  try {
    const config = {
      headers: {
        "Conent-Type": "application/json",
      },
    };
    await timeout(3000);
    const res = await axios.put("/api/profile/songs", formData, config);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
    // dispatch(setAlert("Song Added", "greenAlert", 2000));
  } catch (err) {
    const errors = err.response.data.errors;
    if (errors) {
      errors.forEach((error) => dispatch(setAlert(error.msg)));
    }
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

//Delete Song
export const deleteSong = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/api/profile/songs/${id}`);
    dispatch({
      type: UPDATE_PROFILE,
      payload: res.data,
    });
  } catch (err) {
    dispatch({
      type: PROFILE_ERROR,
      payload: { msg: err.response.statusText, status: err.response.status },
    });
  }
};

function timeout(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
