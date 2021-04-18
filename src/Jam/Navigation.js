import React from 'react';
import './Jam.css';

export default function Navigation({ approaches, approach }) {
  return (
    <div className={'newNav'}>
      {approach != 0 ? (
        <div className={'newNavContent'}>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '20px' }}>Approach: </div>
            <div>{approaches[approach]}</div>
          </div>
          <div
            onClick={() => {
              window.location.reload();
            }}
            className='back'>
            Back
          </div>
        </div>
      ) : (
        <div className={'emptyNav'}></div>
      )}
    </div>
  );
}
