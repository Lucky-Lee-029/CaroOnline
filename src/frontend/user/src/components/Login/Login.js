import React from "react";
import { withRouter } from "react-router";
import SearchAppBar from "../Bar/Bar";
import Typography from '@material-ui/core/Typography';
import { FormControl } from '@material-ui/core';
import { Button } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Axios from 'axios';

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
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
}));
const LoginComponent=(props)=>{
    const classes=useStyles();
    const loginEvent = (email,password) => {
        return Axios.post('http://localhost:3001/login',{email,password})
        .then((res) => {
          console.log(res.data);
          if(res.data==="OK"){
            props.history.push("./dashboard");
          }else{
            console.log(res.data);
            alert("Login failed! Username or password is incorrect.");
            props.history.push("/");
          }
          
        })
        .catch((e) =>{
          console.log(e);
        });
      };
    const handleSubmitLogin=async (event)=>{
        event.preventDefault();
        const email = event.target.elements.email.value;
        const password = event.target.elements.password.value;
        const loginRes=await loginEvent(email,password);
    }
    return(
        <div>
            <SearchAppBar/>
            <Container component="main" maxWidth="xs">
            <div className={classes.paper}>
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
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
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
            </form>
            </div>
            </Container>
        </div>
    )
}

export default withRouter(LoginComponent);