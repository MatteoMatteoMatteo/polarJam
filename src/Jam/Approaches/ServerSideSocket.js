import React, { useEffect, useState } from 'react';
import './ServerSideSocket.css';

export default function ServerSideSocket({ socket, roomFull }) {
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

  return (
    <div className={'latencyHolder'}>
      {/* {roomFull && (
        <div className={'myLatencyHolder'}>
          <div style={{ marginRight: '40px' }}>Your latency to server:</div>
          <div style={{ minWidth: '50px' }}>{myLatency} ms</div>
        </div>
      )}
      {roomFull && (
        <div className={'otherLatencyHolder'}>
          <div style={{ marginRight: '40px' }}>Other musician's latency to server:</div>
          <div style={{ minWidth: '50px' }}>{othersLatency} ms</div>
        </div>
      )} */}
    </div>
  );
}
