import React, { Component } from 'react';
import LoopHolder from './../LoopHolder/LoopHolder';
import LockRelease from './ControlComponents/LockRelease/LockRelease';
import Slider from './ControlComponents/Slider/Slider';
import NormalSlider from '../../UseComponents/Slider/NormalSlider';
import Aux from './../../UseComponents/MyDiv/MyDiv';
import PlayPause from './ControlComponents/PlayPause/PlayPause';
import Sketch from 'react-p5';
import { Transport } from 'tone';
import * as cn from 'classnames';
import './StudioControl.scss';
import { opacity } from './../../TransitionStyles/TransitionStyles';

Transport.loop = true;
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
  }

  state = {
    whichTrigger: {
      triggerOn1: false,
      triggerOn2: false,
      triggerOn3: false,
      triggerOn4: false,
    },

    sectionStatus: this.props.sectionStatus,

    smallStyle1: 'white',
    smallStyle2: 'white',
    smallStyle3: 'white',
    smallStyle4: 'white',

    timerAnimationStart: 'progress-value',

    sectionArrayFromChild: this.props.sectionStatus,
    nextSectionAlreadySet: false,

    isItLocked: true,
    isItLockedStyle: false,

    audioLoaded: false,
    started: false,
    currentTempo: this.props.bpm,
  };

  //Setup
  componentDidMount = () => {
    Transport.bpm.value = this.props.bpm;

    document.body.onkeydown = (e) => {
      if (e.key === ' ') {
        e.preventDefault();
        this.playPause();
      }
    };
  };

  componentWillUnmount = () => {
    Transport.stop();
    Transport.cancel();

    for (let h = 0; h < this.state.sectionArrayFromChild.length; h++) {
      if (this.state.sectionArrayFromChild[h].active === true) {
        for (let i = 0; i < this.props.allLoops[h].length; i++) {
          for (let j = 0; j < this.props.allLoops[h][i].length; j++) {
            if (this.props.allLoops[h][i][j].wasItTriggered === true) {
              this.props.allLoops[h][i][j].loop.stop();
            }
          }
        }
      }
    }

    if (this.props.metronome.loop.state === 'started') this.props.metronome.loop.stop();

    document.getElementById('playPauseTitle').innerHTML = 'Play';
    window.isTransportPlaying = false;
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
    if (window.isTransportPlaying === false) {
      //Start Loops
      this.playAudio();

      //Change HTML
      document.getElementById('playPauseTitle').innerHTML = 'STOP';
      window.isTransportPlaying = true;
      this.setState({ started: true });
    }

    //Stop Everything
    else if (window.isTransportPlaying === true) {
      this.pauseAudio();
      document.getElementById('playPauseTitle').innerHTML = 'START';
      this.setState({
        smallStyle4: 'white',
        smallStyle3: 'white',
        smallStyle2: 'white',
        smallStyle1: 'white',
      });
      this.setState({ timerAnimationStart: '0%' });
      window.isTransportPlaying = false;
      this.setState({ started: false });
    }
  };

  playAudio = () => {
    this.animationHandler();

    this.startStopEvent = Transport.schedule((time) => {
      for (let h = 0; h < this.state.sectionStatus.length; h++) {
        if (this.state.sectionStatus[h].active === true) {
          for (let i = 0; i < this.props.allLoops[h].length; i++) {
            for (let j = 0; j < this.props.allLoops[h][i].length; j++) {
              if (this.props.allLoops[h][i][j].wasItTriggered === true) {
                this.props.allLoops[h][i][j].loop.playbackRate =
                  this.state.currentTempo / this.props.bpm;
                this.props.allLoops[h][i][j].loop.start(time);
              }
            }
          }
        }
      }
      this.props.metronome.loop.playbackRate = this.state.currentTempo / 120;
      if (this.props.metronome.state) this.props.metronome.loop.start(time);
    }, '0:0:0');

    Transport.start();
  };

  pauseAudio = () => {
    Transport.stop();
    Transport.cancel();

    for (let h = 0; h < this.state.sectionStatus.length; h++) {
      if (this.state.sectionStatus[h].active === true) {
        for (let i = 0; i < this.props.allLoops[h].length; i++) {
          for (let j = 0; j < this.props.allLoops[h][i].length; j++) {
            if (this.props.allLoops[h][i][j].wasItTriggered === true) {
              this.props.allLoops[h][i][j].loop.stop();
            }
          }
        }
      }
    }
    if (this.props.metronome.state) this.props.metronome.loop.stop();
  };

  animationHandler = () => {
    // Transport.schedule(() => {
    //   this.setState({ timerAnimationStart: "20%" });
    // }, "0:0:0");
    // Transport.schedule(() => {
    //   this.setState({ timerAnimationStart: "40%" });
    // }, "0:4:0");
    // Transport.schedule(() => {
    //   this.setState({ timerAnimationStart: "60%" });
    // }, "0:8:0");
    Transport.schedule(() => {
      this.fullSongHandler();
    }, '0:15:0');
  };

  fullSongHandler = () => {
    if (this.state.isItLocked === false) {
      Transport.cancel();
      var changedSectionStatus = this.state.sectionStatus;
      var activeSection;

      changedSectionStatus.forEach((section) => {
        if (section.active === true) {
          activeSection = section;
        }
      });

      changedSectionStatus[activeSection.id].active = false;
      if (this.state.sectionStatus.length === activeSection.id + 1) {
        changedSectionStatus[0].active = true;
      } else {
        changedSectionStatus[activeSection.id + 1].active = true;
      }

      Transport.scheduleOnce(() => {
        this.setState(
          {
            sectionnStatus: [...this.state.sectionStatus, changedSectionStatus],
          },
          () => {
            this.playAudio();
          }
        );
      }, '0:15:3');
    }
  };

  lockReleaseHandler = () => {
    if (this.state.whichTrigger.triggerOn1 === false) {
      if (this.state.isItLocked === true) {
        this.setState({ isItLocked: false });
      } else {
        this.setState({ isItLocked: true });
      }
    }
  };

  masterVolume = () => {
    let volumeSlider = document.getElementById('volumeSlider');
    for (let h = 0; h < this.state.sectionArrayFromChild.length; h++) {
      for (let i = 0; i < this.props.allLoops[h].length; i++) {
        for (let j = 0; j < this.props.allLoops[h][i].length; j++) {
          if (this.props.allLoops[h][i][j].wasItTriggered === true) {
            this.props.allLoops[h][i][j].loop.volume.value = volumeSlider.value;
          }
        }
      }
    }
  };

  masterTempo = (e, value) => {
    this.setState({ currentTempo: value });
    for (let h = 0; h < this.state.sectionArrayFromChild.length; h++) {
      if (this.state.sectionArrayFromChild[h].active === true) {
        for (let i = 0; i < this.props.allLoops[h].length; i++) {
          for (let j = 0; j < this.props.allLoops[h][i].length; j++) {
            if (this.props.allLoops[h][i][j].wasItTriggered === true) {
              this.props.allLoops[h][i][j].loop.playbackRate = value / this.props.bpm;
            }
          }
        }
      }
    }
    this.props.metronome.loop.playbackRate = value / 120;
    this.props.tempoSliderValue(value);
  };

  sectionClick = (data) => {
    if (window.isTransportPlaying === true) {
      Transport.stop();
      for (let h = 0; h < this.state.sectionStatus.length; h++) {
        for (let i = 0; i < this.props.allLoops[h].length; i++) {
          for (let j = 0; j < this.props.allLoops[h][i].length; j++) {
            if (this.props.allLoops[h][i][j].wasItTriggered === true) {
              this.props.allLoops[h][i][j].loop.stop();
            }
          }
        }
      }
      this.playAudio();
    }
  };

  render() {
    const typeEaseDuration = {
      type: 'tween',
      ease: 'anticipate',
      duration: 0.8,
    };

    return (
      //studioControl motion!
      <Aux>
        <div className={'studioControl'}>
          <div
            className={this.state.started ? 'playPauseHolderStarted' : 'playPauseHolder'}
            onClick={this.playPause}>
            <div style={{ minWidth: '80px' }}>
              <PlayPause title={'START'}></PlayPause>
            </div>
          </div>
          <div
            className={this.state.isItLocked ? 'lockHolder ' : 'lockHolder lockActive'}
            onClick={() => {
              this.setState({ isItLocked: !this.state.isItLocked });
            }}>
            Full Song
          </div>
          <div className={'tempoHolder'}>
            <div>Tempo</div>
            <div className='controlSlider'>
              <NormalSlider
                min={10}
                id='volume'
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

        <LoopHolder
          loopNames={this.props.loopNames}
          allLoops={this.props.allLoops}
          colorTheme={this.props.colorTheme}
          whichGenre={this.props.whichGenre}
          categoryLoop={this.props.categoryLoop}
          isItLocked={this.state.isItLocked}
          bpm={this.props.bpm}
          currentTempo={this.state.currentTempo}
          fx={this.props.fx}
          sendSections={this.receiveSectionStatus}
          whichTrigger={this.state.whichTrigger}
          timerAnimationStart={this.state.timerAnimationStart}
          categorySize={this.props.categorySize}
          categoryPreselected={this.props.categoryPreselected}
          sectionStatus={this.props.sectionStatus}
          parentCallback={(data) => {
            this.sectionClick(data);
          }}
        />
      </Aux>
    );
  }
}

export default StudioControl;
