import React, { useState } from 'react';
import Recording from '../Main/Recording/Recording';
import StudioControl from '../Main/StudioControl/StudioControl';
import './Jam.css';
import io from 'socket.io-client';

export default function Jam({ location }) {
  const socket = io('ws://localhost:8080');
  // this.socket = io('https://socket-latency.herokuapp.com');

  return (
    <>
      <StudioControl socket={socket} bpm={120}></StudioControl>
      <Recording location={location} socket={socket}></Recording>;
      <div style={{ padding: '0px 0px' }}>
        <div className='homeDiv'>
          <button className='letsGoButton'>Copy Link</button>
          <p>and send it to other musicians!</p>
        </div>
      </div>
    </>
  );
}
