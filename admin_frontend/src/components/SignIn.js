import { useState } from 'react';
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
import axios from 'axios';
import { useHistory } from 'react-router-dom';

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

const initAlertState = {
  visible: false,
  serverity: "",
  msg: "",
};

const SignIn = (props) => {
  const history = useHistory();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [alert, setAlert] = useState(initAlertState);

  const classes = useStyles();

  const handleSignIn = (e) => {
    e.preventDefault();
    (async () => {
      try {
        const res = await axios.post("http://localhost:8000/admin_api/auth", {
          username,
          password
        });
        const obj = await res.data;
        if (obj.admin) {
          localStorage.setItem("admin_token", obj.token);
          history.replace('/');
        }
      } catch (err) {
        setAlert({
          visible: true,
          serverity: "error",
          msg: err.response.data.msg
        });
      }
    })();
  }

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setAlert(initAlertState);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
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
          Trang quản lý
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
            label="Mật khẩu"
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
            Đăng nhập admin
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

export default SignIn;
