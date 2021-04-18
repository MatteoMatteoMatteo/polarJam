import React, { useState } from 'react';
import Recording from '../Main/Recording/Recording';
import StudioControl from '../Main/StudioControl/StudioControl';
import Peer from '../Jam/Peer';
import './Jam.css';
import io from 'socket.io-client';
import CopyLink from './CopyLink';
import Choose from './Choose';
import InstrumentSection from './InstrumentSection';

export default function Jam({ location }) {
  const socket = io('http://localhost:8080');
  // const socket = io('https://socket-latency.herokuapp.com');

  const approaches = {
    0: '',
    1: 'Server Side - Websocket',
    2: 'Client Side - Websocket',
    3: 'Client Side - Peer to Peer',
  };
  const [approach, setApproach] = useState(0);

  return (
    <>
      <div className={'newNav'}>
        {approach != 0 && <div className={'newNavContent'}>{approaches[approach]}</div>}
      </div>
      <div className='wrapMe'>
        {approach === 0 && <Choose chooseApproach={(data) => setApproach(data)} />}
        {approach != 0 && <StudioControl socket={socket} bpm={120}></StudioControl>}
        {approach != 0 && <InstrumentSection />}
        {approach != 0 && <CopyLink></CopyLink>}
        {/* <Recording location={location} socket={socket}></Recording>; */}
        {/* <Peer socket={socket}></Peer> */}
      </div>
    </>
  );
}
