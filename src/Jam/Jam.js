import React from 'react';
import Recording from '../Main/Recording/Recording';
import './Jam.css';

export default function Jam({ location }) {
  return (
    <>
      <Recording location={location}></Recording>;
      <div style={{ padding: '0px 20px' }}>
        <div className='homeDiv'>
          <button className='letsGoButton'>Copy Link</button>
          <p>and send it to other musicians!</p>
        </div>
      </div>
    </>
  );
}
