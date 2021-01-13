import React, { useContext, useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Board from '../Game/Board';
import Config from '../../constants/configs';
import UserCtx from '../../context/User';
import '../Game/css/game.css';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow';
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
const useStyles = makeStyles((theme) => ({
    root: {
      width: '100%',
      height: '100%',
      maxWidth: 360,
      backgroundColor: theme.palette.background.paper,
      position: 'relative',
      overflow: 'auto',
      maxHeight: 400,
    },
    listSection: {
      backgroundColor: 'inherit',
    },
    ul: {
      backgroundColor: 'inherit',
      padding: 0,
    },
}));
const sq1 = Array(Config.brdSize).fill(null).map(() => {
    return Array(Config.brdSize).fill(null)
});
sq1[4][5]="X";

const sq2 = Array(Config.brdSize).fill(null).map(() => {
    return Array(Config.brdSize).fill(null)
});
sq2[1][4]="0";

const sq3 = Array(Config.brdSize).fill(null).map(() => {
    return Array(Config.brdSize).fill(null)
});
sq3[4][3]="X";
const sq4 = Array(Config.brdSize).fill(null).map(() => {
    return Array(Config.brdSize).fill(null)
});
sq4[1][4]="0";


const ReviewGame=(props)=>{
    const classes = useStyles();
    const [step, setStep] = useState(0);
    const [winner, setWinner] = useState("");
    const [loser, setLoser] = useState("");
    const [winnerProfile, setWinnerProfile] = useState("");
    const [loserProfile, setLoserProfile] = useState("");
    const [stepchat, setStepchat] = useState(0);
    const [history, setHistory] = useState([
        {
            x: null,
            y: null,
            squares: Array(Config.brdSize).fill(null).map(() => {
                return Array(Config.brdSize).fill(null)
            })
        },
        {
            x: 1,
            y: 1,
            squares: sq1
        },
        {
            x: 2,
            y: 2,
            squares: sq2
        },
        {
            x: 2,
            y: 4,
            squares: sq3
        },
        {
            x: 1,
            y: 1,
            squares: sq1
        },
        {
            x: 2,
            y: 2,
            squares: sq2
        },
        {
            x: 2,
            y: 4,
            squares: sq3
        },
        {
            x: 1,
            y: 1,
            squares: sq1
        },
        {
            x: 2,
            y: 2,
            squares: sq2
        },
        {
            x: 2,
            y: 4,
            squares: sq3
        },
        {
            x: 2,
            y: 2,
            squares: sq2
        },
        {
            x: 2,
            y: 4,
            squares: sq3
        }
    ])
    const [match, setMatch] = useState(props.location.state);
    const [chats, setChats] = useState([{content: "AAAAAA"}]);

    useEffect(()=>{
        if(!match){
            return;
        }
        axios.get(`http://localhost:8000/users_api/game?id=${match}`,{
            headers: {
                Authorization: localStorage.getItem('token'),
            }
        })
        .then(res => {
            const allHistory = res.data.games[0];
            console.log(allHistory);
            setWinner(allHistory.winner.profile.name);
            setLoser(allHistory.loser.profile.name);
            setChats(allHistory.chats);
            setHistory(allHistory.history);
        })
        .catch(error => console.log(error));
    },[match])

    useEffect(()=>{

    },[winner])

    return(
        <div className="App"> 
            <header className="App-header">
                {/* <Status 
                    messages={winner ? ("Winner: " + winner) : "Playing..."}/> */}
                <div className="board-game-review">
                    <div>
                        <Board  winCells={null}
                                squares = {history[step].squares}
                                currentPlayer={"X"}
                                currentCell={{x:history[step].x,y:history[step].y}}
                                handleClick={handleClick}/>
                    </div>
                    <br></br>
                    <div>
                        <Card className="card-review">
                            <CardContent>
                                <h3>Danh sách nước đi</h3>
                                <List cols={1} className={classes.root}>
                                {
                                    history.map((items,index)=>{
                                        return(
                                        <ListItem key={index}>
                                        <Button className="btnStep" variant="contained" color={index===step?"primary":""} onClick={()=>handleChangeStep(index)}>
                                            #{index}: Player {index%2===0?"X":"O"} at {items.x},{items.y}
                                        </Button>
                                        </ListItem  >
                                        )
                                    })
                                }
                                </List>
                            </CardContent>
                        </Card>
                    </div>
                    <br></br>
                    <div>
                        <Card className="card-review">
                            <CardContent>
                                <Table aria-label="custom pagination table">
                                    <TableBody>
                                        <TableRow>
                                            <TableCell>
                                                Người chơi thắng: {winner}
                                            </TableCell>
                                            <TableCell>
                                                Người chơi thua: {loser}
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            Khung chat
                                        </TableRow>
                                        <List>
                                        {
                                            chats.filter((element, index)=>{return index<=stepchat}).map((item)=>{
                                                return(
                                                    <ListItem>
                                                        {item.content}
                                                    </ListItem>
                                                )
                                            })
                                        }
                                        </List>
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </header>
        </div>
    )
    function handleClick(i,j){
        return;
    }
    function handleChangeStep(step){
        setStep(step);
        let timeStep = history[step].time;
        setStepchat(findStepChat(timeStep));
    }
    function findStepChat(timeStep){
        for(let i=0; i< chats.length;i++){
            if(chats[i].time > timeStep){
                return i-1;
            }
        }
        return chats.length -1;
    }
}
export default ReviewGame;