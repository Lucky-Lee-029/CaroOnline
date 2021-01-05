import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import CssBaseline from '@material-ui/core/CssBaseline';
import Grid from '@material-ui/core/Grid';
import StarIcon from '@material-ui/icons/StarBorder';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Trophy from './Trophy.jpg'
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableContainer from '@material-ui/core/TableContainer';
import Paper from '@material-ui/core/Paper';


const useStyles = makeStyles((theme) => ({
  '@global': {
    ul: {
      margin: 0,
      padding: 0,
      listStyle: 'none',
    },
  },
  link: {
    margin: theme.spacing(1, 1.5),
  },
  heroContent: {
    padding: theme.spacing(8, 0, 6),
  },
  cardHeader: {
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.common.black : theme.palette.common.white,
    color: 'white',
  },
  subheader:{
    color: 'white',
  },
  cardChart: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'baseline',
    marginBottom: theme.spacing(2),
  },
  cover: {
    marginLeft: 20,
  },
  table: {
    minWidth: 700,
  },
  tableContainer: {
    marginTop: 30,
    marginBottom: 50,
  },
}));

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);

const topusers = [
  {
    title: '2nd Player',
    username: 'Phi Long',
    trophy: '25',
    // description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
  },
  {
    title: '1st Player',
    subheader: 'Pro Player',
    username: 'Gia Lợi',
    trophy: '30',
  },
  {
    title: '3rd Player',
    username: 'Hải Lê',
    trophy: '21',
  },
];

function createData(id, rank, username, ratio, trophy) {
  return { id, rank, username, ratio, trophy };
}

const rows = [
  createData(4, 4, 'BlackPink', '80%', 10),
  createData(5, 5, 'BlackPink', '80%', 10),
  createData(6, 6, 'BlackPink', '80%', 10),
  createData(7, 7, 'BlackPink', '80%', 10),
  createData(8, 8, 'BlackPink', '80%', 10),
  createData(9, 9, 'BlackPink', '80%', 10),
  createData(10, 10, 'BlackPink', '80%', 10),
];


export default function Chart() {
  const classes = useStyles();

  return (
    <React.Fragment>
      <CssBaseline />
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
          CHART
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Top Pro Player
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {topusers.map((user) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={user.title} xs={12} sm={user.title === '3rd Player' ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={user.title}
                  subheader={user.username}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={user.title === '1st Player' ? <StarIcon /> : null}
                  className={classes.cardHeader}>
                  </CardHeader>
                <CardContent>
                  <div className={classes.cardChart}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      {user.trophy}
                    </Typography>
                    <Avatar className = {classes.cover} alt="Trophy" src={Trophy} />
                  </div>
                  {/* <ul>
                    {user.description.map((line) => (
                      <Typography component="li" variant="subtitle1" align="center" key={line}>
                        {line}
                      </Typography>
                    ))}
                  </ul> */}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <TableContainer className = {classes.tableContainer} component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Rank</StyledTableCell>
                <StyledTableCell align="center">User Name</StyledTableCell>
                <StyledTableCell align="center">Ratio</StyledTableCell>
                <StyledTableCell align="center">Trophy</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.rank}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.username}</StyledTableCell>
                  <StyledTableCell align="center">{row.ratio}</StyledTableCell>
                  <StyledTableCell align="center">{row.trophy} </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
    </TableContainer>
      </Container>
    </React.Fragment>
  );
}