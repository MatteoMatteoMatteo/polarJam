import React, { Fragment, useState, useEffect } from 'react';
import './Sampler.css';

export default function Sampler({ onMousePlay, whichInstrument, midiNotes, syncMetro }) {
  var keyToNote = {
    q: { note: 'C1', index: 0 },
    w: { note: 'D1', index: 2 },
    e: { note: 'E1', index: 4 },
    r: { note: 'F1', index: 5 },
    t: { note: 'G1', index: 7 },
    z: { note: 'A1', index: 9 },
    u: { note: 'B1', index: 11 },
    a: { note: 'C2', index: 12 },
    s: { note: 'D2', index: 14 },
    d: { note: 'E2', index: 16 },
    f: { note: 'F2', index: 17 },
    g: { note: 'G2', index: 19 },
    h: { note: 'A2', index: 21 },
    j: { note: 'B2', index: 23 },
    y: { note: 'C3', index: 24 },
    x: { note: 'D3', index: 26 },
    c: { note: 'E3', index: 28 },
    v: { note: 'F3', index: 29 },
    b: { note: 'G3', index: 31 },
    n: { note: 'A3', index: 33 },
    m: { note: 'B3', index: 35 },
    ',': { note: 'C4', index: 36 },
  };

  document.body.onkeydown = (e) => {
    const key = e.key;
    if (keyToNote[key]) {
      onCustomMouseDown(keyToNote[key].note, keyToNote[key].index);
    }
  };

  document.body.onkeyup = (e) => {
    const key = e.key;
    if (keyToNote[key]) {
      onCustomMouseUp(keyToNote[key].note, keyToNote[key].index);
    }
  };

  var [allNotesArrayOctave, keyHoldingAllOctave] = useState(midiNotes);

  useEffect(() => {
    if (midiNotes != null && midiNotes !== allNotesArrayOctave) {
      keyHoldingAllOctave(midiNotes);
    }
  }, [midiNotes, keyHoldingAllOctave, allNotesArrayOctave]);

  const onCustomMouseDown = (note, index) => {
    let newArr = [...allNotesArrayOctave];
    if (newArr[index].holdingDown) return;
    newArr[index].holdingDown = true;
    keyHoldingAllOctave(newArr);

    onMousePlay(whichInstrument, note);
  };

  const onCustomMouseUp = (note, index) => {
    let newArr = [...allNotesArrayOctave];
    newArr[index].holdingDown = false;
    keyHoldingAllOctave(newArr);
  };

  const onCustomMouseEnter = (e, note, index) => {
    if (e.buttons === 1) {
      let newArr = [...allNotesArrayOctave];
      newArr[index].holdingDown = true;
      keyHoldingAllOctave(newArr);

      onMousePlay(whichInstrument, note);
    }
  };

  const onCustomMouseLeave = (index) => {
    let newArr = [...allNotesArrayOctave];
    newArr[index].holdingDown = false;
    keyHoldingAllOctave(newArr);
  };

  const allNotesOctave = allNotesArrayOctave.map((el, index) => {
    var includesSharp = false;

    if (el.note.includes('#')) includesSharp = true;

    if (includesSharp)
      return (
        <div
          key={el.note}
          onMouseDown={() => onCustomMouseDown(el.note, index)}
          onMouseUp={() => onCustomMouseUp(el.note, index)}
          onMouseEnter={(e) => onCustomMouseEnter(e, el.note, index)}
          onMouseLeave={() => {
            onCustomMouseLeave(index);
          }}
          className={el.holdingDown ? 'blackNoteHoldingDown' : 'blackNote'}></div>
      );
    else if (el.note !== 'C5')
      return (
        <div
          key={el.note}
          onMouseDown={() => onCustomMouseDown(el.note, index)}
          onMouseUp={() => onCustomMouseUp(el.note, index)}
          onMouseEnter={(e) => onCustomMouseEnter(e, el.note, index)}
          onMouseLeave={() => {
            onCustomMouseLeave(index);
          }}
          className={el.holdingDown ? 'whiteNoteHoldingDown' : 'whiteNote'}></div>
      );
    else
      return (
        <div
          key={el.note}
          onMouseDown={() => onCustomMouseDown(el.note, index)}
          onMouseUp={() => onCustomMouseUp(el.note, index)}
          onMouseEnter={(e) => onCustomMouseEnter(e, el.note, index)}
          onMouseLeave={() => {
            onCustomMouseLeave(index);
          }}
          style={{ borderRight: 'none' }}
          className={el.holdingDown ? 'whiteNoteHoldingDown' : 'whiteNote'}></div>
      );
  });

  return (
    <Fragment>
      <div className={'pianoContainer'}>
        <div className={'allNotesContainer'}>
          {allNotesOctave}

          {/* <div className={"blackNotesContainer"}>{blackNotesOctave}</div> */}
        </div>
      </div>
    </Fragment>
  );
}
