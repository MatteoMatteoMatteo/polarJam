import React from "react";
import Aux from "./../../../../UseComponents/MyDiv/MyDiv"
import "./../../StudioControl.scss";


const lockrelease = (props) => {
 
    return(
        <Aux>
            <label className="switch">
                <input disabled={props.disabled} type="checkbox" onClick={props.onClick}/>
                    <span>
                        <strong style={{color:props.colorTheme.controlColor}}></strong>
                    </span>
            </label>
        </Aux>
    )
}

export default lockrelease; 