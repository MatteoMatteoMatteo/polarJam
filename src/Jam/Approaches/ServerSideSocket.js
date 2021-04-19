import React, { useEffect, useState } from 'react';
import Tone from 'tone';

export default function ServerSideSocket({ socket, playNoteFromServerSideSocket }) {
  const [myLatency, setMyLatency] = useState(0);
  const [othersLatency, setOtheryLatency] = useState(0);
  useEffect(() => {
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

  return <></>;
}
