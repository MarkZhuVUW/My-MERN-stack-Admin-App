import {Typography} from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import {makeStyles} from '@material-ui/core/styles';
import React from 'react';


export default function FacebookProgress(props) {
  // Inspired by the Facebook spinners.
  const useStylesFacebook = makeStyles({
    root: {
      position: 'relative',
      display: 'flex',
      flexDirection: 'row',
    },
    top: {
      color: '#eef3fd',
    },
    bottom: {
      color: '#6798e5',
      animationDuration: '550ms',
      position: 'absolute',
      left: 0,
    },
  });

  const classes = useStylesFacebook();

  return (
    <div className={classes.root}>
      <div>
        <CircularProgress
          variant="determinate"
          value={100}
          className={classes.top}
          size={24}
          thickness={4}
          {...props}
        />
        <CircularProgress
          variant="indeterminate"
          disableShrink
          className={classes.bottom}
          size={24}
          thickness={4}
          {...props}
        />
      </div>
      <Typography>{props.msg}</Typography>
    </div>
  );
}
