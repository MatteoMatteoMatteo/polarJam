import React from "react";
import "./ThemePicker.css";
import { motion } from "framer-motion";
import { slideOutOpacity } from "./../../TransitionStyles/TransitionStyles";
import * as cn from "classnames";

const ThemePicker = (props) => {
  const typeEaseDuration = {
    type: "tween",
    ease: "anticipate",
    duration: 1.4,
  };

  const colorTheme1 = () => {
    let bgColor = "#B9CDE3";
    let sectionColor = "#EACAD5";
    let controlColor = "#2224337c";
    let hoverColor = "#B9CDE3";
    props.colorThemeHandler(bgColor, sectionColor, controlColor, hoverColor);
    var x = document.getElementsByTagName("BODY")[0];
    x.style.backgroundColor = bgColor;
  };

  const colorTheme2 = () => {
    let bgColor = "#222433";
    let sectionColor = "#5B84B1FF";
    let controlColor = "white";
    let hoverColor = "##222433";
    props.colorThemeHandler(bgColor, sectionColor, controlColor, hoverColor);
    var x = document.getElementsByTagName("BODY")[0];
    x.style.backgroundColor = bgColor;
  };

  const colorTheme3 = () => {
    let bgColor = "#00B1D2FF";
    let sectionColor = "#FFD662FF";
    let controlColor = "white";
    let hoverColor = "#00B1D2FF";
    props.colorThemeHandler(bgColor, sectionColor, controlColor, hoverColor);
    var x = document.getElementsByTagName("BODY")[0];
    x.style.backgroundColor = bgColor;
  };

  return (
    <div
      className="colorTheme"
      className="songInfoHolder"
      initial="out"
      animate="in"
      variants={slideOutOpacity}
      transition={typeEaseDuration}
    >
      <div
        className={cn("ring", "")}
        style={{ backgroundColor: "#EACAD5" }}
        onClick={colorTheme1}
      ></div>
      <div
        className={cn("ring", "")}
        style={{ backgroundColor: "#5B84B1FF" }}
        onClick={colorTheme2}
      ></div>
      <div
        className={cn("ring", "")}
        style={{ backgroundColor: "#FFD662FF" }}
        onClick={colorTheme3}
      ></div>
    </div>
  );
};

export default ThemePicker;
