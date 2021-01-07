import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from 'axios';
import { withRouter } from "react-router";

// import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';

// const darktheme = createMuiTheme({
//     palette: {
//       type: 'dark',
//     },
//   });

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const SignUp = (props) =>{
  const classes = useStyles();
  const [username, setUsername]=useState("");
  const [password, setPassword]=useState("");
  const [email, setEmail]=useState("");
  const [nickname, setNickname]=useState("");
  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  }
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }
  const handleNicknameChange = (e) => {
    setNickname(e.target.value);
  }

  const handleSubmitSignUp=async (event)=>{
    event.preventDefault();
    ( async ()=>{
      try{
        const userRegister={
          username: username,
          password: password,
          email: email,
          nickname: nickname
        }
        const res= await axios.post("http://localhost:8000/users_api/user/", userRegister);
        if(res.data.user){
          console.log(res.data.user);
          props.history.replace("/");
        }else{
          alert('pass');              
        }
      }catch(err){
        
      }
    })();
  }
  return (
    // <ThemeProvider theme = {darktheme}>
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            Sign up
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmitSignUp}>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                    autoComplete="username"
                    name="userName"
                    variant="outlined"
                    required
                    fullWidth
                    id="userName"
                    label="User Name"
                    autoFocus
                    onChange={handleUsernameChange}
                />
                </Grid>

                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    onChange={handleEmailChange}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    onChange={handlePasswordChange}
                />
                </Grid>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="nickname"
                    label="Nickname"
                    id="nickname"
                    autoComplete="your-nickname"
                    onChange={handleNicknameChange}
                />
                </Grid>
                {/* <Grid item xs={12}>
                <FormControlLabel
                    control={<Checkbox value="allowExtraEmails" color="primary" />}
                    label="I want to receive inspiration, marketing promotions and updates via email."
                />
                </Grid> */}
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Sign Up
            </Button>
            <Grid container justify="flex-end">
                <Grid item>
                <Link href="#" variant="body2">
                    Already have an account? Sign in
                </Link>
                </Grid>
            </Grid>
            </form>
        </div>
        </Container>
    // </ThemeProvider>
  );
}
export default withRouter(SignUp);
