import React from 'react';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Trophy from './Trophy.jpg'

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },

cover: {
    width: 100,
    height: 100,
    margin: 'auto'
  },
  
});

export default function Information() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <Title>My Profile</Title>
      <Grid container>
        <Grid item xs={12} sm ={6}>
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
        </Grid>
        <Grid item xs={12} sm ={6}>
          <Avatar className = {classes.cover} alt="Trophy" src={Trophy} />
          <Typography variant="h4" align="center" color="textSecondary" className={classes.depositContext}>
            450
          </Typography>
        </Grid>
      </Grid>
      <div>
        <Button color="primary" onClick={preventDefault}>
          Edit 
        </Button>
      </div>
    </React.Fragment>
  );
}