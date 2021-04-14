import React from "react";
import "./TimerAnimation.scss";

const TimerAnimation = (props) => (

    <div className={"timerAnimation"}>
        <div className={"progress"}>
            <div className={"progress-value"} style={{width:props.timerAnimationStart}}></div>
        </div>
    </div>

)

export default TimerAnimation;