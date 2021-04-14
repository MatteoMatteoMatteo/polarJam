import React, { useState } from 'react';
import './SectionElement.scss';
import * as cn from 'classnames';

const LoopAndFx = (props) => {
  let [hovered, setHovered] = useState(true);

  const { isActive, colorTheme } = props;

  let hoverColor = '#2e566e';

  return (
    <div
      disabled={props.disabled}
      className={'loopAndFx'}
      style={{ backgroundColor: hovered ? 'transparent' : hoverColor }}
      onMouseEnter={() => {
        setHovered((hovered = false));
      }}
      onMouseLeave={() => {
        setHovered((hovered = true));
      }}>
      <button className={cn('loopButton', { isActive })} onClick={props.onClick}>
        {props.title}
      </button>
      <div className='slideshow-container'>
        <div className='arrowLeft' onClick={props.previousLoopClick}>
          ❮
        </div>
        <span className='howMany'>
          {props.categoryLoop} / {props.categorySize}
        </span>
        <div className='arrowRight' onClick={props.nextLoopClick}>
          ❯
        </div>
      </div>
      <div className={'fxDropdown'}>
        <div className={'fxPanel'}>Hola</div>
      </div>
    </div>
  );
};

export default LoopAndFx;
