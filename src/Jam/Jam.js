import React, { useState } from 'react';
import Recording from '../Main/Recording/Recording';
import StudioControl from '../Main/StudioControl/StudioControl';
import Peer from '../Jam/Peer';
import './Jam.css';
import io from 'socket.io-client';
import CopyLink from './CopyLink';

export default function Jam({ location }) {
  // const socket = io('http://localhost:8080');
  const socket = io('https://socket-latency.herokuapp.com');

  return (
    <>
      <StudioControl socket={socket} bpm={120}></StudioControl>
      {/* <Recording location={location} socket={socket}></Recording>; */}
      <CopyLink></CopyLink>
      <Peer socket={socket}></Peer>
    </>
  );
}
