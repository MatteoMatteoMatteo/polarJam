import React, { useState } from "react";
import "./SelectBox.css";
import * as cn from "classnames";

export default function SelectBox({ switchInstrumentForParent, visible, optionId }) {
  const [selectInstrument, handleSelectInstrument] = useState(false);

  const [instrumentArray, handleArray] = useState([
    { id: "1" + optionId, active: true },
    { id: "2" + optionId, active: false },
    { id: "3" + optionId, active: false },
    { id: "4" + optionId, active: false },
    { id: "5" + optionId, active: false },
    { id: "6" + optionId, active: false },
  ]);

  const handleSelection = (e) => {
    handleSelectInstrument(!selectInstrument);

    for (let i = 0; i < instrumentArray.length; i++) {
      if (instrumentArray[i].id === e.target.id) {
        let newArray = [...instrumentArray];
        newArray[i].active = true;
        handleArray(newArray);
      } else if (instrumentArray[i].active === true) {
        let newArray = [...instrumentArray];
        newArray[i].active = false;
        handleArray(newArray);
      }
    }

    switchInstrumentForParent(e.target.value, parseInt(e.target.id.charAt(0)));
  };

  return (
    <div className={"select-box"} style={{ visibility: visible ? "visible" : "hidden" }}>
      <div className={"pls"}>
        <div className={cn("options-container", selectInstrument ? "active" : null)}>
          <div className={"option"}>
            <input
              onClick={(e) => {
                handleSelection(e);
              }}
              readOnly
              checked="uncheckd"
              type="text"
              className={"radio"}
              id={"1" + optionId}
              name="category"
              value="Drum Kit"
            ></input>
            <label
              className={instrumentArray[0].active ? "activeLabel" : "passiveLabel"}
              htmlFor={"1" + optionId}
            >
              Drum Kit
            </label>
          </div>
          <div className={"option"}>
            <input
              onClick={(e) => {
                handleSelection(e);
              }}
              readOnly
              type="radio"
              className={"radio"}
              id={"2" + optionId}
              name="category"
              value="Grand Piano"
            ></input>
            <label
              className={instrumentArray[1].active ? "activeLabel" : "passiveLabel"}
              htmlFor={"2" + optionId}
            >
              Grand Piano
            </label>
          </div>
          <div className={"option"}>
            <input
              onClick={(e) => {
                handleSelection(e);
              }}
              readOnly
              type="radio"
              className={"radio"}
              id={"3" + optionId}
              name="category"
              value="Dream Piano"
            ></input>
            <label
              className={instrumentArray[2].active ? "activeLabel" : "passiveLabel"}
              htmlFor={"3" + optionId}
            >
              Dream Piano
            </label>
          </div>
          <div className={"option"}>
            <input
              onClick={(e) => {
                handleSelection(e);
              }}
              readOnly
              type="radio"
              className={"radio"}
              id={"4" + optionId}
              value="Wooden Pluck"
              name="category"
            ></input>
            <label
              className={instrumentArray[3].active ? "activeLabel" : "passiveLabel"}
              htmlFor={"4" + optionId}
            >
              Wooden Pluck
            </label>
          </div>
          <div className={"option"}>
            <input
              onClick={(e) => {
                handleSelection(e);
              }}
              readOnly
              type="radio"
              className={"radio"}
              id={"5" + optionId}
              name="category"
              value="Poly Pluck"
            ></input>
            <label
              className={instrumentArray[4].active ? "activeLabel" : "passiveLabel"}
              htmlFor={"5" + optionId}
            >
              Poly Pluck
            </label>
          </div>
          <div className={"option"}>
            <input
              onClick={(e) => {
                handleSelection(e);
              }}
              readOnly
              type="radio"
              className={"radio"}
              id={"6" + optionId}
              name="category"
              value="Darude"
            ></input>
            <label
              className={instrumentArray[5].active ? "activeLabel" : "passiveLabel"}
              htmlFor={"6" + optionId}
            >
              Darude
            </label>
          </div>
        </div>
      </div>
      <div
        onClick={() => {
          handleSelectInstrument(!selectInstrument);
        }}
        className={cn("selected", selectInstrument ? "selectedActive" : null)}
      >
        Change Instrument
      </div>
    </div>
  );
}
