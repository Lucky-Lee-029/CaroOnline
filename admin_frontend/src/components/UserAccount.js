import React, {useState, useEffect} from 'react';
import axios from 'axios';
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

  
function Row(props) {
  const { row } = props;
  const [open, setOpen] = useState(false);
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
          {row.profile.name}
        </TableCell>
        <TableCell align="center">{row.ranking}</TableCell>
        <TableCell align="center">{row.cup}</TableCell>
        <TableCell align="center">{(row.active)?"Không bị khóa":"Bị khóa"}</TableCell>
        <TableCell align="center">
            <BlockedBtn idUser = {row._id} status = {(row.active)?{active: true, text:"Non-Blocked"}:{active: false, text:"Blocked"}}/>
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box margin={1}>
              <Typography variant="h6" gutterBottom component="div">
                <strong>Thông tin chi tiết</strong>
              </Typography>
                <ul>
                    <li>Email: {row.profile.email}</li>
                    <li>Ngày tham gia: {row.createdAt}</li>
                    <li>Số trận đấu đã tham gia: 
                      100
                    </li>
                    <li>Tỉ lệ thắng: 200 %</li>
                </ul>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

// Row.propTypes = {
//   row: PropTypes.shape({
//     ranking: PropTypes.string.isRequired,
//     trophy: PropTypes.number.isRequired,
//     status: PropTypes.string.isRequired,
//     profile: PropTypes.objectOf(
//         PropTypes.shape({
//             name: PropTypes.string.isRequired,
//             email: PropTypes.string.isRequired,
//             dateJoin: PropTypes.string.isRequired,
//             numberMatch: PropTypes.number.isRequired,
//             ratioWinning: PropTypes.number.isRequired,
//         }),
//     ).isRequired,
//   }).isRequired,
// };

const useStylesSearch = makeStyles((theme) => ({
    margin: {
        marginBottom: 30,
    }
  }));


export default function UserAccount() {
    const classSearch = useStylesSearch();
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchValue, setSearchValue] = useState("");
    const [listUser, setListUser] = useState([]);

    useEffect(() => {
      axios.get(`http://localhost:8000/admin_api/users`, {
        headers: {
          Authorization: localStorage.getItem('admin_token')
        }
      })
      .then(res => res.data)
      .then ( (result) => {
        setListUser(result.users);
      })
      .catch(error => console.log(error))
    },[])

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, listUser.length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearch = (event) => {
      setSearchValue(event.target.value);
    };

    function Search (rows) {
      return rows.filter(
        (row) => (row.profile.name).toLowerCase().indexOf(searchValue) > -1 || (row.profile.email).toLowerCase().indexOf(searchValue) > -1
      );
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
                placeholder="Tìm kiếm người chơi"
                variant="outlined"
                value = {searchValue}
                onChange = {handleSearch}
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
            <TableCell align="center"><strong>Tên</strong></TableCell>
            <TableCell align="center"><strong>Hạng</strong></TableCell>
            <TableCell align="center"><strong>Số cúp</strong></TableCell>
            <TableCell align="center"><strong>Trạng thái</strong></TableCell>
            <TableCell align="center"><strong>Lựa chọn</strong></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
            {(rowsPerPage > 0
            ? Search(listUser).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            : Search(listUser)
          ).map((row) => (
            <Row key={row._id} row={row} />
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
              count={listUser.length}
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