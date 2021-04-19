import React, { Component, Fragment } from 'react';
import './InstrumentSection.css';
import Sampler from '../Main/Recording/Sampler/Sampler';
import Tone from 'tone';

class InstrumentSection extends Component {
  constructor(props) {
    super(props);
    this.filledMidiArray = [];
    this.piano1 = new Tone.Sampler({
      C1: require('../Assets/Instruments/Piano2/C1.mp3'),
      C2: require('../Assets/Instruments/Piano2/C2.mp3'),
      C3: require('../Assets/Instruments/Piano2/C3.mp3'),
      C4: require('../Assets/Instruments/Piano2/C4.mp3'),
    }).toMaster();
    this.piano2 = new Tone.Sampler({
      C1: require('../Assets/Instruments/Piano1/C1.mp3'),
      C2: require('../Assets/Instruments/Piano1/C2.mp3'),
      C3: require('../Assets/Instruments/Piano1/C3.mp3'),
      C4: require('../Assets/Instruments/Piano1/C4.mp3'),
    }).toMaster();
    this.drums = new Tone.Sampler({
      C2: require('../Assets/Instruments/Drums/kick.mp3'),
      'C#2': require('../Assets/Instruments/Drums/rim.mp3'),
      D2: require('../Assets/Instruments/Drums/snare.mp3'),
      'D#2': require('../Assets/Instruments/Drums/clap.mp3'),
      E2: require('../Assets/Instruments/Drums/snare2.mp3'),
      F2: require('../Assets/Instruments/Drums/kick2.mp3'),
      'F#2': require('../Assets/Instruments/Drums/tom.mp3'),
      G2: require('../Assets/Instruments/Drums/hi.mp3'),
      'G#2': require('../Assets/Instruments/Drums/snap.mp3'),
      A2: require('../Assets/Instruments/Drums/tom2.mp3'),
      'A#2': require('../Assets/Instruments/Drums/hiOpen.mp3'),
      B2: require('../Assets/Instruments/Drums/tomSpace.mp3'),
      C3: require('../Assets/Instruments/Drums/clapMeta.mp3'),
      'C#3': require('../Assets/Instruments/Drums/crash.mp3'),
      D3: require('../Assets/Instruments/Drums/swell.mp3'),
      'D#3': require('../Assets/Instruments/Drums/ride.mp3'),
      E3: require('../Assets/Instruments/Drums/kick.mp3'),
    }).toMaster();
    this.pluck1 = new Tone.Sampler({
      C1: require('../Assets/Instruments/Pluck1/C1.mp3'),
      C2: require('../Assets/Instruments/Pluck1/C2.mp3'),
      C3: require('../Assets/Instruments/Pluck1/C3.mp3'),
      C4: require('../Assets/Instruments/Pluck1/C4.mp3'),
    }).toMaster();
    this.pluck2 = new Tone.Sampler({
      C1: require('../Assets/Instruments/Pluck2/C1.mp3'),
      C2: require('../Assets/Instruments/Pluck2/C2.mp3'),
      C3: require('../Assets/Instruments/Pluck2/C3.mp3'),
      C4: require('../Assets/Instruments/Pluck2/C4.mp3'),
    }).toMaster();
    this.acid = new Tone.Sampler({
      E4: require('../Assets/Instruments/Acid/C1.mp3'),
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

    this.socket = null;

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
    whichInstrument: 2,
    activeInstrument: 'Drum Kit',
    allMusicians: null,
    musicianIndex: 0,
    delay: '@8n',
  };

  componentDidMount = (props) => {
    this.isMidiSupported();

    this.props.socket.on('serverSideSocketNoteOn', (note, instrument, socketId) => {
      this.playInstrumentRemote(1, note, Tone.context.currentTime);
    });

    this.props.socket.on('clientSideSocketNoteOn', (note, instrument, socketId) => {
      if (Tone.Transport.state === 'started') {
        this.playInstrumentRemote(1, note, '@8n');
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

  noteOn = (key) => {
    if (typeof this.keyToNote[key] !== 'undefined') {
      this.playInstrument(this.state.whichInstrument, key, Tone.context.currentTime);
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

  playInstrument = (instrument, key, time) => {
    if (this.keyToNote[key] || isNaN(key)) {
      if (instrument === 1) {
        this.drums.triggerAttackRelease(isNaN(key) ? key : this.keyToNote[key], '1.7', 0);
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

    this.handleEmitNote(key);
  };

  playInstrumentRemote = (instrument, key, time) => {
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

  handleEmitNote = (note) => {
    if (this.props.roomFull) {
      if (this.props.approach === 1) {
        this.emitNoteServerSideSocket(note);
      } else if (this.props.approach === 2) {
        this.emitNoteClientSideSocket(note);
      }
    }
  };

  //Server Side with Websocket
  emitNoteServerSideSocket = (note) => {
    this.props.socket.emit(
      'serverSideSocketNoteOn',
      note,
      this.state.whichInstrument,
      this.props.socketId
    );
  };
  //Client Side with Websocket
  emitNoteClientSideSocket = (note) => {
    this.props.socket.emit(
      'clientSideSocketNoteOn',
      note,
      this.state.whichInstrument,
      this.props.socketId
    );
  };

  render() {
    return (
      <Fragment>
        <div className={'recordingHolder'}>
          <Sampler
            midiNotes={this.state.midiNotes}
            note={this.state.note}
            onMousePlay={this.playInstrument}
            syncMetro={this.syncMetro}
            whichInstrument={this.state.whichInstrument}
          />
        </div>
      </Fragment>
    );
  }
}

export default InstrumentSection;
