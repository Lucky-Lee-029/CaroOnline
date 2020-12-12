import React, { useState } from 'react';
import Board from './Board';
import Config from '../../constants/configs';
import Status from './Status';
import logo from '../../logo.svg';
import './css/game.css';
import socket from '../../socket.io/socket.io';
import axios from 'axios';
import Button from '@material-ui/core/Button';

const Game=(props)=>{
    const { history } = props;
    const { stepNumber } = props;
    const { nextMove } = props;
    const { winCells } = props;
    const { accendingMode } = props;
    // board game
    const current = history[stepNumber];
    const sortMode = accendingMode ? `Nước đi tăng dần` : `Nước đi giảm dần`;
    const moves = [];

    history.map((step, move) => {
        const content = move ? `Xin về lượt #${
            Config.makeTwoDigits(move)}:
            (${Config.makeTwoDigits(history[move].x)},${Config.makeTwoDigits(history[move].y)})`
        : `Xin chơi lại từ đầu !`;
        const variant = (move === stepNumber) ? `danger` : `success`;
        
        // Get current move
        const isDisabled = false;//oneIsDisconnect || (needToDisable && message && message.startsWith(".."));
        const currentMove = (
            // eslint-disable-next-line react/no-array-index-key
            <li key={move}>
                <Button onClick={() => requestUndo(move)} variant={variant} disabled={isDisabled} variant="contained" color="primary"
                    className='board-button'>{content}</Button>
            </li>
        )

        // Push head or tail depends on sort mode
        if (winCells && move > 0) {
            // Invisible moves when match is finish
        }
        else if (needToDisable && message && !message.startsWith("...") && move > 0) {
            // Invisible moves when match is finish
        }
        else {
            if (accendingMode) {
                moves.push(currentMove);
            }
            else {
                moves.splice(0, 0, currentMove);
            }
        }
        return moves;
    })
    // render board game
    return (
        <div className='App'>
            <header className='App-header'>
                {/* <img src={logo} className='App-logo' alt='logo' /> */}
                <Status nextMove={nextMove}
                    winCells={winCells}
                    rivalname={roomInfo.playerO}
                    messages={message}
                    isPlayerX={isPlayerX}/>
                {/* <Dialog ref={(el) => setDialog(el)} /> */}
                <div className='board-game'>
                    <div>
                        {/* Our infomation */}
                        <Card className='card'>
                            <Card.Body className='card-body'>
                                <Card.Title className='card-title'>[{isPlayerX ? `X` : `O`}] Mình [{isPlayerX ? `X` : `O`}]</Card.Title>
                                <Card.Text className='card-text-bold'><b>{ourname}</b></Card.Text>
                                {/* <img src={avatarSrc} className='avatar-small' alt='avatar'/><br></br> */}
                                <Button className='logout-button' variant='info' onClick={() => goHome()}>Trang chủ</Button>
                            </Card.Body>
                        </Card>
                        <br></br>
                        {/* Rival infomation */}
                        <Card className='card'>
                            <Card.Body className='card-body'>
                                <Card.Title className='card-title'>[{!isPlayerX ? `X` : `O`}] Đối thủ [{!isPlayerX ? `X` : `O`}]</Card.Title>
                                <Card.Text className='card-text-bold'><b>{rivalname}</b></Card.Text>
                                {/* <img src={rivalAvatarSrc} className='avatar-small' alt='rivalAvatar'/><br></br> */}
                                {/* <Button className='logout-button' variant='info' onClick={() => requestSurrender()}
                                        disabled={needToDisable}>Đầu hàng</Button>&nbsp;&nbsp;
                                <Button className='logout-button' variant='info' onClick={() => requestCeasefire()}
                                        disabled={needToDisable}>Xin hoà</Button> */}
                            </Card.Body>
                        </Card>
                    </div>
                    <div>
                        <Board  winCells={winCells}
                                squares={current.squares}
                                currentCell={[current.x, current.y]}
                                handleClick={(i, j) => userClick(i, j)}/>
                    </div>
                    <div>
                        {/* Change sort mode */}
                        <Button className='change-sort-button' onClick={actions.actionChangeSort}>{sortMode}</Button>
                        <br></br>
                        {/* <ScrollToBottom className='scroll-view' mode={accendingMode ? `bottom` : `top`}>
                            <ol >{moves}</ol>
                        </ScrollToBottom> */}
                        {/* Chat panel */}
                        {/* <Card className='card-chat'>
                            <Card.Body className='card-body'>
                                <Card.Title className='card-title'>Nhắn tin</Card.Title>
                                <div className='scroll-view-chat'>
                                    {chatHistoryUI}
                                </div>
                                <form onSubmit={e => handleChat(e)}>
                                    <FormControl type='chatMessage'
                                        className='input-message'
                                        placeholder='Nhập và nhấn Enter'
                                        value={chatMessage}
                                        disabled={needToDisable}
                                        onChange={e => setChatMessage(e.target.value)}>
                                    </FormControl>
                                </form>
                            </Card.Body>
                        </Card> */}
                    </div>
                </div>
            </header>
        </div>
    )
    
}

export default Game;