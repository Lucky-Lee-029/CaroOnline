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
    const { history } = props;
    const { stepNumber } = props;
    const { nextMove } = props;
    const { winCells } = props;
    const { accendingMode } = props;
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
                                currentCell={[1,2]}
                                handleClick={(i, j) => console.log(i,j)}/>
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
}

export default Game;