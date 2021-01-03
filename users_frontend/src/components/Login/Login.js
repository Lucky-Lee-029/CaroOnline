import React, { useState, useContext } from "react";
import { UserContext } from '../../context';
import { withRouter } from "react-router";
import SearchAppBar from "../Bar/Bar";
import { Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import axios from 'axios';

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

import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

const darktheme = createMuiTheme({
    palette: {
      type: 'dark',
    },
  });

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}



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
  googleBtn: {
    backgroundColor: 'FF0000',
  },

}));
const LoginComponent=(props)=>{
    const classes=useStyles();
    const [username, setUsername]=useState("");
    const [password, setPassword]=useState("");
    const {userCtx, setUserCtx} = useContext(UserContext);
    const handleSubmitLogin=async (event)=>{
        event.preventDefault();
        ( async ()=>{
          try{
            const userLogin={
              username: username,
              password: password
            }
            const res= await axios.post("http://localhost:8000/users_api/auth/", userLogin);
            if(res.data.token){
              localStorage.setItem("access_token", res.data.token);
              setUserCtx({
                ...userCtx,
                is_auth: true,
                user: res.data.user,
              });
              console.log("Passs!");
              // props.history.push("./dashboard");
              props.history.replace("/dashboard");
            }else{
              alert('Login failed');              
            }
          }catch(err){
            
          }
          })();
    }
    const handleUsernameChange = (e) => {
      setUsername(e.target.value);
    }
  
    const handlePasswordChange = (e) => {
      setPassword(e.target.value);
    }
    return(
        <div>
          <ThemeProvider theme = {darktheme}>
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
                      id="username"
                      label="User Name"
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
                      <Link href="#" variant="body2">
                        {"Don't have an account? Sign Up"}
                      </Link>
                    </Grid>
                  </Grid>

                  <Grid  container spacing = {2}>
                    <Grid item xs={12} sm={12}>
                    <Typography align="center" color="textSecondary" >
                      OR
                    </Typography>
                    </Grid>
                    
                    <Grid item className = {classes.marginAuto} xs= {12} sm = {6}>
                    <Button         
                        variant="contained"
                        color="secondary" 
                        fullWidth 
                        aria-label="GoogleLogin" >
                        Google Login
                    </Button>
                    </Grid>
                    <Grid item className = {classes.marginAuto} xs= {12} sm = {6}>
                    <Button 
                      fullWidth 
                      aria-label="FacebookLogin"
                      variant="contained"
                      color="primary">
                      Facebook Login
                    </Button>
                    </Grid>
                  </Grid>
                    <Box mt={5}>
                      <Copyright />
                    </Box>
                  </form>
                </div>
              </Grid>
            </Grid>
          </ThemeProvider>
        </div>
    )
}

export default withRouter(LoginComponent);