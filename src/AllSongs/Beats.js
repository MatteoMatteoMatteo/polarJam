import React, { Component } from 'react';
import './AllSongs.css';
import AudioFilesHandler from '../Main/AudioFilesHandler/AudioFilesHandler';
import { getCurrentProfile } from '../Redux/Actions/profile';
import { connect } from 'react-redux';

class Beats extends Component {
  constructor(props) {
    super(props);

    this.sectionStatus = [];
    this.categoryPreselected = [];
    this.categoryLoop = [];

    this.loopNames = ['Kick', 'Snare', 'HiHat', 'Perc', 'Top', 'Full'];

    this.songSetUp = [
      {
        sectionInfo: { id: 0, active: true },
        loopInfo: [
          { selected: true, whichLoop: 1 },
          { selected: true, whichLoop: 1 },
          { selected: true, whichLoop: 1 },
          { selected: false, whichLoop: 3 },
          { selected: false, whichLoop: 1 },
          { selected: true, whichLoop: 2 },
        ],
      },
      {
        sectionInfo: { id: 1, active: false },
        loopInfo: [
          { selected: false, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
        ],
      },
      {
        sectionInfo: { id: 2, active: false },
        loopInfo: [
          { selected: false, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
        ],
      },
      {
        sectionInfo: { id: 3, active: false },
        loopInfo: [
          { selected: false, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
        ],
      },
      {
        sectionInfo: { id: 4, active: false },
        loopInfo: [
          { selected: false, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
        ],
      },
    ];

    this.startItUp = () => {
      for (let i = 0; i < this.songSetUp.length; i++) {
        this.sectionStatus.push(this.songSetUp[i].sectionInfo);

        this.categoryPreselected.push([
          this.songSetUp[i].loopInfo[0].selected,
          this.songSetUp[i].loopInfo[1].selected,
          this.songSetUp[i].loopInfo[2].selected,
          this.songSetUp[i].loopInfo[3].selected,
          this.songSetUp[i].loopInfo[4].selected,
          this.songSetUp[i].loopInfo[5].selected,
        ]);

        this.categoryLoop.push([
          this.songSetUp[i].loopInfo[0].whichLoop,
          this.songSetUp[i].loopInfo[1].whichLoop,
          this.songSetUp[i].loopInfo[2].whichLoop,
          this.songSetUp[i].loopInfo[3].whichLoop,
          this.songSetUp[i].loopInfo[4].whichLoop,
          this.songSetUp[i].loopInfo[5].whichLoop,
        ]);
      }
    };

    this.startItUp();
    // this.loopThroughProps();

    this.state = {
      metronomeState: false,
      whichGenre: 'drums',
      genreName: 'Beats',
      songNumber: 4,
      bpm: '120',
      volume: '0',
      categorySize: [5, 7, 5, 8, 5, 5],

      categoryLoop: this.categoryLoop,

      categoryPreselected: this.categoryPreselected,

      sectionStatus: this.sectionStatus,

      colorTheme: {
        bgColor: '#B9CDE3',
        sectionColor: '#EACAD5',
        controlColor: '#2224337c',
        hoverColor: '#B9CDE3',
      },
    };
  }

  render() {
    return (
      <AudioFilesHandler
        metronomeState={this.state.metronomeState}
        location={this.props.location}
        songSetUp={this.songSetUp}
        songNumber={this.state.songNumber}
        colorTheme={this.state.colorTheme}
        volume={this.state.volume}
        whichGenre={this.state.whichGenre}
        genreName={this.state.genreName}
        bpm={this.state.bpm}
        categorySize={this.state.categorySize}
        categoryLoop={this.state.categoryLoop}
        categoryPreselected={this.state.categoryPreselected}
        sectionStatus={this.state.sectionStatus}
        loopNames={this.loopNames}
      />
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(Beats);
