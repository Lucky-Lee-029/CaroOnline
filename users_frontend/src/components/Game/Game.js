import React, { useState } from 'react';
import { withRouter } from "react-router";
import Board from './Board';
import Config from '../../constants/configs';
import Status from './Status';
import './css/game.css';
import axios from 'axios';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import { makeStyles } from '@material-ui/core/styles';

const Game=(props)=>{
    const { stepNumber } = props;
    const { nextMove } = props;
    const { winCells } = props;
    const { accendingMode } = props;
    const [currentSquare, setCurrentSquare] = useState({x:0,y:0});
    const [ step, setStep ] = useState(0);
    const [currentPlayer, setCurrentPlayer] = useState(0);
    const [history, setHistory] = useState([{
        x: null,
        y: null,
        squares: Array(Config.brdSize).fill(null).map(() => {
            return Array(Config.brdSize).fill(null)
        })
    }])
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
                                //squares={current.squares}
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
        let currentUser = (currentPlayer === 0) ? Config.xPlayer : Config.oPlayer;
        if(step > 0){
            if(history[step].squares[row][col] !== null)
                return;
        }
        console.log("" + row + ", " + col);
        console.log(currentPlayer);
        setStep(step +1);
        setCurrentPlayer(1-currentPlayer);
        let currentHis = history;
        console.log("Step: " + step);
        setCurrentSquare({x: row, y: col});
        let newState = {
            x: row,
            y: col,
            squares: history[step].squares
        };
        newState.squares[row][col] = currentUser;
        currentHis.push(newState);
        setHistory(currentHis);
        if(checkWin(row, col, currentUser, step)){
            console.log("WON");
        }
        
    }
}

export default Game;