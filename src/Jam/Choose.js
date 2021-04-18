import React, { useState } from 'react';
import './Choose.css';

export default function Choose() {
  const [approach, setApproach] = useState();

  return (
    <div className={'approachHolder'}>
      <div className='chooseHeader'>Choose a Delay Compensation Approach</div>
      <div className={'delayCompensationHolder'}>
        <div onClick={() => setApproach(1)}>
          Server Side <br></br> <span>Websocket</span>
        </div>
        <div onClick={() => setApproach(2)}>
          Client Side <br></br> <span>Websocket</span>
        </div>
        <div onClick={() => setApproach(3)}>
          Client Side <br></br> <span>Peer to Peer</span>
        </div>
      </div>
    </div>
  );
}
