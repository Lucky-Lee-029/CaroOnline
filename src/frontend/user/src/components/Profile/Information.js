import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

export default function Information() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>My Profile</Title>
      <Typography component="p" variant="h4">
        Bulb Will
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Join 15 December, 2020
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Number of matches participated: 1000
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        Odds of winning: 90%
      </Typography>
      <div>
        <Button color="primary" href="#" onClick={preventDefault}>
          Edit 
        </Button>
      </div>
    </React.Fragment>
  );
}