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

function ClientSidePeer({ socket, socketId, roomFull, allMusicians, noteWasPlayed }) {
  const [initialSetUp, setInitialSetUp] = useState(false);
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState('');
  const [callEnded, setCallEnded] = useState(false);
  const [calling, setCalling] = useState(false);
  const [multipleMusicians, setMultipleMusicians] = useState(false);

  const connectionRef = useRef();

  useEffect(() => {
    if (!initialSetUp) {
      socket.on('callUser', (data) => {
        setReceivingCall(true);
        setCaller(data.from);
        setCallerSignal(data.signal);
      });

      socket.on('callAccepted', (signal) => {
        setCallAccepted(true);
        peer1.signal(signal);
      });

      setInitialSetUp(true);
    }

    if (peer1) {
      console.log(noteWasPlayed);
      peer1.send(noteWasPlayed);
    }

    if (peer2) {
      console.log(noteWasPlayed);
      peer2.send(noteWasPlayed);
    }
  }, [noteWasPlayed]);

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
      console.log(data + '');
      if (Tone.Transport.state === 'started') piano1.triggerAttackRelease(data + '', '0.5', '@8n');
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
      if (Tone.Transport.state === 'started') piano1.triggerAttackRelease(data + '', '0.5', '@8n');

      console.log(data + '');
    });
    peer2.on('connect', () => {
      console.log('connected');
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
      peer1.send();
    }, '4n');
  };

  return (
    <>
      <div
        onClick={() => {
          sendAudio();
        }}
        class={'sendAudioButton'}>
        Send Audio
      </div>
      <div className='container'>
        {roomFull && !calling && !receivingCall ? (
          <div className='otherMusician' onClick={() => callUser()}>
            Set up peer-to-peer connection to another musician
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
        <div className={'fullRoom'}>You are connected to another musician</div>
      )}
      {/* <div className={'actionHolder'}>
        <button onClick={() => sendAudio()}>Send Audio From 1 To 2</button>
      </div> */}
    </>
  );
}

export default ClientSidePeer;
