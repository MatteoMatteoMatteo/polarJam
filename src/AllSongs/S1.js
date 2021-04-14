import React, { Component } from "react";
import "./AllSongs.css";
import AudioFilesHandler from "../Main/AudioFilesHandler/AudioFilesHandler";
import { getCurrentProfile } from "../Redux/Actions/profile";
import { connect } from "react-redux";

class S1 extends Component {
  constructor(props) {
    super(props);

    this.loopNames = ["Drum", "Chord", "Melody", "Bass", "Vocal", "Extra"];

    this.sectionStatus = [];
    this.categoryPreselected = [];
    this.categoryLoop = [];

    this.songSetUp = [
      {
        sectionInfo: { id: 0, active: true },
        loopInfo: [
          { selected: false, whichLoop: 1 },
          { selected: true, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
          { selected: true, whichLoop: 1 },
        ],
      },
      {
        sectionInfo: { id: 1, active: false },
        loopInfo: [
          { selected: false, whichLoop: 1 },
          { selected: true, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
          { selected: true, whichLoop: 1 },
          { selected: true, whichLoop: 1 },
        ],
      },
      {
        sectionInfo: { id: 2, active: false },
        loopInfo: [
          { selected: true, whichLoop: 1 },
          { selected: true, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
          { selected: true, whichLoop: 1 },
          { selected: true, whichLoop: 2 },
          { selected: true, whichLoop: 1 },
        ],
      },
      {
        sectionInfo: { id: 3, active: false },
        loopInfo: [
          { selected: true, whichLoop: 3 },
          { selected: true, whichLoop: 1 },
          { selected: false, whichLoop: 1 },
          { selected: true, whichLoop: 3 },
          { selected: true, whichLoop: 3 },
          { selected: true, whichLoop: 1 },
        ],
      },
      {
        sectionInfo: { id: 4, active: false },
        loopInfo: [
          { selected: true, whichLoop: 3 },
          { selected: false, whichLoop: 1 },
          { selected: true, whichLoop: 2 },
          { selected: true, whichLoop: 3 },
          { selected: false, whichLoop: 3 },
          { selected: true, whichLoop: 1 },
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

    this.loopThroughProps = () => {
      if (this.props.location.state !== null && this.props.location.state !== undefined) {
        for (let i = 1; i < this.props.location.state.id.selectedLoops.length; i++) {
          this.sectionStatus.push({ id: i, active: false });
          this.categoryLoop.push([
            this.props.location.state == null
              ? 1
              : parseInt(this.props.location.state.id.loopNumbers[i].drum),
            this.props.location.state == null
              ? 1
              : parseInt(this.props.location.state.id.loopNumbers[i].chord),
            this.props.location.state == null
              ? 1
              : parseInt(this.props.location.state.id.loopNumbers[i].melody),
            this.props.location.state == null
              ? 1
              : parseInt(this.props.location.state.id.loopNumbers[i].bass),
            this.props.location.state == null
              ? 1
              : parseInt(this.props.location.state.id.loopNumbers[i].vocal),
            this.props.location.state == null
              ? 1
              : parseInt(this.props.location.state.id.loopNumbers[i].fx),
          ]);
          this.categoryPreselected.push([
            this.props.location.state == null
              ? false
              : this.props.location.state.id.selectedLoops[i].drum,
            this.props.location.state == null
              ? false
              : this.props.location.state.id.selectedLoops[i].chord,
            this.props.location.state == null
              ? false
              : this.props.location.state.id.selectedLoops[i].melody,
            this.props.location.state == null
              ? false
              : this.props.location.state.id.selectedLoops[i].bass,
            this.props.location.state == null
              ? false
              : this.props.location.state.id.selectedLoops[i].vocal,
            this.props.location.state == null
              ? false
              : this.props.location.state.id.selectedLoops[i].fx,
          ]);
        }
      }
    };

    this.startItUp();
    // this.loopThroughProps();

    this.state = {
      metronomeState: false,
      whichGenre: "s1",
      genreName: "Pop",
      songNumber: 3,
      bpm: "100",
      volume: "-5",
      categorySize: [4, 3, 2, 3, 3, 1],

      categoryLoop: this.categoryLoop,

      categoryPreselected: this.categoryPreselected,

      sectionStatus: this.sectionStatus,

      colorTheme: {
        bgColor: "#B9CDE3",
        sectionColor: "#EACAD5",
        controlColor: "#2224337c",
        hoverColor: "#B9CDE3",
      },
    };
  }

  render() {
    return (
      <AudioFilesHandler
        location={this.props.location}
        loopNames={this.loopNames}
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
      />
    );
  }
}

const mapStateToProps = (state) => ({
  profile: state.profile,
});

export default connect(mapStateToProps, { getCurrentProfile })(S1);
