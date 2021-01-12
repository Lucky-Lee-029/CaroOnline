import React, {useContext} from 'react';
import Button from '@material-ui/core/Button';
import UserCtx from '../../context/User';
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
  const [user, setUser] = useContext(UserCtx);
  console.log("user", user);
  return (
    <React.Fragment>
      <Title>Hồ sơ của tôi</Title>
      <Grid container>
        <Grid item xs={12} sm ={6}>
          <Typography component="p" variant="h4">
            {user==null? "Tên:" : user.profile.name}
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            Join: {user==null? "10-10-2020" : user.createdAt.slice(0,10)}
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            Number of matches participated: 1000
          </Typography>
          <Typography color="textSecondary" className={classes.depositContext}>
            Ratio of winning: 90% 
          </Typography>
        </Grid>
        <Grid item xs={12} sm ={6}>
          <Avatar className = {classes.cover} alt="Trophy" src={Trophy} />
          <Typography variant="h4" align="center" color="textSecondary" className={classes.depositContext}>
            {user==null? "100" : user.cup}
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