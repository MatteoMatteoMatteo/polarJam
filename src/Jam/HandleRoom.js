import React, { Component } from 'react';
import './HandleRoom.css';

class HandleRoom extends Component {
  constructor(props) {
    super(props);

    this.socket = this.props.socket;
  }

  state = {
    allMusicians: null,
    roomFull: false,
  };

  componentDidMount = () => {
    this.checkForRoom();
  };

  checkForRoom = () => {
    console.log('First Connection');

    this.socket.emit(
      'join-room',
      window.location.href.substring(window.location.href.indexOf('?') + 1)
    );

    this.socket.on('mySocketId', (id) => {
      this.props.giveId(id);
    });

    this.socket.on('mySocketId', (mySocketId) => {
      this.mySocketId = mySocketId;
      console.log(mySocketId);
    });

    this.socket.on('user-connected', (musiciansArray) => {
      if (musiciansArray.length > 1) {
        this.setState({ roomFull: true });
        this.props.roomFull(true);
      }

      this.setState({ allMusicians: musiciansArray });
      this.props.allMusicians(this.state.allMusicians);
    });

    this.socket.on('switchedInstrument', (musiciansArray) => {
      for (let i = 0; i < musiciansArray.length; i++) {
        if (musiciansArray[i].socketId === this.mySocketId) {
          musiciansArray[i].order = 1;

          this.setState({ musicianIndex: i });
          break;
        }
      }

      this.setState({ allMusicians: musiciansArray });
    });

    this.socket.on('user-left', (musiciansArray) => {
      this.setState({ roomFull: false });
      this.props.roomFull(false);
      this.setState({ allMusicians: musiciansArray });
    });
  };

  componentWillUnmount = () => {
    if (this.socket) this.socket.close();
  };

  render() {
    return (
      <>
        {this.state.roomFull && this.props.approach != 3 ? (
          <div className={'fullRoom'}>You are connected to another musician</div>
        ) : (
          this.props.approach != 3 && (
            <div className={'emptyRoom'}>You are not connected to another musician</div>
          )
        )}
        {!this.state.roomFull && this.props.approach === 3 && (
          <div className={'emptyRoom'}>You are not connected to another musician</div>
        )}
        {/* <div class={'sendAudioButton'}>Send Test Audio</div>{' '} */}
      </>
    );
  }
}

export default HandleRoom;
