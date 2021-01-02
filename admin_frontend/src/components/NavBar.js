import React, { useContext, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import { UserContext } from '../contexts';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';
import Games from '@material-ui/icons/Games';
import { withRouter } from 'react-router-dom';
import io from '../socket';

const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.primary.main,
  },
  appBar: {
    borderBottom: `1px solid ${theme.palette.divider}`,
  },
  toolbar: {
    flexWrap: 'wrap',
  },
  toolbarTitle: {
    flexGrow: 1,
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[700],
  },
  child: {
    marginTop: theme.spacing(10),
  },
  cardPricing: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  footer: {
    borderTop: `1px solid ${theme.palette.divider}`,
    marginTop: theme.spacing(8),
    paddingTop: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing(6),
      paddingBottom: theme.spacing(6),
    },
  },
}));

const NavBar = (props) => {
  const { userCtx, setUserCtx } = useContext(UserContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const classes = useStyles();

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCloseLogout = () => {
    setAnchorEl(null);
    // logout
    localStorage.removeItem("access_token");
    setUserCtx({
      ...userCtx,
      is_auth: true,
      user: null,
    });
    io.emit("logout");
    props.history.replace("/login");
  };

  const handleCloseProfile = () => {
    setAnchorEl(null);
    props.history.push("/profile");
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <AppBar position="fixed" color="default" elevation={0} className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <Avatar className={classes.avatar}>
            <Games />
          </Avatar>
          <Typography variant="h6" color="inherit" noWrap className={classes.toolbarTitle}>
            Caro online
          </Typography>
          <div>
              <IconButton
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorEl}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                open={open}
                onClose={handleClose}
              >
                <MenuItem onClick={handleCloseProfile}>Profile</MenuItem>
                <MenuItem onClick={handleCloseLogout}>
                    Logout
                </MenuItem>
              </Menu>
            </div>
        </Toolbar>
      </AppBar>
      <div className={classes.child}>
        {props.children}
      </div>
    </React.Fragment>
  );
}

export default withRouter(NavBar);
