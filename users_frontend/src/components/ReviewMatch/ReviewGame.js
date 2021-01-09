import React, { useContext, useEffect, useState} from 'react';
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
    const [step, setStep] = useState(0);
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
        }
    ])
    const [chats, setChats] = useState([]);
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
                                {
                                    history.map((items,index)=>{
                                        return(
                                        <div>
                                        <Button onClick={()=>handleChangeStep(index)}>
                                            #{index}: Player {index%2===0?"X":"O"} at {items.x},{items.y}
                                        </Button>
                                        <br></br>
                                        </div>
                                        )
                                    })
                                }
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
                                                Your info
                                            </TableCell>
                                            <TableCell>
                                                Rival info
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                                <Table>
                                    <TableBody>
                                        <TableRow>
                                            Khung chat
                                        </TableRow>
                                        {
                                            chats.map((item)=>{
                                                return(
                                                    <TableRow>
                                                        {item.content}
                                                    </TableRow>
                                                )
                                            })
                                        }
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
    }
}
export default ReviewGame;