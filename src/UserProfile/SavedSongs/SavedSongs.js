import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";
import { Redirect } from "react-router-dom";
import { deleteSong } from "./../../Redux/Actions/profile";
import { connect } from "react-redux";
import "./SavedSongs.css";
import classNames from "classnames";

const SavedSongs = ({ song, deleteSong }) => {
  let [savedSongSettings, setSavedSong] = useState([]);
  let [redirect, setRedirect] = useState(false);

  const loadSong = async (id) => {
    await checkWhichSong(id);
    setRedirect(true);
  };

  const checkWhichSong = async (id) => {
    for (let i = 0; i < song.length; i++) {
      if (song[i]._id === id) {
        setSavedSong(song[i]);
      }
    }
  };
  const songs = song.map((song) => (
    <div className={"nameAndDescriptionHolder"} key={song._id}>
      <div
        onClick={() => {
          loadSong(song._id);
        }}
        className={classNames("songName", "animation")}
      >
        {song.name}
      </div>
      <button
        onClick={() => {
          deleteSong(song._id);
        }}
        className={classNames("songDelete", "animation")}
      >
        Delete
      </button>
    </div>
  ));
  const empty = (
    <Fragment>
      <p>A bit empty here...</p>
      <p>Start adding songs!</p>
    </Fragment>
  );

  if (redirect) {
    return (
      <Redirect
        exact
        to={{
          pathname: "/",
          state: { id: savedSongSettings },
        }}
      />
    );
  }
  return (
    <Fragment>
      <h2>Songs</h2>
      {song.length === 0 ? empty : songs}
    </Fragment>
  );
};

SavedSongs.propTypes = {
  song: PropTypes.array.isRequired,
  deleteSong: PropTypes.func.isRequired,
};

export default connect(null, { deleteSong })(SavedSongs);
