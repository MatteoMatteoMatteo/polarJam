import React from "react";
import PropTypes from "prop-types";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Slider from "@material-ui/core/Slider";
import Tooltip from "@material-ui/core/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    width: 200 + theme.spacing(3) * 2,
  },
  margin: {
    height: 20,
  },
}));

const valueLabelStyles = makeStyles(() => ({
  popper: {
    zIndex: -10,
  },
  tooltip: {
    marginBottom: 10,
    padding: "10px",
    backgroundColor: "#98bde4",
    color: "white",
    fontFamily: "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif",
    fontSize: "0.8rem",
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
      placement="top"
      title={value}
    >
      {children}
    </Tooltip>
  );
}

ValueLabelComponent.propTypes = {
  children: PropTypes.element.isRequired,
  open: PropTypes.bool.isRequired,
  value: PropTypes.string.isRequired,
};

const marks = [
  {
    value: 0,
    label: "No Delay",
  },
  {
    value: 500,
    label: "1",
  },
  {
    value: 1000,
    label: "2",
  },
  {
    value: 1500,
    label: "3",
  },
  {
    value: 2000,
    label: "4",
  },
];

const PrettoSlider = withStyles({
  root: {
    color: "white",
    height: 5,
    marginTop: 28,
  },
  thumb: {
    height: 24,
    cursor: "pointer !important",
    width: 24,
    backgroundColor: "#fff",
    border: "2px solid #222433",
    marginTop: -8,
    marginLeft: -12,
    "&:focus, &:hover, &$active": {
      boxShadow: "inherit",
    },
  },
  active: {},
  valueLabel: {},
  track: {
    height: 8,
    cursor: "pointer !important",
  },
  rail: {
    height: 8,
    background: "#222433",
    opacity: 1,
    cursor: "pointer !important",
  },
  mark: {
    backgroundColor: "white",
    height: 20,
    width: 3,
    marginTop: -5,
    opacity: 1,
    cursor: "pointer !important",
  },
  markActive: {
    opacity: 1,
    backgroundColor: "white",
  },
  markLabel: {
    top: 33,
    color: "white",
    fontFamily: "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif",
    opacity: 1,
  },
  markLabelActive: {
    top: 33,
    color: "white",
    fontFamily: "Franklin Gothic Medium, Arial Narrow, Arial, sans-serif",
    opacity: 1,
  },
})(Slider);

export default function CustomizedSlider({ reactToChange }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <PrettoSlider
        valueLabelDisplay={"on"}
        marks={marks}
        defaultValue={0}
        scale={(x) => x + "ms"}
        min={0}
        max={2000}
        onChangeCommitted={(e, value) => {
          reactToChange(e, value);
        }}
        step={500}
        ValueLabelComponent={ValueLabelComponent}
      />
    </div>
  );
}
