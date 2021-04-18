import React, { useState } from 'react';
import Recording from '../Main/Recording/Recording';
import StudioControl from '../Main/StudioControl/StudioControl';
import Peer from '../Jam/Peer';
import './Jam.css';
import io from 'socket.io-client';
import HandleRoom from './HandleRoom';
import CopyLink from './CopyLink';
import Choose from './Choose';
import InstrumentSection from './InstrumentSection';
import Navigation from './Navigation';

export default function Jam({ location }) {
  const socket = io('http://localhost:8080');
  // const socket = io('https://socket-latency.herokuapp.com');

  const approaches = {
    0: '',
    1: 'Server Side with Websocket',
    2: 'Client Side with Websocket',
    3: 'Client Side with Peer to Peer',
  };
  const [approach, setApproach] = useState(0);

  const [roomFull, setRoomFull] = useState(false);

  return (
    <>
      <Navigation approaches={approaches} approach={approach} />
      <div className='wrapMe'>
        {approach === 0 && <Choose chooseApproach={(data) => setApproach(data)} />}
        {approach != 0 && <StudioControl socket={socket} bpm={120} />}
        {approach != 0 && <InstrumentSection roomFull={roomFull} />}
        {approach != 0 && !roomFull && <CopyLink />}
        {approach != 0 && <HandleRoom roomFull={(data) => setRoomFull(data)} socket={socket} />}

        {/* <Recording location={location} socket={socket}></Recording>; */}
        {/* <Peer socket={socket}></Peer> */}
      </div>
    </>
  );
}
