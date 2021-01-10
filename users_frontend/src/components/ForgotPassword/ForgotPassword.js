import React, {useState} from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

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

export default function ForgotPassword() {
  const classes = useStyles();
  const [btnText, setBtnText] = useState('SEND CODE');
  const [colorText, setColorText] = useState('primary');
  const [open, setOpen] = useState(false);


  const handleSendCode = () => {
    setBtnText('RESEND CODE');
    setColorText('secondary')
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setOpen(true); 
  };

  const handleClose = () => {
    setOpen(false); 
};

  return (
        <Container component="main" maxWidth="xs">
        <CssBaseline />
        <div className={classes.paper}>
            <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
            FORGOT PASSWORD
            </Typography>
            <form className={classes.form} noValidate>
            <Grid container spacing={2}>
                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
                />
                </Grid>
                <Grid item>
                    <Button color={colorText} onClick = {handleSendCode}>{btnText}</Button>
                </Grid>

                <Grid item xs={12}>
                <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="verificationCode"
                    label="Verification Code"
                    type="verificationCode"
                    id="verificationCode"
                    autoComplete="verificationCode"
                />
                </Grid>
            </Grid>
            <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
                onClick = {handleSubmit}
            >
                Verify
            </Button>
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <DialogTitle id="form-dialog-title">NEW PASSWORD</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Please enter your new password
                    </DialogContentText>
                    <TextField
                    autoFocus
                    margin="dense"
                    id="newPassword"
                    label="Password"
                    type="newPassword"
                    fullWidth
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} color="primary">
                        Cancel
                    </Button>
                    <Button onClick={handleClose} color="primary">
                        Enter
                    </Button>
                </DialogActions>
            </Dialog>
            </form>
        </div>
        </Container>
  );
}