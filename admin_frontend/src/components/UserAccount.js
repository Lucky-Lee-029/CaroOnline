import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import KeyboardArrowDownIcon from '@material-ui/icons/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@material-ui/icons/KeyboardArrowUp';
import Button from '@material-ui/core/Button';


import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import { Container } from '@material-ui/core';
import {
    Card,
    CardContent,
    TextField,
    InputAdornment,
    SvgIcon,
  } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import BlockedBtn from './BlockedBtn';

//Pagination
const useStyles1 = makeStyles((theme) => ({
    root: {
      flexShrink: 0,
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
  
//End Pagination
//
const useRowStyles = makeStyles({
  root: {
    '& > *': {
      borderBottom: 'unset',
    },
  },
});


const rows = [
    {
        username: 'Gia Lợi',
        rank: 1,
        trophy: 30,
        status: 'Non-Blocked', 
        detail: 
        {
            email: 'gialoi@gmail.com',
            dateJoin: '2020-12-15',
            numberMatch: 100,
            ratioWinning: 90,      
        },
      },
      {
        username: 'Phi Long',
        rank: 2,
        trophy: 27,
        status: 'Non-Blocked', 
        detail: 
        {
            email: 'philong@gmail.com',
            dateJoin: '2020-12-15',
            numberMatch: 100,
            ratioWinning: 85,      
        },
      },
      {
        username: 'Hải Lê',
        rank: 3,
        trophy: 20,
        status: 'Non-Blocked', 
        detail: 
        {
            email: 'haile@gmail.com',
            dateJoin: '2020-12-15',
            numberMatch: 100,
            ratioWinning: 80,      
        },
      },
      {
        username: 'IU',
        rank: 8,
        trophy: 1,
        status: 'Blocked', 
        detail: 
        {
            email: 'iu@gmail.com',
            dateJoin: '2020-12-15',
            numberMatch: 100,
            ratioWinning: 10,      
        },
      },
      {
        username: 'BlackPink',
        rank: 4,
        trophy: 15,
        status: 'Non-Blocked', 
        detail: 
        {
            email: 'bp@gmail.com',
            dateJoin: '2020-12-15',
            numberMatch: 100,
            ratioWinning: 70,      
        },
      },
      {
        username: 'Bulb',
        rank: 8,
        trophy: 7,
        status: 'Non-Blocked', 
        detail: 
        {
            email: 'bp@gmail.com',
            dateJoin: '2020-12-15',
            numberMatch: 100,
            ratioWinning: 60,      
        },
      },
  ];


  
function Row(props) {
  const { row } = props;
  const [open, setOpen] = React.useState(false);
  const classes = useRowStyles();

  return (
    <React.Fragment>
      <TableRow className={classes.root}>
        <TableCell >
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="center" component="th" scope="row">
          {row.username}
        </TableCell>
        <TableCell align="center">{row.rank}</TableCell>
        <TableCell align="center">{row.trophy}</TableCell>
        <TableCell align="center">{row.status}</TableCell>
        <TableCell align="center">
            <BlockedBtn status = {row.status}/>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                <strong>Details User Information</strong>
              </Typography>
                <ul>
                    <li>Emai: {row.detail.email}</li>
                    <li>Date Join: {row.detail.dateJoin}</li>
                    <li>Number of matches participated: {row.detail.numberMatch}</li>
                    <li>Ratio of winning: {row.detail.ratioWinning} %</li>
                </ul>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    username: PropTypes.string.isRequired,
    rank: PropTypes.number.isRequired,
    trophy: PropTypes.number.isRequired,
    status: PropTypes.string.isRequired,
    detail: PropTypes.objectOf(
        PropTypes.shape({
            email: PropTypes.string.isRequired,
            dateJoin: PropTypes.string.isRequired,
            numberMatch: PropTypes.number.isRequired,
            ratioWinning: PropTypes.number.isRequired,
        }),
    ).isRequired,
  }).isRequired,
};

const useStylesSearch = makeStyles((theme) => ({
    margin: {
        marginBottom: 30,
    }
  }));

export default function UserAccount() {
    const classSearch = useStylesSearch();
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
    <Container>
    {/* Search tool */}
    <Box className = {classSearch.margin} mt={3}>
        <Card>
          <CardContent>
            <Box maxWidth={500}>
              <TextField
                fullWidth
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SvgIcon
                        fontSize="small"
                        color="action"
                      >
                        <SearchIcon />
                      </SvgIcon>
                    </InputAdornment>
                  )
                }}
                placeholder="Search user"
                variant="outlined"
              />
            </Box>
          </CardContent>
        </Card>
    </Box>
    <TableContainer component={Paper}>
      <Table aria-label="collapsible table">
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell align="center"><strong>User Name</strong></TableCell>
            <TableCell align="center"><strong>Rank</strong></TableCell>
            <TableCell align="center"><strong>Trophy</strong></TableCell>
            <TableCell align="center"><strong>Status</strong></TableCell>
            <TableCell align="center"><strong>Option</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {(rowsPerPage > 0
            ? rows.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : rows
          ).map((row) => (
            <Row key={row.username} row={row} />
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
  );
}