import React, {useState, useEffect, useContext} from 'react';
import axios from 'axios';
import UserCtx from '../../context/User';
import PropTypes from 'prop-types';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableFooter from '@material-ui/core/TableFooter';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import Title from './Title';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router';

// Generate Match Data
function createData(id, date, opponent, result, trophy, winner, loser) {
  return { id, date, opponent, result, trophy, winner, loser };
}

const rows = [
  createData(1, '16 Dec, 2020', 'BlackPink', 'Win', 312, "", ""),
];

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

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



export default function RecentMatch() {
  const [user, setUser] = useContext(UserCtx);
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [matchs, setMatchs] = useState(rows);
  const history = useHistory();
  const emptyRows = rowsPerPage - Math.min(rowsPerPage, rows.length - page * rowsPerPage);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const convertToDate = (millis) => {
    let time = new Date(millis);
    return time.toString().slice(0,24);
  }

  useEffect(()=>{
    if(!user){
      return;
    }
    axios.get(`http://localhost:8000/users_api/game?userId=${user._id}`,{
        headers: {
            Authorization: localStorage.getItem('token'),
        }
    })
    .then(res => {
        const allHistory = res.data.games;
        setMatchs(allHistory);
    })
    .catch(error => console.log(error));
  },[user]);
  const handleViewMatch = (id)=>{
    history.push({
      pathname: '/review',
      state: id,
    });
  };
  return (
    <React.Fragment>
      <Title>Trận đấu gần đây</Title>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell>Thời gian</TableCell>
            <TableCell>Đối thủ</TableCell>
            <TableCell>Kết quả</TableCell>
            <TableCell>Số cúp</TableCell>
            <TableCell align="right">Xem lại</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {(rowsPerPage > 0
            ? matchs.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : matchs
          ).map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.history ? (convertToDate(row.history[1].time)) : "10-10-2010"}</TableCell>
              <TableCell>{(user && row.winner && row.loser) ? (user._id == row.loser._id ? row.winner.profile.name : row.loser.profile.name) : ""}</TableCell>
              <TableCell>{(user) ? (user._id===row.winner._id?"Thắng":"Thua") : "Hòa"}</TableCell>
              <TableCell>{row.cup}</TableCell>
              <TableCell align="right">
              <Button variant="contained" color="primary" onClick={()=>handleViewMatch(row._id)}>
                Xem lại
              </Button>
              </TableCell> 
            </TableRow>
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
              count={matchs.length}
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
    </React.Fragment>
  );
}