import { Card, CardContent, Grid, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/styles';
import 'App.scss';
import clsx from 'clsx';
import React from 'react';
import CountUp from 'react-countup';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100%',
  },

  primaryColorRoot: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    height: '100%',
  },
  secondaryColorRoot: {
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    height: '100%',
  },
  content: {
    alignItems: 'center',
    display: 'flex',
  },
  title: {
    fontWeight: 700,
  },
  avatar: {
    backgroundColor: theme.palette.error.main,
    height: 56,
    width: 56,
  },
  icon: {
    height: 32,
    width: 32,
  },
  difference: {
    marginTop: theme.spacing(2),
    display: 'flex',
    alignItems: 'center',
  },
  differenceIcon: {
    color: theme.palette.error.dark,
  },
  differenceValue: {
    color: theme.palette.error.dark,
    marginRight: theme.spacing(1),
  },
}));

export default function PortfolioCard(props) {
  const {className} = props;

  const classes = useStyles();

  const backgroundColorChooser = () => {
    switch (props.cardBackgroundColor) {
      case 'primary':
        return classes.primaryColorRoot;
      case 'secondary':
        return classes.secondaryColorRoot;
      default:
        return classes.root;
    }
  };
  return (
    <Card className={clsx(backgroundColorChooser(), className)}>
      <CardContent className="paper">
        <Grid container justify="space-between">
          <Grid item>
            <Typography
              className={classes.title}
              color="inherit"
              gutterBottom
              variant="body2"
            >
              {props.title}
            </Typography>
            <Typography variant="body1">
              {/* check if content is digit. If it is,
               show count up animation. */}
              {!isNaN(props.content) ? (
                <CountUp start={0} end={props.content} />
              ) : (
                props.content
              )}
            </Typography>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}
