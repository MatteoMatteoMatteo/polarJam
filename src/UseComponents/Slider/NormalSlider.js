import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 50 + theme.spacing(3) * 2,
  },
}));

const valueLabelStyles = makeStyles(() => ({
  popper: {
    zIndex: -10,
  },
  tooltip: {
    backgroundColor: '#98bde4',
    color: 'white',
    fontFamily: 'Franklin Gothic Medium, Arial Narrow, Arial, sans-serif',
    fontSize: '0.8rem',
    zIndex: -10,
  },
}));

function ValueLabelComponent(props) {
  const { children, open, value } = props;

  return (
    <Tooltip
      open={open}
      enterTouchDelay={0}
      classes={valueLabelStyles()}
      placement='top'
      title={value}>
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

const PrettoSlider = withStyles({
  root: {
    color: 'white',
    height: 5,
  },
  thumb: {
    height: 17,
    cursor: 'pointer !important',
    width: 17,
    backgroundColor: '#fff',
    marginTop: -7,
    marginLeft: -12,
    '&:focus, &:hover, &$active': {
      boxShadow: 'inherit',
    },
  },
  active: {},
  valueLabel: {},
  track: {
    height: 3,
    cursor: 'pointer !important',
    borderRadius: '20px',
  },
  rail: {
    height: 3,
    background: '#222433',
    opacity: 1,
    cursor: 'pointer !important',
    borderRadius: '20px',
  },
  mark: {
    backgroundColor: 'white',
    height: 3,
    width: 3,
    marginTop: -5,
    opacity: 1,
    cursor: 'pointer !important',
  },
  markActive: {
    opacity: 1,
    backgroundColor: 'white',
  },
  markLabel: {
    top: 33,
    color: 'white',
    fontFamily: 'Franklin Gothic Medium, Arial Narrow, Arial, sans-serif',
    opacity: 1,
  },
  markLabelActive: {
    top: 33,
    color: 'white',
    fontFamily: 'Franklin Gothic Medium, Arial Narrow, Arial, sans-serif',
    opacity: 1,
  },
})(Slider);

export default function CustomizedSlider({
  reactToChange,
  reactToChangeAlways,
  min,
  max,
  def,
  step,
  sliderWitdh,
  id,
}) {
  const classes = useStyles();

  return (
    <div className={classes.root} style={{ width: sliderWitdh }}>
      <PrettoSlider
        aria-labelledby={id}
        defaultValue={def}
        min={min}
        max={max}
        onChangeCommitted={(e, value) => {
          reactToChange(e, value);
        }}
        onChange={(e, value) => {
          reactToChangeAlways(e, value);
        }}
        step={step}
      />
    </div>
  );
}
