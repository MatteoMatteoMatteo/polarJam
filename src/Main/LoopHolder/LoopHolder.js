import React, { useState } from 'react';
import SectionElement from './SectionElement/SectionElement';
import './LoopHolder.css';
import './SectionElement/SectionElement.scss';
import { Transport } from 'tone';

const LoopHolder = ({
  timerAnimationStart,
  categoryPreselected,
  categoryLoop,
  categorySize,
  colorTheme,
  bpm,
  currentTempo,
  allLoops,
  whichGenre,
  parentCallback,
  sectionStatus,
  loopNames,
  startPause,
}) => {
  const loopButtonHandler = (soundIndex) => {
    if (soundIndex.wasItTriggered === false) {
      if (window.isTransportPlaying === true) {
        prepareAndStart(soundIndex);
      }
      soundIndex.wasItTriggered = true;
      sessionStorage.setItem(whichGenre + soundIndex.id + 'Selected', 1);
    } else {
      soundIndex.loop.stop();
      soundIndex.wasItTriggered = false;
      sessionStorage.setItem(whichGenre + soundIndex.id + 'Selected', 0);
    }
  };

  const nextPreviousLoopHandler = (soundIndex, category, howMany) => {
    soundIndex.loop.stop();
    soundIndex.loop.load(
      require(`./../../Assets/Loops/${whichGenre}/loops/category${category}/loop${howMany}.mp3`),
      () => {
        if (soundIndex.wasItTriggered === true && window.isTransportPlaying === true) {
          prepareAndStart(soundIndex);
        }
      }
    );
    sessionStorage.setItem(whichGenre + soundIndex.id + 'Loop', howMany);
  };

  const prepareAndStart = (soundIndex) => {
    let tempoSlider = document.getElementById('tempoSlider');
    soundIndex.loop.playbackRate = currentTempo / bpm;
    soundIndex.loop.start(
      undefined,
      Transport.toSeconds(Transport.position) * (currentTempo / bpm)
    );

    // soundIndex.loop.start(undefined, Transport.position);
  };

  let [, setSections] = useState(sectionStatus);

  const handleSectionClick = (index) => {
    for (let i = 0; i < 6; i++) {
      for (let j = 0; j < categorySize[i]; j++) {
        if (!allLoops[index][i][j].loop?.loaded) return;
      }
    }

    const mutableSections = [...sectionStatus];
    for (let i = 0; i < mutableSections.length; i++) {
      mutableSections[i].active = false;
    }
    mutableSections[index].active = true;
    setSections(mutableSections);
    sendData(mutableSections);
  };

  const sendData = (data) => {
    parentCallback(data);
  };

  const sectionElement = sectionStatus.map((section) => (
    <SectionElement
      loopNames={loopNames}
      key={section.id}
      title={'#' + (section.id + 1)}
      titleOnClick={() => handleSectionClick(section.id)}
      className={section.active ? 'sectionElementActive' : 'sectionElementPassive'}
      timerAnimationStart={section.active ? timerAnimationStart : 0}
      loopButtonClick={(index, whichLoop) => {
        loopButtonHandler(allLoops[section.id][index][whichLoop - 1]);
      }}
      nextLoopClick={(index, howMany, whichLoop) => {
        nextPreviousLoopHandler(allLoops[section.id][index][whichLoop - 1], index + 1, howMany);
      }}
      previousLoopClick={(index, howMany, whichLoop) => {
        nextPreviousLoopHandler(allLoops[section.id][index][whichLoop - 1], index + 1, howMany);
      }}
      disabled={section.active ? false : true}
      categoryPreselected={[
        categoryPreselected[section.id][0],
        categoryPreselected[section.id][1],
        categoryPreselected[section.id][2],
        categoryPreselected[section.id][3],
        categoryPreselected[section.id][4],
        categoryPreselected[section.id][5],
      ]}
      categorySize={[
        categorySize[0],
        categorySize[1],
        categorySize[2],
        categorySize[3],
        categorySize[4],
        categorySize[5],
      ]}
      categoryLoop={[
        categoryLoop[section.id][0],
        categoryLoop[section.id][1],
        categoryLoop[section.id][2],
        categoryLoop[section.id][3],
        categoryLoop[section.id][4],
        categoryLoop[section.id][5],
      ]}
      colorTheme={colorTheme}
    />
  ));

  return <div className={'loopHolder'}>{sectionElement}</div>;
};

export default LoopHolder;
