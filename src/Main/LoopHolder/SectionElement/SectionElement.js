import React from 'react';
import './SectionElement.scss';
import LoopAndFx from './LoopAndFx';
import { useState } from 'react';
import { useCallback } from 'react';

const SectionElement = (props) => {
  const {
    loopButtonClick,
    nextLoopClick,
    previousLoopClick,
    categorySize,
    categoryLoop,
    categoryPreselected,
  } = props;

  const [buttonStates, setButtonStates] = useState(categoryPreselected ?? []);
  const [loopStates, setLoopStates] = useState(categoryLoop ?? []);

  const handleButtonClick = useCallback(
    (index) => {
      const newButtonStates = [...buttonStates];
      newButtonStates[index] = !newButtonStates[index];
      setButtonStates(newButtonStates);
      loopButtonClick(index, categoryLoop[index]);
    },
    [loopButtonClick, buttonStates, categoryLoop, setButtonStates]
  );

  const handleNextPreviousLoopClick = useCallback(
    (index, direction) => {
      const newLoopStates = [...loopStates];

      if (direction) {
        if (newLoopStates[index] === categorySize[index]) {
          newLoopStates[index] = 1;
        } else if (newLoopStates[index] < categorySize[index]) {
          newLoopStates[index] = newLoopStates[index] + 1;
        }

        setLoopStates(newLoopStates);
        nextLoopClick(index, newLoopStates[index], categoryLoop[index]);
      } else {
        if (newLoopStates[index] === 1) {
          newLoopStates[index] = categorySize[index];
        } else {
          newLoopStates[index] = newLoopStates[index] - 1;
        }

        setLoopStates(newLoopStates);
        previousLoopClick(index, newLoopStates[index], categoryLoop[index]);
      }
    },
    [nextLoopClick, categorySize, previousLoopClick, categoryLoop, loopStates, setLoopStates]
  );

  return (
    <div className={props.className} style={props.style}>
      <div className={'sectionHeader'} onClick={props.titleOnClick}>
        <div style={{ margin: 'auto' }} className='title'>
          <span>{props.title}</span>
        </div>
        <div className={'OneTwoThreeFour'}></div>
      </div>

      <div className={'sectionBody'}>
        <div className={'loopLeft'}>
          <LoopAndFx
            colorTheme={props.colorTheme}
            isActive={buttonStates[0]}
            title={props.loopNames[0]}
            onClick={() => handleButtonClick(0)}
            disabled={props.disabled}
            nextLoopClick={() => handleNextPreviousLoopClick(0, true)}
            previousLoopClick={() => handleNextPreviousLoopClick(0, false)}
            categoryLoop={loopStates[0]}
            categorySize={categorySize[0]}
          />
          <LoopAndFx
            colorTheme={props.colorTheme}
            isActive={buttonStates[2]}
            title={props.loopNames[2]}
            onClick={() => handleButtonClick(2)}
            disabled={props.disabled}
            nextLoopClick={() => handleNextPreviousLoopClick(2, true)}
            previousLoopClick={() => handleNextPreviousLoopClick(2, false)}
            categoryLoop={loopStates[2]}
            categorySize={categorySize[2]}
          />
          <LoopAndFx
            colorTheme={props.colorTheme}
            isActive={buttonStates[4]}
            title={props.loopNames[4]}
            onClick={() => handleButtonClick(4)}
            disabled={props.disabled}
            nextLoopClick={() => handleNextPreviousLoopClick(4, true)}
            previousLoopClick={() => handleNextPreviousLoopClick(4, false)}
            categoryLoop={loopStates[4]}
            categorySize={categorySize[4]}
          />
        </div>
        <div className={'loopRight'}>
          <LoopAndFx
            colorTheme={props.colorTheme}
            isActive={buttonStates[1]}
            title={props.loopNames[1]}
            onClick={() => handleButtonClick(1)}
            disabled={props.disabled}
            nextLoopClick={() => handleNextPreviousLoopClick(1, true)}
            previousLoopClick={() => handleNextPreviousLoopClick(1, false)}
            categoryLoop={loopStates[1]}
            categorySize={categorySize[1]}
          />
          <LoopAndFx
            colorTheme={props.colorTheme}
            isActive={buttonStates[3]}
            title={props.loopNames[3]}
            onClick={() => handleButtonClick(3)}
            disabled={props.disabled}
            nextLoopClick={() => handleNextPreviousLoopClick(3, true)}
            previousLoopClick={() => handleNextPreviousLoopClick(3, false)}
            categoryLoop={loopStates[3]}
            categorySize={categorySize[3]}
          />
          <LoopAndFx
            colorTheme={props.colorTheme}
            isActive={buttonStates[5]}
            title={props.loopNames[5]}
            onClick={() => handleButtonClick(5)}
            disabled={props.disabled}
            nextLoopClick={() => handleNextPreviousLoopClick(5, true)}
            previousLoopClick={() => handleNextPreviousLoopClick(5, false)}
            categoryLoop={loopStates[5]}
            categorySize={categorySize[5]}
          />
        </div>
      </div>

      <div className={'sectionFooter'}>
        <span onClick={props.syncClick} className={'footerButton'}></span>
        <span onClick={props.saveClick} className={'footerButton'}></span>
      </div>
    </div>
  );
};

export default SectionElement;
