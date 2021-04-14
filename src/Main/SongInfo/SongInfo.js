import React, { useState } from 'react';
import './SongInfo.scss';
import { slideOutOpacity } from '../../TransitionStyles/TransitionStyles';

const SongInfo = ({
  colorThemeHandler,
  genre,
  sectionStatus,
  add,
  metronomeHandle,
  metronomeOnOff,
  remove,
  allLoops,
}) => {
  const typeEaseDuration = {
    type: 'tween',
    ease: 'anticipate',
    duration: 1.4,
  };

  // const colorTheme1 = () => {
  //   let bgColor = "#B9CDE3";
  //   let sectionColor = "#EACAD5";
  //   let controlColor = "#2224337c";
  //   let hoverColor = "#B9CDE3";
  //   colorThemeHandler(bgColor, sectionColor, controlColor, hoverColor);
  //   var x = document.getElementsByTagName("BODY")[0];
  //   x.style.backgroundColor = bgColor;
  // };

  // const colorTheme2 = () => {
  //   let bgColor = "#222433";
  //   let sectionColor = "#5B84B1FF";
  //   let controlColor = "white";
  //   let hoverColor = "##222433";
  //   colorThemeHandler(bgColor, sectionColor, controlColor, hoverColor);
  //   var x = document.getElementsByTagName("BODY")[0];
  //   x.style.backgroundColor = bgColor;
  // };

  // const colorTheme3 = () => {
  //   let bgColor = "#00B1D2FF";
  //   let sectionColor = "#FFD662FF";
  //   let controlColor = "white";
  //   let hoverColor = "#00B1D2FF";
  //   colorThemeHandler(bgColor, sectionColor, controlColor, hoverColor);
  //   var x = document.getElementsByTagName("BODY")[0];
  //   x.style.backgroundColor = bgColor;
  // };

  let sectionArray = sectionStatus;
  let counter = sectionArray.length;

  const sendAddedData = (sectionArray) => {
    add(sectionArray);
  };

  const sendRemovedData = (sectionArray) => {
    remove(sectionArray);
  };

  const handleMetronome = () => {
    setMetronomeState(!metronomeState);
    metronomeHandle(!metronomeState);
  };

  const [metronomeState, setMetronomeState] = useState(metronomeOnOff);

  return (
    <div
      className='songInfoHolder'
      initial='out'
      animate='in'
      variants={slideOutOpacity}
      transition={typeEaseDuration}>
      <div style={{ display: 'flex', alignItems: 'center' }}>
        <div className={'songGenreElement'}>
          <span>{genre}</span>
        </div>
      </div>

      <div
        style={{ display: 'flex', alignItems: 'center' }}
        onClick={() => {
          handleMetronome();
        }}>
        <div
          style={{
            opacity: metronomeState ? '1' : '0.4',
          }}
          className={'metronome'}>
          Metronome
        </div>
      </div>

      <div className={'addRemoveSectionHolder'}>
        <div
          className={'addRemoveSection'}
          onClick={() => {
            if (counter < 5) {
              sectionArray.push({ id: counter++, active: false });
              counter++;
              sendAddedData(sectionArray);
            }
          }}>
          Add Section
        </div>
        <div
          className={'addRemoveSection'}
          onClick={() => {
            if (counter > 1) {
              let index = sectionArray.length - 1;
              sectionArray.pop();
              counter--;

              for (let i = 0; i < allLoops[index].length; i++) {
                for (let j = 0; j < allLoops[index][i].length; j++) {
                  if (allLoops[index][i][j].wasItTriggered === true) {
                    allLoops[index][i][j].loop.stop();
                    allLoops[index][i][j].wasItTriggered = false;
                  }
                }
              }
              sendRemovedData(sectionArray);
            }
          }}>
          Remove Section
        </div>
      </div>

      {/* <SaveSong
        genre={genre}
        songNumber={songNumber}
        sectionArray={sectionArray}
      /> */}

      <div className='colorTheme'>
        {/* <div
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
        ></div> */}
      </div>
    </div>
  );
};

export default SongInfo;
