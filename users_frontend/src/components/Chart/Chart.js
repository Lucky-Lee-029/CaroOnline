import React from 'react';
import PropTypes from 'prop-types';
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
import { makeStyles, withStyles, useTheme } from '@material-ui/core/styles';
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
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { green } from '@material-ui/core/colors';


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
      theme.palette.type === 'light' ? green[600] : theme.palette.common.white,
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
    backgroundColor: green[600],
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
    title: 'Hạng 2',
    username: 'Phi Long',
    trophy: '25',
    // description: ['10 users included', '2 GB of storage', 'Help center access', 'Email support'],
  },
  {
    title: 'Hạng 1',
    subheader: 'Pro Player',
    username: 'Gia Lợi',
    trophy: '30',
  },
  {
    title: 'Hạng 3',
    username: 'Hải Lê',
    trophy: '21',
  },
];

function createData(id, rank, username, ratio, trophy) {
  return { id, rank, username, ratio, trophy };
}

const rows = [
  createData(1, 1, 'Gia Lợi', '95%', 30),
  createData(2, 2, 'Phi Long', '90%', 25),
  createData(3, 3, 'Hải Lê', '85%', 21),
  createData(4, 4, 'BlackPink', '80%', 10),
  createData(5, 5, 'BlackPink', '80%', 10),
  createData(6, 6, 'BlackPink', '80%', 10),
  createData(7, 7, 'BlackPink', '80%', 10),
  createData(8, 8, 'BlackPink', '80%', 10),
  createData(9, 9, 'BlackPink', '80%', 10),
  createData(10, 10, 'BlackPink', '80%', 10),
  createData(11, 11, 'BlackPink', '80%', 10),
  createData(12, 12, 'BlackPink', '80%', 10),
  createData(13, 13, 'IU', '80%', 10),
  createData(14, 14, 'IU', '80%', 10),
  createData(15, 15, 'IU', '80%', 10),
  createData(16, 16, 'IU', '80%', 10),
  createData(17, 17, 'IU', '80%', 10),
];

//Pagination
const useStyles1 = makeStyles((theme) => ({
  root: {
    flexShrink: 0,
    marginLeft: theme.spacing(2.5),
  },
}));
function TablePaginationActions(props) {
  const classes = useStyles1();
  const theme = useTheme();
  const { count, page, rowsPerPage, onChangePage } = props;

  const handleFirstPageButtonClick = (event) => {
    onChangePage(event, 0);
  };

  const handleBackButtonClick = (event) => {
    onChangePage(event, page - 1);
  };

  const handleNextButtonClick = (event) => {
    onChangePage(event, page + 1);
  };

  const handleLastPageButtonClick = (event) => {
    onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
  };

  return (
    <div className={classes.root}>
      <IconButton
        onClick={handleFirstPageButtonClick}
        disabled={page === 0}
        aria-label="first page"
      >
        {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
      </IconButton>
      <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
        {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
      </IconButton>
      <IconButton
        onClick={handleNextButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="next page"
      >
        {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
      </IconButton>
      <IconButton
        onClick={handleLastPageButtonClick}
        disabled={page >= Math.ceil(count / rowsPerPage) - 1}
        aria-label="last page"
      >
        {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
      </IconButton>
    </div>
  );
}

TablePaginationActions.propTypes = {
  count: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
  rowsPerPage: PropTypes.number.isRequired,
};


export default function Chart() {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);

  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return (
    <React.Fragment>
      <CssBaseline />
      {/* Hero unit */}
      <Container maxWidth="sm" component="main" className={classes.heroContent}>
        <Typography component="h2" variant="h2" align="center" color="textPrimary" gutterBottom>
          BẢNG XẾP HẠNG
        </Typography>
        <Typography variant="h5" align="center" color="textSecondary" component="p">
          Top những người chơi tại Caro Online
        </Typography>
      </Container>
      {/* End hero unit */}
      <Container maxWidth="md" component="main">
        <Grid container spacing={5} alignItems="flex-end">
          {topusers.map((user) => (
            // Enterprise card is full width at sm breakpoint
            <Grid item key={user.title} xs={12} sm={user.title === 'Hạng 3' ? 12 : 6} md={4}>
              <Card>
                <CardHeader
                  title={user.title}
                  titleTypographyProps={{ align: 'center' }}
                  subheaderTypographyProps={{ align: 'center' }}
                  action={user.title === 'Hạng 1' ? <StarIcon /> : null}
                  className={classes.cardHeader}>
                  </CardHeader>
                <CardContent>
                <Typography align="center" component="h2" variant="h4" color="textPrimary">
                      {user.username}
                    </Typography>
                  <div className={classes.cardChart}>
                    <Typography component="h2" variant="h3" color="textPrimary">
                      {user.trophy}
                    </Typography>
                    <Avatar className = {classes.cover} alt="Trophy" src={Trophy} />
                  </div>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <TableContainer className = {classes.tableContainer} component={Paper}>
          <Table className={classes.table} aria-label="customized table">
            <TableHead>
              <TableRow>
                <StyledTableCell align="center">Hạng</StyledTableCell>
                <StyledTableCell align="center">Tên</StyledTableCell>
                <StyledTableCell align="center">Tỉ lệ thắng</StyledTableCell>
                <StyledTableCell align="center">Số cúp</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                {(rowsPerPage > 0
                ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : rows
                ).map((row) => (
                <StyledTableRow key={row.name}>
                  <StyledTableCell align="center" component="th" scope="row">
                    {row.rank}
                  </StyledTableCell>
                  <StyledTableCell align="center">{row.username}</StyledTableCell>
                  <StyledTableCell align="center">{row.ratio}</StyledTableCell>
                  <StyledTableCell align="center">{row.trophy} </StyledTableCell>
                </StyledTableRow>
              ))}
              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows }}>
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
            <TableFooter>
          <TableRow>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
              colSpan={3}
              count={rows.length}
              rowsPerPage={rowsPerPage}
              page={page}
              SelectProps={{
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              }}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
          </Table>
    </TableContainer>
      </Container>
    </React.Fragment>
  );
}