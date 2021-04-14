import React, { Component, Fragment } from 'react';
import './Recording.css';
import { array_move } from './../../Utils/externalFunctions';
import Sampler from './Sampler.js/Sampler';
import Tone from 'tone';
import io from 'socket.io-client';
import SelectBox from '../../UseComponents/SelectBox/SelectBox';
import polar from './../../Assets/polar.png';
import DiscreteSlider from '../../UseComponents/Slider/DiscreteSlider';
import LoadingSpinner from '../../UseComponents/LoadingSpinner/LoadingSpinner';
import Microphone from './Microphone/Microphone';

class Recording extends Component {
  constructor(props) {
    super(props);
    this.filledMidiArray = [];
    this.piano1 = new Tone.Sampler({
      C1: require('../../Assets/Instruments/Piano2/C1.mp3'),
      C2: require('../../Assets/Instruments/Piano2/C2.mp3'),
      C3: require('../../Assets/Instruments/Piano2/C3.mp3'),
      C4: require('../../Assets/Instruments/Piano2/C4.mp3'),
    }).toMaster();
    this.piano2 = new Tone.Sampler({
      C1: require('../../Assets/Instruments/Piano1/C1.mp3'),
      C2: require('../../Assets/Instruments/Piano1/C2.mp3'),
      C3: require('../../Assets/Instruments/Piano1/C3.mp3'),
      C4: require('../../Assets/Instruments/Piano1/C4.mp3'),
    }).toMaster();
    this.drums = new Tone.Sampler({
      C2: require('../../Assets/Instruments/Drums/kick.mp3'),
      'C#2': require('../../Assets/Instruments/Drums/rim.mp3'),
      D2: require('../../Assets/Instruments/Drums/snare.mp3'),
      'D#2': require('../../Assets/Instruments/Drums/clap.mp3'),
      E2: require('../../Assets/Instruments/Drums/snare2.mp3'),
      F2: require('../../Assets/Instruments/Drums/kick2.mp3'),
      'F#2': require('../../Assets/Instruments/Drums/tom.mp3'),
      G2: require('../../Assets/Instruments/Drums/hi.mp3'),
      'G#2': require('../../Assets/Instruments/Drums/snap.mp3'),
      A2: require('../../Assets/Instruments/Drums/tom2.mp3'),
      'A#2': require('../../Assets/Instruments/Drums/hiOpen.mp3'),
      B2: require('../../Assets/Instruments/Drums/tomSpace.mp3'),
      C3: require('../../Assets/Instruments/Drums/clapMeta.mp3'),
      'C#3': require('../../Assets/Instruments/Drums/crash.mp3'),
      D3: require('../../Assets/Instruments/Drums/swell.mp3'),
      'D#3': require('../../Assets/Instruments/Drums/ride.mp3'),
      E3: require('../../Assets/Instruments/Drums/kick.mp3'),
    }).toMaster();
    this.pluck1 = new Tone.Sampler({
      C1: require('../../Assets/Instruments/Pluck1/C1.mp3'),
      C2: require('../../Assets/Instruments/Pluck1/C2.mp3'),
      C3: require('../../Assets/Instruments/Pluck1/C3.mp3'),
      C4: require('../../Assets/Instruments/Pluck1/C4.mp3'),
    }).toMaster();
    this.pluck2 = new Tone.Sampler({
      C1: require('../../Assets/Instruments/Pluck2/C1.mp3'),
      C2: require('../../Assets/Instruments/Pluck2/C2.mp3'),
      C3: require('../../Assets/Instruments/Pluck2/C3.mp3'),
      C4: require('../../Assets/Instruments/Pluck2/C4.mp3'),
    }).toMaster();
    this.acid = new Tone.Sampler({
      E4: require('../../Assets/Instruments/Acid/C1.mp3'),
    }).toMaster();
    this.keyToNote = {
      36: 'C1',
      37: 'C#1',
      38: 'D1',
      39: 'D#1',
      40: 'E1',
      41: 'F1',
      42: 'F#1',
      43: 'G1',
      44: 'G#1',
      45: 'A1',
      46: 'A#1',
      47: 'B1',
      48: 'C2',
      49: 'C#2',
      50: 'D2',
      51: 'D#2',
      52: 'E2',
      53: 'F2',
      54: 'F#2',
      55: 'G2',
      56: 'G#2',
      57: 'A2',
      58: 'A#2',
      59: 'B2',
      60: 'C3',
      61: 'C#3',
      62: 'D3',
      63: 'D#3',
      64: 'E3',
      65: 'F3',
      66: 'F#3',
      67: 'G3',
      68: 'G#3',
      69: 'A3',
      70: 'A#3',
      71: 'B3',
      72: 'C4',
      73: 'C#4',
      74: 'D4',
      75: 'D#4',
      76: 'E4',
      77: 'F4',
      78: 'F#4',
      79: 'G4',
      80: 'G#4',
      81: 'A4',
      82: 'A#4',
      83: 'B4',
      84: 'C5',
    };
    this.test = new Tone.Player({
      url: require(`./../../Assets/Instruments/test.mp3`),
      loop: true,
    }).toMaster();

    this.socket = null;
    this.mySocketId = null;

    this.myLatencyToServer = null;
    this.myLatencies = [];
    this.othersLatencies = [];
    this.timeout = null;
    this.myStartTime = null;
    this.myStartTimeForOthers = null;
  }

  state = {
    midiNotes: [
      { note: 'C1', holdingDown: false },
      { note: 'C#1', holdingDown: false },
      { note: 'D1', holdingDown: false },
      { note: 'D#1', holdingDown: false },
      { note: 'E1', holdingDown: false },
      { note: 'F1', holdingDown: false },
      { note: 'F#1', holdingDown: false },
      { note: 'G1', holdingDown: false },
      { note: 'G#1', holdingDown: false },
      { note: 'A1', holdingDown: false },
      { note: 'A#1', holdingDown: false },
      { note: 'B1', holdingDown: false },
      { note: 'C2', holdingDown: false },
      { note: 'C#2', holdingDown: false },
      { note: 'D2', holdingDown: false },
      { note: 'D#2', holdingDown: false },
      { note: 'E2', holdingDown: false },
      { note: 'F2', holdingDown: false },
      { note: 'F#2', holdingDown: false },
      { note: 'G2', holdingDown: false },
      { note: 'G#2', holdingDown: false },
      { note: 'A2', holdingDown: false },
      { note: 'A#2', holdingDown: false },
      { note: 'B2', holdingDown: false },
      { note: 'C3', holdingDown: false },
      { note: 'C#3', holdingDown: false },
      { note: 'D3', holdingDown: false },
      { note: 'D#3', holdingDown: false },
      { note: 'E3', holdingDown: false },
      { note: 'F3', holdingDown: false },
      { note: 'F#3', holdingDown: false },
      { note: 'G3', holdingDown: false },
      { note: 'G#3', holdingDown: false },
      { note: 'A3', holdingDown: false },
      { note: 'A#3', holdingDown: false },
      { note: 'B3', holdingDown: false },
      { note: 'C4', holdingDown: false },
      { note: 'C#4', holdingDown: false },
      { note: 'D4', holdingDown: false },
      { note: 'D#4', holdingDown: false },
      { note: 'E4', holdingDown: false },
      { note: 'F4', holdingDown: false },
      { note: 'F#4', holdingDown: false },
      { note: 'G4', holdingDown: false },
      { note: 'G#4', holdingDown: false },
      { note: 'A4', holdingDown: false },
      { note: 'A#4', holdingDown: false },
      { note: 'B4', holdingDown: false },
      { note: 'C5', holdingDown: false },
    ],
    note: null,
    myLatency: 0,
    othersLatency: 0,
    whichInstrument: 1,
    activeInstrument: 'Drum Kit',
    allMusicians: null,
    musicianIndex: 0,
  };

  componentDidMount = (props) => {
    this.isMidiSupported();
    this.checkForRoom();
    this.reactToNoteOn();
    this.reactToNoteOff();
    this.measureMyLatency();
    this.measureOthersLatency();
  };

  checkForRoom = () => {
    console.log('First Connection');
    this.socket = io('https://socket-latency.herokuapp.com');
    // this.socket = io('ws://localhost:8080');

    this.socket.emit(
      'join-room',
      window.location.href.substring(window.location.href.indexOf('?') + 1)
    );

    this.socket.on('mySocketId', (mySocketId) => {
      this.mySocketId = mySocketId;
    });

    this.socket.on('user-connected', (musiciansArray) => {
      for (let i = 0; i < musiciansArray.length; i++) {
        if (musiciansArray[i].socketId === this.mySocketId) {
          musiciansArray[i].order = 1;

          array_move(musiciansArray, i, 0);

          this.setState({ musicianIndex: i });
          break;
        }
      }

      this.setState({ allMusicians: musiciansArray });
    });

    this.socket.on('switchedInstrument', (musiciansArray) => {
      for (let i = 0; i < musiciansArray.length; i++) {
        if (musiciansArray[i].socketId === this.mySocketId) {
          musiciansArray[i].order = 1;

          array_move(musiciansArray, i, 0);

          this.setState({ musicianIndex: i });
          break;
        }
      }

      this.setState({ allMusicians: musiciansArray });
    });

    this.socket.on('syncMetro', (transportState) => {
      this.props.playPause(transportState);
    });

    this.socket.on('user-left', (musiciansArray) => {
      for (let i = 0; i < musiciansArray.length; i++) {
        if (musiciansArray[i].socketId === this.mySocketId) {
          musiciansArray[i].order = 1;

          array_move(musiciansArray, i, 0);

          this.setState({ musicianIndex: i });
          break;
        }
      }

      this.setState({ allMusicians: musiciansArray });
    });
  };

  measureMyLatency = () => {
    this.socket.on('pingPls', (myFirstTimeStamp) => {
      this.socket.emit('hereIsMyPing', myFirstTimeStamp);
    });

    this.socket.on('pingToDisplay', (ping) => {
      this.myLatencies.push(ping);
      if (this.myLatencies.length > 100) {
        var sum = 0;
        this.myLatencies.forEach((el) => {
          sum += el;
        });
        sum = sum / this.myLatencies.length;
        var roundedString = sum.toFixed(0);
        var rounded = Number(roundedString);
        this.setState({ myLatency: rounded });
        this.myLatencies = [];
      }
    });
  };

  measureOthersLatency = () => {
    this.socket.on('allTheOtherPings', (otherPing) => {
      this.othersLatencies.push(otherPing);

      if (this.othersLatencies.length > 100) {
        var sum = 0;
        this.othersLatencies.forEach((el) => {
          sum += el;
        });
        sum = sum / this.othersLatencies.length;
        var roundedString = sum.toFixed(0);
        var rounded = Number(roundedString);

        var totalPing = this.state.myLatency + rounded;
        this.othersLatencies = [];
        this.setState({ othersLatency: totalPing });
      }
    });
  };

  isMidiSupported = () => {
    if (navigator.requestMIDIAccess) {
      this.requestMIDIAccess();
    } else {
      console.log('WebMIDI is not supported in this browser.');
    }
  };

  requestMIDIAccess = () => {
    navigator.requestMIDIAccess().then(this.onMIDISuccess, this.onMIDIFailure);
  };

  onMIDIFailure = () => {
    console.log('Could not access your MIDI devices.');
  };

  onMIDISuccess = (midiAccess) => {
    for (var input of midiAccess.inputs.values()) input.onmidimessage = this.getMIDIMessage;
  };

  getMIDIMessage = (event) => {
    switch (event.data[0] & 0xf0) {
      case 0x90:
        if (event.data[2] !== 0) {
          // if velocity != 0, this is a note-on message
          this.noteOn(event.data[1]);
          return;
        }
        break;
      // if velocity == 0, fall thru: it's a note-off.  MIDI's weird, y'all.
      case 0x80:
        this.noteOff(event.data[1]);
        break;
      default:
    }
  };

  emitNote = (note) => {
    this.socket.emit('noteOn', note, this.state.whichInstrument);
  };

  playAndEmit = (instrument, key) => {
    this.playInstrument(this.state.whichInstrument, key, Tone.context.currentTime);
    this.emitNote(key);
  };

  noteOn = (key) => {
    if (typeof this.keyToNote[key] !== 'undefined') {
      this.playInstrument(this.state.whichInstrument, key, Tone.context.currentTime);
      this.emitNote(key);

      let newArr = [...this.state.midiNotes];
      var note = this.keyToNote[key];
      var index = newArr.findIndex((el) => el.note === note);
      newArr[index].holdingDown = true;
      this.setState({ midiNotes: newArr });
    }
  };

  noteOff = (key) => {
    if (typeof this.keyToNote[key] !== 'undefined') {
      let newArr = [...this.state.midiNotes];
      var note = this.keyToNote[key];
      var index = newArr.findIndex((el) => el.note === note);
      newArr[index].holdingDown = false;
      this.setState({ midiNotes: newArr });
    }
  };

  reactToNoteOn = () => {
    this.socket.on('noteOn', (note, instrument) => {
      if (Tone.Transport.state === 'started') {
        this.playInstrumentAbroad(instrument, note, '@8n');
      } else {
        this.playInstrumentAbroad(instrument, note, Tone.context.currentTime);
      }
    });
  };

  reactToNoteOff = () => {
    this.socket.on('noteOff', (note) => {
      alert('hey');
    });
  };

  playInstrument = (instrument, key, time) => {
    if (this.keyToNote[key] || isNaN(key)) {
      if (instrument === 1) {
        this.drums.triggerAttackRelease(isNaN(key) ? key : this.keyToNote[key], '1.7', time);
      } else if (instrument === 2) {
        this.piano1.triggerAttackRelease(isNaN(key) ? key : this.keyToNote[key], '0.5', time, 0.4);
      } else if (instrument === 3) {
        this.piano2.triggerAttackRelease(isNaN(key) ? key : this.keyToNote[key], '0.5', time, 0.5);
      } else if (instrument === 4) {
        this.pluck1.triggerAttackRelease(isNaN(key) ? key : this.keyToNote[key], '0.5', time, 0.5);
      } else if (instrument === 5) {
        this.pluck2.triggerAttackRelease(isNaN(key) ? key : this.keyToNote[key], '1', time, 0.6);
      } else if (instrument === 6) {
        this.acid.triggerAttackRelease(isNaN(key) ? key : this.keyToNote[key], '1', time, 0.6);
      }
    }
  };

  playInstrumentAbroad = (instrument, key, time) => {
    if (this.keyToNote[key] || isNaN(key)) {
      if (instrument === 1) {
        this.drums.triggerAttackRelease(isNaN(key) ? key : this.keyToNote[key], '1.7', time);
      } else if (instrument === 2) {
        this.piano1.triggerAttackRelease(isNaN(key) ? key : this.keyToNote[key], '0.5', time, 0.4);
      } else if (instrument === 3) {
        this.piano2.triggerAttackRelease(isNaN(key) ? key : this.keyToNote[key], '0.5', time, 0.5);
      } else if (instrument === 4) {
        this.pluck1.triggerAttackRelease(isNaN(key) ? key : this.keyToNote[key], '0.5', time, 0.5);
      } else if (instrument === 5) {
        this.pluck2.triggerAttackRelease(isNaN(key) ? key : this.keyToNote[key], '1', time, 0.6);
      } else if (instrument === 6) {
        this.acid.triggerAttackRelease(isNaN(key) ? key : this.keyToNote[key], '1', time, 0.6);
      }
    }
  };

  delayChange = (e, delay, index) => {
    var effectedMusician = this.state.allMusicians[index].socketId;

    this.socket.emit('delayChange', delay, effectedMusician);
  };

  syncMetro = () => {
    this.socket.emit('syncMetroRequest', Tone.Transport.state);
  };

  componentWillUnmount = () => {
    if (this.socket) this.socket.close();
  };

  render() {
    return (
      <Fragment>
        <div className={'polarJamImgDivider'}>
          <img src={polar} alt={'Polarjam logo.'} style={{ width: '50px' }}></img>
        </div>

        <h1
          style={{
            textAlign: 'center',
            marginTop: '30px',
            borderBottom: '4px white solid',
          }}>
          {<span style={{ margin: '30px' }}>Musicians</span>}
        </h1>
        <div className={'recordingHolder'}>
          <Sampler
            midiNotes={this.state.midiNotes}
            note={this.state.note}
            onMousePlay={this.playAndEmit}
            syncMetro={this.syncMetro}
            whichInstrument={this.state.whichInstrument}
          />
          <div className={'musicianWrapper'}>
            {this.state.allMusicians == null || this.state.allMusicians.length === 0 ? (
              <Fragment>
                <div className={'notConnectedToServer'}>
                  <div className={'musicianInstrument'}>
                    <span
                      style={{
                        fontWeight: 'lighter',
                        letterSpacing: '0.05rem',
                        fontFamily: 'Lobster',
                      }}>
                      {this.state.activeInstrument}
                    </span>
                  </div>
                  <SelectBox
                    style={{
                      marginLeft: this.state.allMusicians > 1 ? '20px' : null,
                    }}
                    optionId={'id'}
                    visible={true}
                    switchInstrumentForParent={(instrumentName, instrumentId) => {
                      this.setState({ activeInstrument: instrumentName });
                      this.setState({ whichInstrument: instrumentId }, () => {});
                      this.socket.emit('switchedInstrument', instrumentName, this.socketId);
                    }}
                    whichInstrument={this.state.whichInstrument}></SelectBox>
                  <div className='connectingToServer'>
                    <LoadingSpinner
                      text={'Connecting to Server'}
                      spinnerVariation={2}
                      marginTop={'0px'}
                    />
                  </div>
                </div>
              </Fragment>
            ) : (
              this.state.allMusicians.map((musician, key) => {
                return (
                  <div className={'row'} key={key}>
                    <div style={{ visibility: key === 0 ? 'visible' : 'hidden' }} className={'you'}>
                      You
                    </div>

                    <div className={'musicianName'}>
                      <span
                        style={{
                          fontWeight: 'lighter',
                          letterSpacing: '0.1rem',
                        }}>
                        <span style={{ fontSize: '1.5rem' }}>{musician.name}</span>
                      </span>
                    </div>

                    <div className={'musicianInstrument'}>
                      <span
                        style={{
                          fontWeight: 'lighter',
                          letterSpacing: '0.05rem',
                          fontFamily: 'Lobster',
                        }}>
                        {key === 0
                          ? this.state.activeInstrument
                          : this.state.allMusicians[key].instrument}
                      </span>
                    </div>
                    {key === 0 ? (
                      <SelectBox
                        style={{
                          marginLeft: this.state.allMusicians > 1 ? '20px' : null,
                        }}
                        optionId={`${musician.socketId}`}
                        visible={key === 0 ? true : false}
                        switchInstrumentForParent={(instrumentName, instrumentId) => {
                          this.setState({ activeInstrument: instrumentName });
                          this.setState({ whichInstrument: instrumentId }, () => {});
                          this.socket.emit('switchedInstrument', instrumentName, this.socketId);
                        }}
                        whichInstrument={this.state.whichInstrument}></SelectBox>
                    ) : null}

                    {key === 0 ? null : (
                      <div className={'delay'}>
                        <DiscreteSlider
                          reactToChange={(e, value) => {
                            this.delayChange(e, value, key);
                          }}
                        />
                      </div>
                    )}

                    <hr className={'divider'}></hr>

                    {this.state.allMusicians == null || this.state.allMusicians.length === 1 ? (
                      <div className={'myLatency'}>
                        <div
                          style={{
                            textAlign: 'center',
                          }}>
                          No Latency
                        </div>
                      </div>
                    ) : key === 0 ? (
                      <div className={'myLatency'}>
                        <div
                          style={{
                            textAlign: 'center',
                          }}>
                          No Latency
                        </div>
                      </div>
                    ) : (
                      <div className={'myLatency'}>
                        <div>Latency:</div>
                        <div
                          style={{
                            fontSize: '1rem',
                            fontWeight: 'bolder',
                            minWidth: '60px',
                            marginLeft: '15px',
                          }}>
                          {this.state.othersLatency / 2 + ' ms'}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })
            )}
          </div>
          {/* <h1
            style={{
              width: '100%',
              textAlign: 'center',
              marginTop: '100px',
              borderBottom: '4px white solid',
            }}>
            {<span style={{ margin: '30px' }}>Microphone</span>}
          </h1>
          <Microphone /> */}
        </div>
      </Fragment>
    );
  }
}

export default Recording;
