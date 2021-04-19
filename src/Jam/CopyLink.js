import React, { useState } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import './CopyLink.css';

export default function CopyLink() {
  const link = window.location.href;

  const [visited, setVisited] = useState(false);

  const handleVisit = () => {
    setVisited(true);
    setTimeout(() => {
      setVisited(false);
    }, 1000);
  };

  return (
    <div style={{ padding: '0px 0px' }}>
      <div className='homeDiv'>
        <CopyToClipboard text={link}>
          <button
            onClick={() => handleVisit()}
            className={visited ? 'letsGoButtonVisited' : 'letsGoButton'}>
            Copy Link
          </button>
        </CopyToClipboard>
        <p>and send it to another musician!</p>
      </div>
    </div>
  );
}
