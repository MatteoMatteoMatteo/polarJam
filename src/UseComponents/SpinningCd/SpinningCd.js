import React from "react";
import "./SpinningCd.css";
import Cd from "./../../Assets/spinning.png";
import * as cn from "classnames";

const SpinningCd = (props) => {

    let songPlayingStatus=props.songPlayingStatus;
    
    return(
        <img className={cn("spinningCd", songPlayingStatus?"spinning":"lol")} src={Cd}></img>
        // <div className="moving">
        // <div className="circle spinning">
        //     <div className="circle small"></div>
        // </div>
        // </div>           
    )
}


export default SpinningCd; 