import React, { Component } from 'react';
import LoopHolder from './../LoopHolder/LoopHolder';
import LockRelease from './ControlComponents/LockRelease/LockRelease';
import Slider from './ControlComponents/Slider/Slider';
import NormalSlider from '../../UseComponents/Slider/NormalSlider';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import Aux from './../../UseComponents/MyDiv/MyDiv';
import PlayPause from './ControlComponents/PlayPause/PlayPause';
import polar from './../../Assets/polar.png';
import Sketch from 'react-p5';
import { Transport } from 'tone';
import Tone from 'tone';
import * as cn from 'classnames';
import './StudioControl.scss';
import { opacity } from './../../TransitionStyles/TransitionStyles';

Transport.loop = false;
Transport.loopEnd = '4m';
window.isTransportPlaying = false;

class StudioControl extends Component {
  constructor(props) {
    super(props);

    this.receivedSectionStatus = {
      receivedIntroStatus: null,
      receivedVerseStatus: null,
      receivedPrechorusStatus: null,
      receivedChorusStatus: null,
      receivedOutroStatus: null,
    };
    this.child = React.createRef();

    this.startStopEvent = null;
    this.nextSectionEvent = null;
    this.introSectionEvent = null;
    this.verseSectionEvent = null;
    this.prechorusSectionEvent = null;
    this.chorusSectionEvent = null;
    this.outroSectionEvent = null;

    this.metronome = new Tone.Player({
      url: require(`./../../Assets/Instruments/metronome.mp3`),
      loop: true,
    }).toMaster();
  }

  state = {
    whichTrigger: {
      triggerOn1: false,
      triggerOn2: false,
      triggerOn3: false,
      triggerOn4: false,
    },

    smallStyle1: 'white',
    smallStyle2: 'white',
    smallStyle3: 'white',
    smallStyle4: 'white',

    timerAnimationStart: 'progress-value',

    nextSectionAlreadySet: false,

    isItLocked: true,
    isItLockedStyle: false,

    audioLoaded: false,
    started: false,
    currentTempo: 100,
    metronome: true,
  };

  //Setup
  componentDidMount = () => {
    Transport.bpm.value = 100;

    this.props.socket.on('syncMetro', (transportState) => {
      this.playPauseRemote(transportState);
    });
  };

  setup = (p5, canvasParentRef) => {
    p5.createCanvas(110, 18).parent(canvasParentRef);
  };

  draw = (p5) => {
    p5.textSize(12);
    p5.background('white');
    p5.fill('black');
    p5.text('BPM: ' + this.state.currentTempo, 6, 13);
    p5.textFont('Rubik');
    Transport.bpm.value = this.state.currentTempo;
    p5.text(Transport.position.toString().slice(0, 5), 73, 13);
  };

  //Play & Pause Button
  playPause = () => {
    if (Transport.state === 'stopped') {
      Transport.start();
      if (this.state.metronome && this.metronome.state === 'stopped') {
        this.metronome.playbackRate = this.state.currentTempo / this.props.bpm;
        this.metronome.start(
          undefined,
          Transport.toSeconds(Transport.position) * (this.state.currentTempo / this.props.bpm)
        );
      }
      this.setState({ started: true });

      //Emit it to other musicians
      let state = 'started';
      this.props.socket.emit('syncMetroRequest', state, this.props.socketId);
    } else {
      Transport.stop();
      if (this.metronome.state === 'started') {
        this.metronome.stop();
      }
      this.setState({ started: false });

      //Emit it to other musicians
      let state = 'stopped';
      this.props.socket.emit('syncMetroRequest', state, this.props.socketId);
    }
  };

  //Play & Pause Button
  playPauseRemote = (transportState) => {
    console.log('ehheeh');
    if (Transport.state === 'stopped' && transportState === 'started') {
      Transport.start();
      if (this.state.metronome && this.metronome.state === 'stopped') {
        this.metronome.playbackRate = this.state.currentTempo / this.props.bpm;
        this.metronome.start(
          undefined,
          Transport.toSeconds(Transport.position) * (this.state.currentTempo / this.props.bpm)
        );
      }
      this.setState({ started: true });
    } else if (Transport.state === 'stopped' && transportState === 'stopped') {
    } else if (Transport.state === 'started' && transportState === 'started') {
      //Stop it
      Transport.stop();
      if (this.metronome.state === 'started') {
        this.metronome.stop();
      }

      //Start it in sync
      Transport.start();
      if (this.state.metronome && this.metronome.state === 'stopped') {
        this.metronome.playbackRate = this.state.currentTempo / this.props.bpm;
        this.metronome.start(
          undefined,
          Transport.toSeconds(Transport.position) * (this.state.currentTempo / this.props.bpm)
        );
      }
      this.setState({ started: false });
    } else if (Transport.state === 'started' && transportState === 'stopped') {
      Transport.stop();
      if (this.metronome.state === 'started') {
        this.metronome.stop();
      }
      this.setState({ started: false });
    }
  };

  masterTempo = (e, value) => {
    this.setState({ currentTempo: value });
    this.metronome.playbackRate = this.state.currentTempo / this.props.bpm;
  };

  handleMetronome = () => {
    this.setState({ metronome: !this.state.metronome }, () => {
      if (!this.state.metronome && this.metronome.state === 'started') {
        this.metronome.stop();
      }
      if (
        this.state.metronome &&
        this.metronome.state === 'stopped' &&
        Transport.state === 'started'
      ) {
        this.metronome.start(
          undefined,
          Transport.toSeconds(Transport.position) * (this.state.currentTempo / this.props.bpm)
        );
      }
    });
  };

  render() {
    return (
      //studioControl motion!
      <Aux>
        <div className={'studioControl'}>
          <div
            className={this.state.started ? 'playPauseHolderStarted' : 'playPauseHolder'}
            onClick={this.playPause}>
            <div style={{ minWidth: '80px' }}>
              <PlayPause title={this.state.started ? 'STOP' : 'START'}></PlayPause>
            </div>
          </div>
          <div
            onClick={() => {
              this.handleMetronome();
            }}
            className={this.state.metronome ? 'metronomeHolderOn' : 'metronomeHolderOff'}>
            Metronome
          </div>
          <div className={'tempoHolder'}>
            <div>Tempo</div>
            <div className='controlSlider'>
              <NormalSlider
                min={10}
                id='tempo'
                max={200}
                sliderWitdh='120px'
                def={this.props.bpm}
                step={1}
                reactToChange={() => {}}
                reactToChangeAlways={(e, value) => {
                  this.masterTempo(e, value);
                }}
              />
            </div>
            <div className='controlSketch'>
              <Sketch setup={this.setup} draw={this.draw} />
            </div>
          </div>
        </div>
      </Aux>
    );
  }
}

export default StudioControl;
