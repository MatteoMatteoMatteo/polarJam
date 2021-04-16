import React, { useEffect, useRef, useState } from 'react';
import { Fragment } from 'react';
import NormalSlider from '../../../UseComponents/Slider/NormalSlider';
import './Microphone.css';
import Tone from 'tone';
import Peer from 'simple-peer';

const mic = new Tone.UserMedia().toMaster();

export default function Microphone({ socket }) {
  const visualizer = useRef(null);
  const fft = new Tone.Analyser('fft', 32);
  const dist = new Tone.Chorus(4, 2.5, 0.5).toMaster();

  const [activateMic, setActivateMic] = useState(false);

  const [me, setMe] = useState('initialState');
  const [stream, setStream] = useState();
  const [receivingCall, setReceivingCall] = useState(false);
  const [caller, setCaller] = useState('');
  const [callerSignal, setCallerSignal] = useState();
  const [callAccepted, setCallAccepted] = useState(false);
  const [idToCall, setIdToCall] = useState('');
  const [callEnded, setCallEnded] = useState(false);
  const [name, setName] = useState('');

  const myVideo = useRef();
  const userVideo = useRef();
  const connectionRef = useRef();

  useEffect(() => {
    navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
      setStream(stream);
      myVideo.current.srcObject = stream;
    });

    socket.on('me', (id) => {
      setMe(me);
      console.log(id);
    });

    socket.on('callUser', (data) => {
      setReceivingCall(true);
      setCaller(data.from);
      setName(data.name);
      setCallerSignal(data.signal);
    });
  }, []);

  const callUser = (id) => {
    const peer = new Peer({ initiator: true, trickle: false, stream: stream });
    peer.on('signal', (data) => {
      socket.emit('callUser', {
        userToCall: id,
        signalData: data,
        from: me,
        name: name,
      });
    });

    peer.on('stream', (stream) => {
      userVideo.current.srcObject = stream;
    });

    socket.on('callAccepted', (signal) => {
      setCallAccepted(true);
      peer.signal(signal);
    });

    connectionRef.current = peer;
  };

  const answerCall = () => {
    setCallAccepted(true);
    const peer = new Peer({
      initiator: false,
      trickle: false,
      stream: stream,
    });

    peer.on('signal', (data) => {
      socket.emit('answerCall', { signal: data, to: caller });
    });

    peer.on('stream', (stream) => {
      userVideo.current.srcObject = stream;
    });

    peer.signal(callerSignal);
    connectionRef.current = peer;
  };

  const leaveCall = () => {
    setCallEnded(true);
    connectionRef.current.destroy();
  };

  const on = () => {
    mic
      .open()
      .then((stream) => {
        setStream(stream);
        mic.connect(dist);
        mic.connect(fft);
        drawFFT();
        console.log(mic);
      })
      .catch((e) => {
        // promise is rejected when the user doesn't have or allow mic access
        console.log('mic not open');
      });
  };

  const handleMicActivation = () => {
    setActivateMic(true);
    on();
  };

  const off = () => {
    console.log(mic);
    mic.close();
  };

  const drawFFT = () => {
    requestAnimationFrame(drawFFT);
    const canvasWidth = visualizer.current.width;
    const canvasHeight = visualizer.current.height;
    const fftContext = visualizer.current.getContext('2d');
    const bufferLength = fft.getValue().length;
    const dataArray = fft.getValue();
    const barWidth = canvasWidth / bufferLength;
    var positiveData = dataArray.map((value) => {
      return value * -1;
    });

    fftContext.clearRect(0, 0, canvasWidth, canvasHeight);
    positiveData.forEach((item, index) => {
      const y = (item / 210) * canvasHeight;
      const x = barWidth * index;
      fftContext.fillStyle = '#ffffff';
      fftContext.fillRect(parseInt(x), parseInt(canvasHeight - y), parseInt(barWidth), parseInt(y));
    });
  };

  const resize = () => {
    visualizer.current.width = visualizer.current.width * window.devicePixelRatio;
  };
  return (
    <Fragment>
      {/* <div className='grid'>
        {!activateMic && (
          <button
            className={'muteButton'}
            style={{ marginTop: '20px' }}
            onClick={() => {
              handleMicActivation();
            }}>
            Activate Microphone
          </button>
        )}

        {activateMic && (
          <>
            <div style={{ marginBottom: '30px' }}>
              <canvas ref={visualizer} width={100} height={100} className='visualizer'></canvas>
            </div>
            <button
              className={'muteButton'}
              onClick={() => {
                off();
              }}>
              Mute
            </button>
            <button
              className={'muteButton'}
              onClick={() => {
                on();
              }}>
              Unmute
            </button>
          </>
        )}
      </div> */}
      <h1 style={{ textAlign: 'center', color: '#fff' }}>Zoomish</h1>
      <div className='container' style={{ margin: 'auto' }}>
        <div className='video-container'>
          <div className='video'>
            {stream && (
              <video playsInline muted ref={myVideo} autoPlay style={{ width: '300px' }} />
            )}
          </div>
          <div className='video'>
            {callAccepted && !callEnded ? (
              <video
                playsInline
                ref={userVideo}
                autoPlay
                style={{ width: '300px', border: 'red solid 2px' }}
              />
            ) : null}
          </div>
        </div>
        <div className='myId'>
          <input
            id='filled-basic'
            label='Name'
            variant='filled'
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={{ marginBottom: '20px', padding: '50px' }}
          />

          <input
            id='filled-basic'
            label='ID to call'
            variant='filled'
            value={idToCall}
            onChange={(e) => setIdToCall(e.target.value)}
            style={{ marginBottom: '20px', padding: '50px' }}
          />
          <div className='call-button'>
            {callAccepted && !callEnded ? (
              <button
                style={{ border: 'solid 3px red', padding: '50px' }}
                variant='contained'
                color='secondary'
                onClick={leaveCall}>
                End Call
              </button>
            ) : (
              <button
                style={{ border: 'solid 3px red', padding: '50px' }}
                color='primary'
                aria-label='call'
                onClick={() => callUser(idToCall)}>
                ANRUFEN
              </button>
            )}
            {idToCall}
          </div>
        </div>
        <div>
          {receivingCall && !callAccepted ? (
            <div className='caller'>
              <h1>{name} is calling...</h1>
              <button variant='contained' color='primary' onClick={answerCall}>
                Answer
              </button>
            </div>
          ) : null}
        </div>
      </div>
    </Fragment>
  );
}
