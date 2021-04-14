import React, { Component } from 'react';
import Tone from 'tone';
import StudioControl from '../StudioControl/StudioControl';
import SongInfo from '../../Main/SongInfo/SongInfo';
import LoadingSpinner from '../../UseComponents/LoadingSpinner/LoadingSpinner';
import { Transport } from 'tone';

class AudioFilesHandler extends Component {
  constructor(props) {
    super(props);
    this.allLoops = [];
    this.checkBufferLoad = null;
    this.fx = {
      eq: new Tone.EQ3([0], [0], [0]),
      delay: new Tone.PingPongDelay('6n', 0.2),
    };

    this.metronome = new Tone.Player({
      url: require(`./../../Assets/Instruments/metronome.mp3`),
      loop: true,
    }).toMaster();

    this.loop = false;
    this.fadeOut = 1;
  }

  state = {
    whichGenre: this.props.whichGenre,

    genreName: this.props.genreName,

    songNumber: this.props.songNumber,

    bpm: this.props.bpm,

    volume: this.props.volume,

    categorySize: this.props.categorySize,

    categoryLoop: this.props.categoryLoop,

    categoryPreselected: this.props.categoryPreselected,

    sectionStatus: this.props.sectionStatus,

    colorTheme: this.props.colorTheme,

    metronome: this.props.metronomeState,

    tempoSliderValue: this.props.bpm,

    audioLoaded: false,
  };

  componentDidMount = () => {
    this.firstTimeFillAllLoops();
    this.preselectLoops();
    this.adjustFx();
    // this.setSessionStorage();
    this.setVolume();

    this.metronome.playbackRate = 2;
  };

  handleMetronome = (state) => {
    if (Transport.state === 'started' && state) {
      this.metronome.playbackRate = this.state.tempoSliderValue / 120;
      this.metronome.start(
        undefined,
        Transport.toSeconds(Transport.position) * (this.state.tempoSliderValue / 120)
      );
    } else if (Transport.state === 'started' && !state) {
      this.metronome.stop();
    }
    this.setState({ metronome: state }, () => {});
  };

  handleTempoSliderValue = (value) => {
    this.setState({ tempoSliderValue: value });
  };

  firstTimeFillAllLoops = () => {
    for (let h = 0; h < 1; h++) {
      this.allLoops.push([[], [], [], [], [], []]);

      for (let i = 1; i <= this.props.categorySize[0]; i++) {
        this.allLoops[h][0].push({
          loop: new Tone.Player({
            url: require(`./../../Assets/Loops/${this.props.whichGenre}/loops/category1/loop${i}.mp3`),
            loop: this.loop,
          }).chain(this.fx.eq, this.fx.delay, Tone.Master),
          id: 'section' + (h + 1) + 'drum',
          fadeOut: this.fadeOut,
          isItPlaying: false,
          wasItTriggered: false,
        });
      }
      for (let i = 1; i <= this.props.categorySize[1]; i++) {
        this.allLoops[h][1].push({
          loop: new Tone.Player({
            url: require(`./../../Assets/Loops/${this.props.whichGenre}/loops/category2/loop${i}.mp3`),
            loop: this.loop,
          }).chain(this.fx.eq, this.fx.delay, Tone.Master),
          id: 'section' + (h + 1) + 'chord',
          fadeOut: this.fadeOut,
          isItPlaying: false,
          wasItTriggered: false,
        });
      }
      for (let i = 1; i <= this.props.categorySize[2]; i++) {
        this.allLoops[h][2].push({
          loop: new Tone.Player({
            url: require(`./../../Assets/Loops/${this.props.whichGenre}/loops/category3/loop${i}.mp3`),
            loop: this.loop,
          }).chain(this.fx.eq, this.fx.delay, Tone.Master),
          id: 'section' + (h + 1) + 'melody',
          fadeOut: this.fadeOut,
          isItPlaying: false,
          wasItTriggered: false,
        });
      }
      for (let i = 1; i <= this.props.categorySize[3]; i++) {
        this.allLoops[h][3].push({
          loop: new Tone.Player({
            url: require(`./../../Assets/Loops/${this.props.whichGenre}/loops/category4/loop${i}.mp3`),
            loop: this.loop,
          }).chain(this.fx.eq, this.fx.delay, Tone.Master),
          id: 'section' + (h + 1) + 'bass',
          fadeOut: this.fadeOut,
          isItPlaying: false,
          wasItTriggered: false,
        });
      }
      for (let i = 1; i <= this.props.categorySize[4]; i++) {
        this.allLoops[h][4].push({
          loop: new Tone.Player({
            url: require(`./../../Assets/Loops/${this.props.whichGenre}/loops/category5/loop${i}.mp3`),
            loop: this.loop,
          }).chain(this.fx.eq, this.fx.delay, Tone.Master),
          id: 'section' + (h + 1) + 'vocal',
          fadeOut: this.fadeOut,
          isItPlaying: false,
          wasItTriggered: false,
        });
      }
      for (let i = 1; i <= this.props.categorySize[5]; i++) {
        this.allLoops[h][5].push({
          loop: new Tone.Player({
            url: require(`./../../Assets/Loops/${this.props.whichGenre}/loops/category6/loop${i}.mp3`),
            loop: this.loop,
          }).chain(this.fx.eq, this.fx.delay, Tone.Master),
          id: 'section' + (h + 1) + 'fx',
          fadeOut: this.fadeOut,
          isItPlaying: false,
          wasItTriggered: false,
        });
      }
    }

    this.checkBufferLoad = setInterval(() => {
      this.checkBuffer();
    }, 500);
  };

  fillAdjustRest = () => {
    //Fill Loops
    for (let h = 1; h < 5; h++) {
      this.allLoops.push([[], [], [], [], [], []]);

      for (let i = 1; i <= this.props.categorySize[0]; i++) {
        this.allLoops[h][0].push({
          loop: new Tone.Player({
            url: require(`./../../Assets/Loops/${this.props.whichGenre}/loops/category1/loop${i}.mp3`),
            loop: this.loop,
          }).chain(this.fx.eq, this.fx.delay, Tone.Master),
          id: 'section' + (h + 1) + 'drum',
          fadeOut: this.fadeOut,
          isItPlaying: false,
          wasItTriggered: false,
        });
      }
      for (let i = 1; i <= this.props.categorySize[1]; i++) {
        this.allLoops[h][1].push({
          loop: new Tone.Player({
            url: require(`./../../Assets/Loops/${this.props.whichGenre}/loops/category2/loop${i}.mp3`),
            loop: this.loop,
          }).chain(this.fx.eq, this.fx.delay, Tone.Master),
          id: 'section' + (h + 1) + 'chord',
          fadeOut: this.fadeOut,
          isItPlaying: false,
          wasItTriggered: false,
        });
      }
      for (let i = 1; i <= this.props.categorySize[2]; i++) {
        this.allLoops[h][2].push({
          loop: new Tone.Player({
            url: require(`./../../Assets/Loops/${this.props.whichGenre}/loops/category3/loop${i}.mp3`),
            loop: this.loop,
          }).chain(this.fx.eq, this.fx.delay, Tone.Master),
          id: 'section' + (h + 1) + 'melody',
          fadeOut: this.fadeOut,
          isItPlaying: false,
          wasItTriggered: false,
        });
      }
      for (let i = 1; i <= this.props.categorySize[3]; i++) {
        this.allLoops[h][3].push({
          loop: new Tone.Player({
            url: require(`./../../Assets/Loops/${this.props.whichGenre}/loops/category4/loop${i}.mp3`),
            loop: this.loop,
          }).chain(this.fx.eq, this.fx.delay, Tone.Master),
          id: 'section' + (h + 1) + 'bass',
          fadeOut: this.fadeOut,
          isItPlaying: false,
          wasItTriggered: false,
        });
      }
      for (let i = 1; i <= this.props.categorySize[4]; i++) {
        this.allLoops[h][4].push({
          loop: new Tone.Player({
            url: require(`./../../Assets/Loops/${this.props.whichGenre}/loops/category5/loop${i}.mp3`),
            loop: this.loop,
          }).chain(this.fx.eq, this.fx.delay, Tone.Master),
          id: 'section' + (h + 1) + 'vocal',
          fadeOut: this.fadeOut,
          isItPlaying: false,
          wasItTriggered: false,
        });
      }
      for (let i = 1; i <= this.props.categorySize[5]; i++) {
        this.allLoops[h][5].push({
          loop: new Tone.Player({
            url: require(`./../../Assets/Loops/${this.props.whichGenre}/loops/category6/loop${i}.mp3`),
            loop: this.loop,
          }).chain(this.fx.eq, this.fx.delay, Tone.Master),
          id: 'section' + (h + 1) + 'fx',
          fadeOut: this.fadeOut,
          isItPlaying: false,
          wasItTriggered: false,
        });
      }
    }
    //Preselect Loops
    for (let h = 1; h < 5; h++) {
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < this.props.categorySize[i]; j++) {
          if (j + 1 === this.props.songSetUp[h].loopInfo[i].whichLoop)
            this.allLoops[h][i][j].wasItTriggered = this.props.songSetUp[h].loopInfo[i].selected;
        }
      }
    }
    //Adjust Volume
    for (let h = 1; h < 5; h++) {
      for (let i = 0; i < this.allLoops[h].length; i++) {
        for (let j = 0; j < this.allLoops[h][i].length; j++) {
          this.allLoops[h][i][j].loop.volume.value = this.props.volume;
        }
      }
    }
  };

  checkBuffer = () => {
    if (this.state.audioLoaded) {
      clearInterval(this.checkBufferLoad);
      this.fillAdjustRest();
      return;
    }

    for (let i = 0; i < 1; i++) {
      for (let j = 0; j < this.allLoops[i].length; j++) {
        for (let k = 0; k < this.allLoops[i][j].length; k++) {
          if (!this.allLoops[i][j][k].loop.loaded) return;
        }
      }
    }
    this.setState({ audioLoaded: true });
  };

  preselectLoops = () => {
    for (let h = 0; h < 1; h++) {
      for (let i = 0; i < 6; i++) {
        for (let j = 0; j < this.props.categorySize[i]; j++) {
          if (j + 1 === this.props.songSetUp[h].loopInfo[i].whichLoop)
            this.allLoops[h][i][j].wasItTriggered = this.props.songSetUp[h].loopInfo[i].selected;
        }
      }
    }
  };

  setSessionStorage = () => {
    sessionStorage.clear();

    for (let h = 0; h < this.state.categoryPreselected.length; h++) {
      for (let i = 0; i < this.state.categoryPreselected[h].length; i++) {
        if (this.state.categoryPreselected[h][i] === true) {
          sessionStorage.setItem(this.state.whichGenre + this.allLoops[h][i][0].id + 'Selected', 1);
          sessionStorage.setItem(
            this.state.whichGenre + this.allLoops[h][i][0].id + 'Loop',
            this.state.categoryLoop[h][i]
          );
        }
      }
    }
  };

  setVolume = () => {
    for (let h = 0; h < 1; h++) {
      for (let i = 0; i < this.allLoops[h].length; i++) {
        for (let j = 0; j < this.allLoops[h][i].length; j++) {
          this.allLoops[h][i][j].loop.volume.value = this.props.volume;
        }
      }
    }
  };

  adjustFx = () => {
    this.fx.delay.wet.value = 0;
  };

  getColorTheme = (bgColor, sectionColor, controlColor, hoverColor) => {
    this.setState((prevState) => {
      let colorTheme = Object.assign({}, prevState.colorTheme);
      colorTheme.bgColor = bgColor;
      colorTheme.sectionColor = sectionColor;
      colorTheme.controlColor = controlColor;
      colorTheme.hoverColor = hoverColor;
      return { colorTheme };
    });
  };

  //---------------------------------Add & Remove Sections----------------------------------
  add = (data) => {
    this.allLoops.push([[], [], [], [], [], []]);
    this.refillLoop();

    this.setState((prevState) => ({
      categoryLoop: [...prevState.categoryLoop, this.props.categoryLoop[this.allLoops.length - 1]],
    }));

    this.setState((prevState) => ({
      categoryPreselected: [
        ...prevState.categoryPreselected,
        this.props.categoryPreselected[this.allLoops.length - 1],
      ],
    }));

    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < this.props.categorySize[i]; j++) {
        if (j + 1 === this.props.songSetUp[this.allLoops.length - 1].loopInfo[i].whichLoop)
          this.allLoops[this.allLoops.length - 1][i][j].wasItTriggered = this.props.songSetUp[
            this.allLoops.length - 1
          ].loopInfo[i].selected;
      }
    }
  };

  refillLoop = () => {
    for (let h = 0; h < this.allLoops.length; h++) {
      if (this.allLoops[h][0].length === 0) {
        for (let i = 1; i <= this.props.categorySize[0]; i++) {
          this.allLoops[h][0].push({
            loop: new Tone.Player({
              url: require(`./../../Assets/Loops/${this.props.whichGenre}/loops/category1/loop${i}.mp3`),
              loop: this.loop,
            }).chain(this.fx.eq, this.fx.delay, Tone.Master),
            id: 'section' + (h + 1) + 'drum',
            fadeOut: this.fadeOut,
            isItPlaying: false,
            wasItTriggered: false,
          });
        }
        for (let i = 1; i <= this.props.categorySize[1]; i++) {
          this.allLoops[h][1].push({
            loop: new Tone.Player({
              url: require(`./../../Assets/Loops/${this.props.whichGenre}/loops/category2/loop${i}.mp3`),
              loop: this.loop,
            }).chain(this.fx.eq, this.fx.delay, Tone.Master),
            id: 'section' + (h + 1) + 'chord',
            fadeOut: this.fadeOut,
            isItPlaying: false,
            wasItTriggered: false,
          });
        }
        for (let i = 1; i <= this.props.categorySize[2]; i++) {
          this.allLoops[h][2].push({
            loop: new Tone.Player({
              url: require(`./../../Assets/Loops/${this.props.whichGenre}/loops/category3/loop${i}.mp3`),
              loop: this.loop,
            }).chain(this.fx.eq, this.fx.delay, Tone.Master),
            id: 'section' + (h + 1) + 'melody',
            fadeOut: this.fadeOut,
            isItPlaying: false,
            wasItTriggered: false,
          });
        }
        for (let i = 1; i <= this.props.categorySize[3]; i++) {
          this.allLoops[h][3].push({
            loop: new Tone.Player({
              url: require(`./../../Assets/Loops/${this.props.whichGenre}/loops/category4/loop${i}.mp3`),
              loop: this.loop,
            }).chain(this.fx.eq, this.fx.delay, Tone.Master),
            id: 'section' + (h + 1) + 'bass',
            fadeOut: this.fadeOut,
            isItPlaying: false,
            wasItTriggered: false,
          });
        }
        for (let i = 1; i <= this.props.categorySize[4]; i++) {
          this.allLoops[h][4].push({
            loop: new Tone.Player({
              url: require(`./../../Assets/Loops/${this.props.whichGenre}/loops/category5/loop${i}.mp3`),
              loop: this.loop,
            }).chain(this.fx.eq, this.fx.delay, Tone.Master),
            id: 'section' + (h + 1) + 'vocal',
            fadeOut: this.fadeOut,
            isItPlaying: false,
            wasItTriggered: false,
          });
        }
        for (let i = 1; i <= this.props.categorySize[5]; i++) {
          this.allLoops[h][5].push({
            loop: new Tone.Player({
              url: require(`./../../Assets/Loops/${this.props.whichGenre}/loops/category6/loop${i}.mp3`),
              loop: this.loop,
            }).chain(this.fx.eq, this.fx.delay, Tone.Master),
            id: 'section' + (h + 1) + 'fx',
            fadeOut: this.fadeOut,
            isItPlaying: false,
            wasItTriggered: false,
          });
        }
      }
    }
  };

  remove = (data) => {
    this.allLoops.pop();

    const newCategoryLoop = [...this.state.categoryLoop];
    newCategoryLoop.pop();
    this.setState({ categoryLoop: newCategoryLoop });

    const newCategoryPreselected = [...this.state.categoryPreselected];
    newCategoryPreselected.pop();
    this.setState({ categoryPreselected: newCategoryPreselected });

    this.setState({ sectionStatus: data });
  };

  render() {
    return this.state.audioLoaded ? (
      <div className={'studioWrapper'} initial='initial' animate='animate' exit={{ opacity: 0 }}>
        <SongInfo
          metronomeHandle={this.handleMetronome}
          metronomeOnOff={this.state.metronome}
          colorThemeHandler={this.getColorTheme}
          style={{ backgroundColor: '#acb1c5ad' }}
          genre={this.state.genreName}
          sections={this.state.sections}
          songNumber={this.state.songNumber}
          add={(data) => {
            this.add(data);
          }}
          remove={(data) => {
            this.remove(data);
          }}
          sectionStatus={this.state.sectionStatus}
          allLoops={this.allLoops}
        />
        <StudioControl
          tempoSliderValue={this.handleTempoSliderValue}
          metronome={{ loop: this.metronome, state: this.state.metronome }}
          location={this.props.location}
          allLoops={this.allLoops}
          colorTheme={this.state.colorTheme}
          volume={this.state.volume}
          bpm={this.state.bpm}
          fx={this.fx}
          categoryLoop={this.state.categoryLoop}
          categorySize={this.state.categorySize}
          whichGenre={this.state.whichGenre}
          categoryPreselected={this.state.categoryPreselected}
          sectionStatus={this.state.sectionStatus}
          loopNames={this.props.loopNames}
        />
      </div>
    ) : (
      <LoadingSpinner marginTop={'80px'} spinnerVariation={3} text={'Sounds are getting ready!'} />
    );
  }
}

export default AudioFilesHandler;
