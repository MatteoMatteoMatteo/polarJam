import React from "react";
import { useHistory } from "react-router-dom";

import "./Lobby.css";
const { v4: uuidV4 } = require("uuid");

const Lobby = () => {
  const history = useHistory();
  var room = null;

  const redirectToRoom = () => {
    room = uuidV4();
    history.push({
      pathname: "/",
      search: `${room}`,
      state: { room, userId: 10 },
    });
  };

  return (
    <div className={"lobbyHolder"}>
      <div
        className={"selectMe"}
        onClick={() => {
          redirectToRoom();
        }}
      >
        Create Session
      </div>
    </div>
  );
};

export default Lobby;
