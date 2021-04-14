import React, { useEffect, useRef, useState } from 'react';
import { Fragment } from 'react';
import NormalSlider from '../../../UseComponents/Slider/NormalSlider';
import './Microphone.css';
import Tone from 'tone';

export default function Microphone() {
  const mic = new Tone.UserMedia().toMaster();
  const visualizer = useRef(null);
  const fft = new Tone.Analyser('fft', 32);

  const [micState, setMicState] = useState(false);

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
        mic.mute = false;
        drawFFT();
      })
      .catch((e) => {
        // promise is rejected when the user doesn't have or allow mic access
        console.log('mic not open');
      });
  };

  const off = () => {
    console.log('hey');
    mic.mute = true;
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
        <div id='volume'>Volume</div>
        <NormalSlider min={0} id='volume' max={1} def={0.5} step={0.01} reactToChange={() => {}} />
      </div>
      <canvas ref={visualizer} width={100} height={150} className='visualizer'></canvas>
      <button
        onClick={() => {
          on();
        }}>
        Activate Mic
      </button>
      <button
        onClick={() => {
          off();
        }}>
        Mute
      </button>
      {micState ? <div>Microphone is on and working!</div> : null}
    </Fragment>
  );
}
