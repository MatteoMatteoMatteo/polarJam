import React, { useState } from 'react';
import './Choose.css';

export default function Choose({ chooseApproach }) {
  return (
    <div className={'approachHolder'}>
      <div className='chooseHeader'>Delay Compensation Architectures</div>
      <div className={'delayCompensationHolder'}>
        <div onClick={() => chooseApproach(1)}>
          Server-side <br></br> <span>WebSocket</span>
        </div>
        <div onClick={() => chooseApproach(2)}>
          Client-side <br></br> <span>WebSocket</span>
        </div>
        <div onClick={() => chooseApproach(3)}>
          Client-side <br></br> <span>Peer-to-peer</span>
        </div>
      </div>
    </div>
  );
}
