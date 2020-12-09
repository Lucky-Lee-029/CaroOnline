import { useState, useContext } from 'react';
import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  TextField,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';
import Alert from '@material-ui/lab/Alert';
import { withRouter } from 'react-router-dom';
import { UserContext } from '../contexts';
import axios from 'axios';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(5),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

// init state
const initUserState = {
  username: "",
  password: "",
};
const initAlertState = {
  visible: false,
  serverity: "",
  msg: "",
};

const SignIn = (props) => {
  const [user, setUser] = useState(initUserState);
  const [alert, setAlert] = useState(initAlertState);
  const {userCtx, setUserCtx} = useContext(UserContext);

  const classes = useStyles();

  const handleSignIn = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const res = await axios.post(process.env.REACT_APP_API_URL + "/auth/admin", user)
        if (res.data.success) {
          localStorage.setItem("access_token", res.data.body.token);
          setUserCtx({
              ...userCtx,
              is_auth: true,
              user: res.data.body.user,
              });
          props.history.replace("/");
        }
      } catch (err) {
        setAlert({
          ...alert,
          visible: true,
          serverity: "error",
          msg: err.response.data.msg
        });
      }
    })();
  }

  const handleUsernameChange = (e) => {
    setUser({ ...user, username: e.target.value });
    setAlert(initAlertState);
  }

  const handlePasswordChange = (e) => {
    setUser({ ...user, password: e.target.value });
    setAlert(initAlertState);
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <AccountCircle />
        </Avatar>
        <Typography component="h1" variant="h5">
          Administrator
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSignIn}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            onChange={handleUsernameChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handlePasswordChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Sign in as Admin
          </Button>
        </form>
      </div>
      <br />
      { alert.visible ?
        <Alert variant="filled" severity={alert.serverity}>
          Alert: {alert.msg}
        </Alert>
        : ""
      }
    </Container>
  );
}

export default withRouter(SignIn);
