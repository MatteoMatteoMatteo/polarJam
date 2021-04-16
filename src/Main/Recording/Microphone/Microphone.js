import React, { useEffect, useRef, useState } from 'react';
import { Fragment } from 'react';
import NormalSlider from '../../../UseComponents/Slider/NormalSlider';
import './Microphone.css';
import Tone from 'tone';

const mic = new Tone.UserMedia().toMaster();

export default function Microphone() {
  const visualizer = useRef(null);
  const fft = new Tone.Analyser('fft', 32);

  const [activateMic, setActivateMic] = useState(false);

  const on = () => {
    mic
      .open()
      .then(() => {
        // promise resolves when input is available
        console.log('mic open');
        // print the incoming mic levels in decibels
        // setInterval(() => {
        //   if (meter.getValue()) {
        //     setMicState(true);
        //   }
        // }, 500);
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
      <div className='grid'>
        {/* <div style={{ marginRight: '20px' }} id='volume'>
          Volume
        </div>
        <div style={{ marginTop: '8px' }}>
          <NormalSlider
            min={0}
            id='volume'
            max={1}
            def={0.5}
            step={0.01}
            reactToChange={() => {}}
          />
        </div> */}
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
      </div>
    </Fragment>
  );
}
