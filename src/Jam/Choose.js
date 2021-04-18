import React, { useState } from 'react';
import './Choose.css';

export default function Choose({ chooseApproach }) {
  return (
    <div className={'approachHolder'}>
      <div className='chooseHeader'>Choose a Delay Compensation Approach</div>
      <div className={'delayCompensationHolder'}>
        <div onClick={() => chooseApproach(1)}>
          Server Side <br></br> <span>Websocket</span>
        </div>
        <div onClick={() => chooseApproach(2)}>
          Client Side <br></br> <span>Websocket</span>
        </div>
        <div onClick={() => chooseApproach(3)}>
          Client Side <br></br> <span>Peer to Peer</span>
        </div>
      </div>
    </div>
  );
}
