import React from "react";
import "./../../StudioControl.scss";

const slider = (props) => (
    
    <div className={props.className}>
        <input type="range" className={props.className} 
        defaultValue={props.defaultValue} id={props.id} value={props.value} min={props.min} max={props.max} onChange={props.onChange}> 
        </input>
    </div>


)

export default slider; 