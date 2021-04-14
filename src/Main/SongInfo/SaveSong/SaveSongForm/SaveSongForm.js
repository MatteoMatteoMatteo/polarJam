import React, { useState } from "react";
import PropTypes from "prop-types";
import LoadingSpinner from "../../../../UseComponents/LoadingSpinner/LoadingSpinner";
import { addSongs } from "../../../../Redux/Actions/profile";
import { setAlert } from "../../../../Redux/Actions/alert";
import { connect } from "react-redux";

const InputSaveSong = ({
  genre,
  addSongs,
  parentCallback,
  songNumber,
  sectionArray,
  auth: { user },
}) => {
  const [formData, setFormData] = useState({
    name: "",
  });

  let songObject = {
    data: undefined,
  };

  const { name } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const sendData = (data) => {
    parentCallback(data);
  };

  const selectedUserLoops = () => {
    let selectedLoops = [];
    let section = {};
    for (let h = 0; h < sectionArray.length; h++) {
      section = {
        drum:
          sessionStorage.getItem(
            "s" + songNumber + "section" + (h + 1) + "drumSelected"
          ) !== null ?? false,
        chord:
          sessionStorage.getItem(
            "s" + songNumber + "section" + (h + 1) + "chordSelected"
          ) !== null ?? false,
        melody:
          sessionStorage.getItem(
            "s" + songNumber + "section" + (h + 1) + "melodySelected"
          ) !== null ?? false,
        bass:
          sessionStorage.getItem(
            "s" + songNumber + "section" + (h + 1) + "bassSelected"
          ) !== null ?? false,
        vocal:
          sessionStorage.getItem(
            "s" + songNumber + "section" + (h + 1) + "vocalSelected"
          ) !== null ?? false,
        fx:
          sessionStorage.getItem(
            "s" + songNumber + "section" + (h + 1) + "fxSelected"
          ) !== null ?? false,
      };

      selectedLoops.push(section);
    }

    songObject.selectedLoops = selectedLoops;
  };

  const selectedUserLoopsNumber = () => {
    let selectedLoops = [];
    let section = {};
    for (let h = 0; h < sectionArray.length; h++) {
      section = {
        drum:
          sessionStorage.getItem(
            "s" + songNumber + "section" + (h + 1) + "drumLoop"
          ) === null
            ? 1
            : sessionStorage.getItem(
                "s" + songNumber + "section" + (h + 1) + "drumLoop"
              ),
        chord:
          sessionStorage.getItem(
            "s" + songNumber + "section" + (h + 1) + "chordLoop"
          ) === null
            ? 1
            : sessionStorage.getItem(
                "s" + songNumber + "section" + (h + 1) + "chordLoop"
              ),
        melody:
          sessionStorage.getItem(
            "s" + songNumber + "section" + (h + 1) + "melodyLoop"
          ) === null
            ? 1
            : sessionStorage.getItem(
                "s" + songNumber + "section" + (h + 1) + "melodyLoop"
              ),
        bass:
          sessionStorage.getItem(
            "s" + songNumber + "section" + (h + 1) + "bassLoop"
          ) === null
            ? 1
            : sessionStorage.getItem(
                "s" + songNumber + "section" + (h + 1) + "bassLoop"
              ),
        vocal:
          sessionStorage.getItem(
            "s" + songNumber + "section" + (h + 1) + "vocalLoop"
          ) === null
            ? 1
            : sessionStorage.getItem(
                "s" + songNumber + "section" + (h + 1) + "vocalLoop"
              ),
        fx:
          sessionStorage.getItem(
            "s" + songNumber + "section" + (h + 1) + "fxLoop"
          ) === null
            ? 1
            : sessionStorage.getItem(
                "s" + songNumber + "section" + (h + 1) + "fxLoop"
              ),
      };

      selectedLoops.push(section);
    }

    songObject.loopNumbers = selectedLoops;
  };

  const saveSongHelper = async () => {
    if (user) {
      selectedUserLoops();
      selectedUserLoopsNumber();
      songObject.name = formData.name;
      songGettingSaved((savinSong = true));
      sendData(false);
      await addSongs(songObject);
      sendData(true);
      songGettingSaved((savinSong = false));
    } else {
      alert("you need to login");
    }
  };

  let [savinSong, songGettingSaved] = useState(false);

  const onSubmit = async (e) => {
    e.preventDefault();
    saveSongHelper();
  };

  return savinSong ? (
    <LoadingSpinner
      text={"Song is getting saved!"}
      spinnerVariation={1}
      marginTop={"20px"}
    />
  ) : (
    <form className={"formHolder"} onSubmit={(e) => onSubmit(e)}>
      <textarea
        style={{ whiteSpace: "pre-wrap" }}
        maxLength="1000"
        onChange={(e) => onChange(e)}
        value={name}
        name="name"
        className={"feedback-input"}
        placeholder={"Name your song!"}
      ></textarea>
      <input type="submit" value="Save" />
    </form>
  );
};

InputSaveSong.propTypes = {
  setAlert: PropTypes.func.isRequired,
  addSongs: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  setAlert,
  addSongs,
})(InputSaveSong);
