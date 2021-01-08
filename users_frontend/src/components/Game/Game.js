import React, { useContext, useEffect, useState, useCallback, useMemo } from 'react';
import { withRouter } from "react-router";
import Board from './Board';
import Config from '../../constants/configs';
import Status from './Status';
import UserCtx from '../../context/User';
import './css/game.css';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';
import { nspOnlineUsers } from '../../socket';

const Game=(props)=>{
    let isYourTurn;
    const { stepNumber } = props;
    const { nextMove } = props;
    const { winCells } = props;
    const { accendingMode } = props;
    const [user, setUser] = useContext(UserCtx);
    const [currentSquare, setCurrentSquare] = useState({x:0,y:0});
    const [step, setStep ] = useState(0);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [history, setHistory] = useState([{
        x: null,
        y: null,
        squares: Array(Config.brdSize).fill(null).map(() => {
            return Array(Config.brdSize).fill(null)
        })
    }])
    useEffect(()=>{
        // if(!nspOnlineUsers.hasListener("got_new_step")){
            nspOnlineUsers.on("got_new_step", (data)=>{
                handleNewStep(data);
            });
        // }
    },[]);
    useEffect(()=>{
        console.log("STEP" + step);
        console.log("Data lenght: " + history.length);
        setStep(history.length - 1);
    },[history]);
    // board game
    // const current = history[stepNumber];
    // const sortMode = accendingMode ? `Nước đi tăng dần` : `Nước đi giảm dần`;
    const moves = [];
    const isPlayerX=true;
    return(
        <div className="App">
            <header className="App-header">
                <Status 
                    messages="{winCells}"/>
                <div className="board-game">
                    <div>
                        <Card className="card">
                            <CardContent>
                                My infor
                            </CardContent>
                        </Card>
                    </div>
                    <br></br>
                    <div>
                        <Board  winCells={null}
                                squares = {history[history.length - 1].squares}
                                currentPlayer={currentPlayer}
                                currentCell={currentSquare}
                                handleClick={userClick}/>
                    </div>
                                        
                    <br></br>
                    
                    <div>
                        <Card className="card">
                            <CardContent>
                                Rival infor
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </header>
        </div>
    )
    function checkWin(row, col, user, stepNumber) {

        if (stepNumber === 0) {
            return null;
        }

        const current = history[stepNumber];
        const squares = current.squares.slice();

        // Get coordinates
        let coorX = row;
        let coorY = col;
 
        let countCol = 1;
        let countRow = 1;
        let countMainDiagonal = 1;
        let countSkewDiagonal = 1;
        let isBlock;
        const rival = (user === Config.xPlayer) ? Config.oPlayer : Config.xPlayer;
  
        // Check col
        isBlock = true;
        let winCells = [];
        coorX -= 1;
        while(coorX >= 0 && squares[coorX][coorY] === user) {
            countCol += 1;
            winCells.push([coorX, coorY]);
            coorX -= 1;
        }
        if (coorX >= 0 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorX = row;
        winCells.push([coorX, coorY]);
        coorX += 1;
        while(coorX <= Config.brdSize - 1 && squares[coorX][coorY] === user) {
            countCol += 1;
            winCells.push([coorX, coorY]);
            coorX += 1;
        }
        if (coorX <= Config.brdSize - 1 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorX = row;
        if (isBlock === false && countCol >= 5) return winCells;
 
        // Check row
        isBlock = true;
        winCells = [];
        coorY -= 1;
        while(coorY >= 0 && squares[coorX][coorY] === user) {
            countRow += 1;
            winCells.push([coorX, coorY]);
            coorY -= 1;
        }
        if (coorY >= 0 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorY = col;
        winCells.push([coorX, coorY]);
        coorY += 1;
        while(coorY <= Config.brdSize - 1 && squares[coorX][coorY] === user) {
            countRow += 1;
            winCells.push([coorX, coorY]);
            coorY += 1;
        }
        if (coorY <= Config.brdSize - 1 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorY = col;
        if (isBlock === false && countRow >= 5) return winCells;

        // Check main diagonal
        isBlock = true;
        winCells = [];
        coorX -= 1;
        coorY -= 1;
        while(coorX >= 0 && coorY >= 0 && squares[coorX][coorY] === user) {
            countMainDiagonal += 1;
            winCells.push([coorX, coorY]);
            coorX -= 1;
            coorY -= 1;
        }
        if (coorX >= 0 && coorY >= 0 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorX = row;
        coorY = col;
        winCells.push([coorX, coorY]);
        coorX += 1;
        coorY += 1;
        while(coorX <= Config.brdSize - 1 && coorY <= Config.brdSize - 1 && squares[coorX][coorY] === user) {
            countMainDiagonal += 1;
            winCells.push([coorX, coorY]);
            coorX += 1;
            coorY += 1;
        }
        if (coorX <= Config.brdSize - 1 && coorY <= Config.brdSize - 1 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorX = row;
        coorY = col;
        if (isBlock === false && countMainDiagonal >= 5) return winCells;

        // Check skew diagonal
        isBlock = true;
        winCells = [];
        coorX -= 1;
        coorY += 1;
        while(coorX >= 0 && coorY >= 0 && squares[coorX][coorY] === user) {
            countSkewDiagonal += 1;
            winCells.push([coorX, coorY]);
            coorX -= 1;
            coorY += 1;
        }
        if (coorX >= 0 && coorY >= 0 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        coorX = row;
        coorY = col;
        winCells.push([coorX, coorY]);
        coorX += 1;
        coorY -= 1;
        while(coorX <= Config.brdSize - 1 && coorY <= Config.brdSize - 1 && squares[coorX][coorY] === user) {
            countSkewDiagonal += 1;
            winCells.push([coorX, coorY]);
            coorX += 1;
            coorY -= 1;
        }
        if (coorX <= Config.brdSize - 1 && coorY <= Config.brdSize - 1 && squares[coorX][coorY] !== rival) {
            isBlock = false;
        }
        if (isBlock === false && countSkewDiagonal >= 5) return winCells;

        return null;
    }

    function userClick(row, col) {
        // const { nextMove } = props;

        // Prevent user click if not his turn
        // if ((isPlayerX && nextMove === Config.oPlayer) || (!isPlayerX && nextMove === Config.xPlayer)) {
        //     return;
        // }
        // if(!isYourTurn){
        //     console.log("prevent!!");
        //     return;
        // }
        let currentUser = (history.length % 2 !== 0) ? Config.xPlayer : Config.oPlayer;
        if(step > 0){
            if(history[step].squares[row][col] !== null)
                return;
        }
        console.log("" + row + ", " + col);
        console.log(currentPlayer);
        setCurrentPlayer(1-currentPlayer);
        let currentHis = history;

        setCurrentSquare({x: row, y: col});
        let newState = {
            x: row,
            y: col,
            squares: history[step].squares
        };
        newState.squares[row][col] = currentUser;
        // let newHis = currentHis.concat(newState);
        currentHis.push(newState);
        setHistory(currentHis);
        // let newStep = step + 1;
        
        if(checkWin(row, col, currentUser, step)){
            console.log("WON");
            nspOnlineUsers.emit("win_game");
        }
        console.log("Step: " + step);
        nspOnlineUsers.emit("play_new_step", newState);
        setStep(step + 1);
    }
    function handleNewStep(data){
        let currentUser = (history.length % 2 !== 0) ? Config.xPlayer : Config.oPlayer;
        let currentHis = history;
        // setCurrentPlayer(1-currentPlayer);
        // setCurrentSquare({x: data.x, y: data.y});
        let newState = data;
        console.log("current user: "+ currentUser);
        newState.squares[data.x][data.y] = currentUser;
        const newHis = currentHis.concat(newState);
        setHistory(newHis);
    }
}

export default Game;