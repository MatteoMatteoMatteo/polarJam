import React from 'react';
import './../../StudioControl.scss';
import Aux from './../../../../UseComponents/MyDiv/MyDiv';

const PlayPause = (props) => (
  <Aux>
    {/* // <div className="playpause"> */}
    <span onClick={props.onClick} id={'playPauseTitle'}>
      {props.title}
    </span>
    {/* <sup onClick={props.onClick} style={{ padding: '0px 0px 0px 0px', cursor: 'pointer' }}>
      (space)
    </sup> */}
    {/* <input onClick={props.onClick} type="checkbox" value="None" id="playpause" name="check" />
        <label htmlFor="playpause" tabIndex="1"><span id={"playPauseTitle"}>{props.title}</span></label> */}
    {/* </div> */}
  </Aux>
);

export default PlayPause;
