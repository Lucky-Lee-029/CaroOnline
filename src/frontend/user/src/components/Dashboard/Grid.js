import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { withRouter } from 'react-router';


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
const GridItem=(props)=>{
    const classes=useStyles();
    const btnText=(props.status==="create")?"Create": "Join";
    return(
        props.status!=="create"?
        <Grid item xs={12} sm={4}>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Waiting...
                    </Typography>
                    <Typography variant="h5" component="h2">
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Room ID: {props.roomId}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" variant="contained" color="primary">Join</Button>
                </CardActions>
            </Card>
        </Grid>
        :
        <Grid item xs={12} sm={4}>
            <Card className={classes.root} variant="outlined">
                <CardContent>
                    <Typography className={classes.title} color="textSecondary" gutterBottom>
                        Waiting game
                    </Typography>
                    <Typography variant="h5" component="h2">
                    </Typography>
                    <Typography className={classes.pos} color="textSecondary">
                        Create an room to wait people...
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button size="small" variant="contained" color="primary">Create</Button>
                </CardActions>
            </Card>
        </Grid>
    )
};
export default withRouter(GridItem);