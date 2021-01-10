import axios from 'axios';
import { useState } from "react";
import { useHistory } from "react-router";
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Paper from '@material-ui/core/Paper';
import Box from '@material-ui/core/Box';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Alert from '@material-ui/lab/Alert';
import FacebookLogin from 'react-facebook-login';
import GoogleLogin from 'react-google-login';



const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    //backgroundColor: theme.palette.primary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  marginAuto: {
    margin: 'auto',
    width: 'fullWidth',
  },
}));

function Login(props) {
  const classes = useStyles();
  const history = useHistory();
  const [error, setError] = useState();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

  const fetchData = async (apiUrl, form) => {
    try {
      const res = await axios.post(apiUrl, form);
      const obj = await res.data;

      localStorage.setItem('token', obj.token); // Store token
      history.replace('/'); // Redirect to Dashboard
    } catch (err) {
      setError(err.response.data.msg);
    }
  }

  const handleSubmitLogin = async (event) => {
    event.preventDefault();
    console.log("Name: " + username);
    console.log("pass: " + password);
    fetchData('http://localhost:8000/users_api/auth', {
      username: username,
      password: password
    });
  }

  const responseFacebook = (response) => {
    console.log(response);
    fetchData('http://localhost:8000/users_api/auth/fb', response);
  }

  const responseGoogle = (response) => {
    console.log(response);
    fetchData('http://localhost:8000/users_api/auth/gg', response);
  }

  return (
    <div>
      <Grid container component="main" className={classes.root}>
        <CssBaseline />
        <Grid item xs={false} sm={4} md={7} className={classes.image} />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
          <div className={classes.paper}>
            <Avatar className={classes.avatar}></Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmitLogin}>
              <TextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="email"
                label="User Name"
                name="email"
                autoComplete="email"
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
              <FormControlLabel
                control={<Checkbox value="remember" color="primary" />}
                label="Remember me"
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
              >
                Sign In
                    </Button>
              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                    </Link>
                </Grid>
                <Grid item>
                  <Link href="/signup" variant="body2">
                    {"Don't have an account? Sign Up"}
                  </Link>
                </Grid>
              </Grid>

              <Grid container spacing={2}>
                <Grid item xs={12} sm={12}>
                  <Typography align="center" color="textSecondary" >
                    OR
                    </Typography>
                </Grid>

                <Grid item className={classes.marginAuto} xs={12} sm={6}>
                  <GoogleLogin
                    clientId={process.env.REACT_APP_GG_APP_ID}
                    buttonText="LOGIN WITH GOOGLE"
                    onSuccess={responseGoogle}
                    isSignedIn={false}
                  />
                </Grid>
                <Grid item className={classes.marginAuto} xs={12} sm={6}>
                  <FacebookLogin
                    appId={process.env.REACT_APP_FB_APP_ID}
                    size="small"
                    autoLoad={false}
                    fields="name,email,picture.type(large)"
                    callback={responseFacebook}
                    icon="fa-facebook"
                  />
                </Grid>
              </Grid>
              <Box mt={5}>
                {(props.location.state) ? 
                <Alert severity="success">{props.location.state.success}</Alert> : null}
              </Box>
              <Box mt={5}>
                {(error) ? <Alert severity="error">{error}</Alert> : null}
              </Box>
            </form>
          </div>
        </Grid>
      </Grid>
    </div>
  )
}

export default Login;