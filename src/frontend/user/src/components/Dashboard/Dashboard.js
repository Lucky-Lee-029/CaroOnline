import React from "react";
import { withRouter } from "react-router";
import SearchAppBar from "../Bar/Bar";
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import GridItem from'./Grid';
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
      backgroundColor: theme.palette.background.paper,
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

      }
  }));
const DashboardComponent=(props)=>{
    const classes=useStyles();
    const handleClickJoinGame=()=>{
        props.history.push("./game");
    }
    return(
        <div>
            <SearchAppBar/>
            <Container >
                <div style={styles}>
                    <h1>Caro online project make by HLL</h1>
                </div>
                <Grid container spacing={6}>
                    <GridItem status="create"/>
                    <GridItem roomId={6}/>
                    <GridItem roomId={6}/>
                    <GridItem roomId={6}/>
                 </Grid> 
            </Container>
        </div>
    )
}

export default withRouter(DashboardComponent);