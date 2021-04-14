import React, { useState } from "react";
import Modal from "../../../UseComponents/Modal/Modal";
import SaveSongForm from "./SaveSongForm/SaveSongForm";
import "../SongInfo.scss";

const SaveSong = ({ genre, songNumber, sectionArray }) => {
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

  return (
    <div style={{ display: "flex", alignItems: "center" }}>
      <div
        className={"saveSong"}
        onClick={() => toggleModal((modalOpened = true))}
      >
        Save Song
      </div>
      <Modal
        closeModel={() => {
          toggleModal((modalOpened = false));
        }}
        show={modalOpened}
        clickable={backdropClickable ? true : false}
      >
        <SaveSongForm
          songNumber={songNumber}
          sectionArray={sectionArray}
          genre={genre}
          parentCallback={(data) => {
            callback(data);
          }}
        />
      </Modal>
    </div>
  );
};

export default SaveSong;
