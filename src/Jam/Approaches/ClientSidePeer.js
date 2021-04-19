import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import React, { useEffect, useRef, useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Peer from 'simple-peer';
import Tone from 'tone';
import ClientSideSocket from './ClientSideSocket';
import './../Peer.css';

var peer1;
var peer2;
const piano1 = new Tone.Sampler({
  C1: require('../../Assets/Instruments/Piano2/C1.mp3'),
  C2: require('../../Assets/Instruments/Piano2/C2.mp3'),
  C3: require('../../Assets/Instruments/Piano2/C3.mp3'),
  C4: require('../../Assets/Instruments/Piano2/C4.mp3'),
}).toMaster();

function ClientSidePeer({ socket }) {
  const [me, setMe] = useState('');
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState('');
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');
  const [multipleMusicians, setMultipleMusicians] = useState(false);

  const connectionRef = useRef();

  useEffect(() => {
    socket.on('me', (id) => {
      setMe(id);
    });

    socket.emit('join-room', window.location.href.substring(window.location.href.indexOf('?') + 1));

    socket.on('user-connected', (musiciansArray) => {
      if (musiciansArray.length > 1) {
        setMultipleMusicians(true);
        setIdToCall(musiciansArray[1].socketId);
      }
    });

    socket.on('callUser', (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    peer1 = new Peer({
      initiator: true,
      trickle: false,
      stream: stream,
    });
    peer1.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });
    peer1.on('connect', () => {
      console.log('connected');
    });

    peer1.on('data', (data) => {
      console.log('I got a message from musician1: ' + data);
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer1.signal(signal);
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
      piano1.triggerAttackRelease('C4', '0.5', '@8n', 0.4);
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

  const helloToCaller = () => {
    peer2.send('halllooooooooo mr Caller!!');
  };

  const helloToAnswerer = () => {
    peer1.send('hello answerer!!!!');
  };

  const sendAudio = () => {
    Tone.Transport.scheduleRepeat((time) => {
      piano1.triggerAttackRelease('C4', '0.5', '@8n', 0.4);
      peer1.send('hello answerer!!!!');
    }, '8n');
  };

  return (
    <>
      <div className='container'>
        {multipleMusicians && (
          <div className='otherMusician' onClick={() => callUser(idToCall)}>
            Set up Peer to Peer connection to another musician
          </div>
        )}
        {receivingCall && <button onClick={() => answerCall()}>Accept call</button>}
      </div>
      {/* <div className={'actionHolder'}>
        <button onClick={() => helloToCaller()}>HelloToCaller</button>
        <button onClick={() => helloToAnswerer()}>HelloToAnswerer</button>
        <button onClick={() => sendAudio()}>SendAudioFrom1To2</button>
      </div> */}
    </>
  );
}

export default ClientSidePeer;
