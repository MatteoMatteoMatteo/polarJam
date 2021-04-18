import React, { useEffect, useState } from 'react';
import Tone from 'tone';

export default function ServerSideSocket({ socket }) {
  const [myLatency, setMyLatency] = useState(0);
  const [othersLatency, setOtheryLatency] = useState(0);
  useEffect(() => {
    this.reactToNoteOn();
    measureMyLatency();
    measureOthersLatency();
  }, []);

  const measureMyLatency = () => {
    socket.on('pingPls', (myFirstTimeStamp) => {
      socket.emit('hereIsMyPing', myFirstTimeStamp);
    });

    socket.on('pingToDisplay', (ping) => {
      setMyLatency(ping);
    });
  };

  const measureOthersLatency = () => {
    socket.on('allTheOtherPings', (othersPing) => {
      setOtheryLatency(othersPing);
    });
  };

  const reactToNoteOn = () => {
    this.socket.on('noteOn', (note, instrument) => {
      if (Tone.Transport.state === 'started') {
      }
    });
  };
  return <></>;
}
