import React, { useState, useEffect } from 'react';
import StudioControl from '../Main/StudioControl/StudioControl';
import './Jam.css';
import io from 'socket.io-client';
import HandleRoom from './HandleRoom';
import CopyLink from './CopyLink';
import Choose from './Choose';
import InstrumentSection from './InstrumentSection';
import Navigation from './Navigation';
import ServerSideSocket from './Approaches/ServerSideSocket';
import ClientSideSocket from './Approaches/ClientSideSocket';
import ClientSidePeer from './Approaches/ClientSidePeer';

export default function Jam({ location }) {
  const socket = io('http://localhost:8080');
  // const socket = io('https://socket-latency.herokuapp.com');

  const approaches = {
    0: '',
    1: 'Server-side with WebSocket',
    2: 'Client-side with WebSocket',
    3: 'Client-side with peer-to-peer',
  };
  const [socketId, setSocketId] = useState(null);
  const [approach, setApproach] = useState(0);
  const [roomFull, setRoomFull] = useState(false);
  const [allMusicians, setAllMusicians] = useState([]);
  const [noteWasPlayed, setNoteWasPlayed] = useState([]);
  const [helper, setHelper] = useState(false);

  return (
    <>
      <Navigation approaches={approaches} approach={approach} />
      <div className='wrapMe'>
        {approach === 0 && <Choose chooseApproach={(data) => setApproach(data)} />}
        {approach != 0 && <StudioControl socketId={socketId} socket={socket} bpm={120} />}
        {approach != 0 && (
          <InstrumentSection
            socketId={socketId}
            approach={approach}
            socket={socket}
            roomFull={roomFull}
            noteWasPlayed={(note) => {
              setHelper(!helper);
              setNoteWasPlayed([note, helper]);
            }}
          />
        )}

        {approach != 0 && (
          <HandleRoom
            allMusicians={(data) => setAllMusicians(data)}
            giveId={(id) => setSocketId(id)}
            roomFull={(data) => setRoomFull(data)}
            socket={socket}
            approach={approach}
          />
        )}

        {approach === 1 && <ServerSideSocket roomFull={roomFull} socket={socket} />}

        {approach === 3 && (
          <ClientSidePeer
            allMusicians={allMusicians}
            roomFull={roomFull}
            socketId={socketId}
            socket={socket}
            noteWasPlayed={noteWasPlayed}
          />
        )}
      </div>
    </>
  );
}
