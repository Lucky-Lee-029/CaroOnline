import React from "react";
import { withRouter } from "react-router";
import SearchAppBar from "../Bar/Bar";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import GridItem from'./Grid';
import QuickJoinRoomBtn from './QuickJoinRoomBtn'
import CreateRoomBtn from './CreateRoomBtn'
import { checkPropTypes } from "prop-types";
const styles = {
    fontFamily: "sans-serif",
    textAlign: "center"
};
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-around',
      overflow: 'hidden',
      //backgroundColor: theme.palette.background.paper,
    },
    gridList: {
      width: 500,
      height: 450,
    },
    gridItem:{
        border: 5,
        borderRadius: 3,
        borderColor: "black",
        textAlign: "center",
    },
    icon: {
      color: 'rgba(255, 255, 255, 0.54)',
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
      },
      title: {
        fontSize: 14,
      },
      pos: {
        marginBottom: 12,
      },
      bull: {

      },
     
  }));
const DashboardComponent=(props)=>{
    const classes=useStyles();
    
    return(
        <div>
            <SearchAppBar/>
            <Grid container className = {classes.root}>
              <Grid container item xs={12} direction="row" justify="space-between" className={classes.functionBtn}>
                <QuickJoinRoomBtn />
                <CreateRoomBtn />
              </Grid>
              <Grid container item xs={12} spacing={2}>
                <Grid item xs={12} sm={4}>
                  <GridItem status="gaming" roomId={1}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <GridItem roomId={2}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <GridItem order="Private" roomId={3}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <GridItem order="Private" roomId={4}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <GridItem roomId={5}/>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <GridItem status="gaming" order="Private" roomId={6}/>
                </Grid>
              </Grid>
            </Grid>
        </div>
    )
}

export default withRouter(DashboardComponent);