import React from "react";
import "./Wrapper.css";

const Wrapper = (props) => (
    
    <div id="wrapper" className={"Wrapper"}>
        {props.children}
    </div>
)

export default Wrapper; 