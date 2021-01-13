import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import UserCtx from '../../context/User';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Trophy from './Trophy.jpg'
import { useHistory } from 'react-router';

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },

  cover: {
    width: 100,
    height: 100,
    margin: 'auto'
  },
  padding: {
    paddingTop: 30,
    paddingBottom: 30,
  },
});

export default function Information() {
  const classes = useStyles();
  const history = useHistory();
  const [user, setUser] = useContext(UserCtx);
  const [matches, setMatches] = useState(0);
  const [winRate, setWinRate] = useState();

  function stringToHslColor(str, s, l) {
    var hash = 0;
    for (var i = 0; i < str.length; i++) {
      hash = str.charCodeAt(i) + ((hash << 5) - hash);
    }

    var h = hash % 360;
    return 'hsl(' + h + ', ' + s + '%, ' + l + '%)';
  }

  useEffect(() => {
    const api = 'http://localhost:8000/users_api/auth';
    const opts = {
      headers: {
        Authorization: localStorage.getItem('token')
      }
    };
    // Fetch user from API & set user context
    (async (api, opts) => {
      try {
        const res = await axios(api, opts);
        const obj = await res.data;
        setUser(obj.user); // Set user context
      } catch (err) {
        setUser(null); // Set null context
        history.replace('/login'); // Redirect to Login screen
      }
    })(api, opts);
  }, [history, setUser]);

  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const res = await axios(`http://localhost:8000/users_api/win_rate`, {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          });
          const obj = await res.data;
          setWinRate(obj.rate.toFixed(2));
        } catch (err) {
          setWinRate(0);
        }
      })();
    }
  }, [setWinRate, user]);


  useEffect(() => {
    if (user) {
      (async () => {
        try {
          const res = await axios(`http://localhost:8000/users_api/game/matches`, {
            headers: {
              Authorization: localStorage.getItem("token")
            }
          });
          const obj = await res.data;
          setMatches(obj.matches);
        } catch (err) {
          setMatches(0);
        }
      })();
    }
  }, [matches, user]);

  if (user) {
    return (
      <React.Fragment>
        <Title>Thông tin của tôi</Title>
        <Grid container className={classes.padding}>
          <Grid item xs={12} sm={6}>
            {(user.type === 'local') ?
              <Avatar className={classes.cover} style={{ backgroundColor: stringToHslColor(user.profile.name, 100, 50) }}>
                {user.profile.name[0]}
              </Avatar> :
              <Avatar className={classes.cover} alt={user._id} src={user.profile.avatar} />
            }
            <Typography align="center" component="p" variant="h4">
              {user == null ? "Tên:" : user.profile.name}
            </Typography>
            <Typography align="center" color="textSecondary" className={classes.depositContext}>
              Tham gia vào ngày: {user == null ? "10-10-2020" : user.createdAt.slice(0, 10)}
            </Typography>
            <Typography align="center" color="textSecondary" className={classes.depositContext}>
              Số trận đấu đã tham gia: {matches}
          </Typography>
            <Typography align="center" color="textSecondary" className={classes.depositContext}>
              Tỉ lệ thắng: {winRate}%
          </Typography>
          </Grid>
          <Grid item xs={12} sm={6}>
            <Avatar className={classes.cover} alt="Trophy" src={Trophy} />
            <Typography variant="h4" align="center" color="textSecondary" className={classes.depositContext}>
              {user == null ? "100" : user.cup}
            </Typography>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  } else return null;
}