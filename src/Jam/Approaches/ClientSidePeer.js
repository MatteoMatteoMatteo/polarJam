import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Peer from 'simple-peer';
import Tone from 'tone';
import ClientSideSocket from './ClientSideSocket';
import './../Peer.css';
import { connectAdvanced } from 'react-redux';

var peer1;
var peer2;
const piano1 = new Tone.Sampler({
  C1: require('../../Assets/Instruments/Piano2/C1.mp3'),
  C2: require('../../Assets/Instruments/Piano2/C2.mp3'),
  C3: require('../../Assets/Instruments/Piano2/C3.mp3'),
  C4: require('../../Assets/Instruments/Piano2/C4.mp3'),
}).toMaster();

function ClientSidePeer({ socket, socketId, roomFull, allMusicians }) {
  const [me, setMe] = useState('');
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState('');
  const [callEnded, setCallEnded] = useState(false);
  const [calling, setCalling] = useState(false);
  const [multipleMusicians, setMultipleMusicians] = useState(false);
  const [CandE, setCandE] = useState(false);

  const connectionRef = useRef();

  useEffect(() => {
    socket.on('callUser', (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setCallerSignal(data.signal);
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer1.signal(signal);
    });
  }, []);

  const callUser = () => {
    setCalling(true);
    var idToCall;
    allMusicians.forEach((el) => {
      if (el.socketId != socketId) {
        idToCall = el.socketId;
      }
    });

    peer1 = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer1.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: idToCall,
        signalData: data,
        from: socketId,
      });
    });
    peer1.on('connect', () => {
      console.log('connected');
    });

    peer1.on('data', (data) => {
      console.log('I got a message from musician 2: ' + data);
    });

    connectionRef.current = peer1;
  };

  const answerCall = () => {
    setCallAccepted(true);
    peer2 = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });
    peer2.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: caller });
    });
    peer2.on('data', (data) => {
      if (Tone.Transport.state === 'started') piano1.triggerAttackRelease(data, '0.5', '@4n');
    });
    peer2.on('connect', () => {
      console.log('connected');
    });
    peer2.on('data', (data) => {
      console.log('I got a message from musician 1: ' + data);
    });

    peer2.signal(callerSignal);
    connectionRef.current = peer2;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  const sendAudio = () => {
    Tone.Transport.scheduleRepeat((time) => {
      // piano1.triggerAttackRelease('C4', '0.5', '@8n', 0.4);
      if (CandE) {
        sendE();
      } else {
        sendC();
      }
    }, '4n');
  };

  sendC = () => {
    peer1.send('C4');
    setCandE(true);
  };

  sendE = () => {
    peer1.send('E4');
    setCandE(false);
  };

  return (
    <>
      <div className='container'>
        {roomFull && !calling && !receivingCall ? (
          <div className='otherMusician' onClick={() => callUser()}>
            Set up Peer to Peer connection to the other musician
          </div>
        ) : (
          roomFull &&
          !callAccepted &&
          calling && <div className='calling'>Waiting for other musician to accept...</div>
        )}
        {receivingCall && !callAccepted && (
          <div className={'accept'} onClick={() => answerCall()}>
            Accept
          </div>
        )}
      </div>
      {callAccepted && roomFull && (
        <div className={'fullRoom'}>You are connected to another Musician</div>
      )}
      <div className={'actionHolder'}>
        <button onClick={() => sendAudio()}>Send Audio From 1 To 2</button>
      </div>
    </>
  );
}

export default ClientSidePeer;
