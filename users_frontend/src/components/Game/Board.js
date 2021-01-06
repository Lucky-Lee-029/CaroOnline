import React from 'react';
import Square from './Square';
import Config from '../../constants/configs';

function checkWinCell(winCells, row, col) {
    if (winCells == null) {
        return false;
    }

    for (let i = 0; i < winCells.length; i += 1) {
        const curCell = winCells[i];
        if (curCell[0] === row && curCell[1] === col) {
            return true;
        }
    }
    return false;
}

function Board (props) {
    const squaresDiv = [];
    const { winCells } = props;
    const { squares } = props;
    const { handleClick } = props;
    const {currentPlayer} = props;
    const {currentCell} =props;
    // const { currentCell } = props;

    for (let i = 0; i < 20; i += 1) {
        for (let j = 0; j < 20; j += 1) {

            const squareKey = i * Config.brdSize + j;
            const isCurrentCell = (i === currentCell.x && j === currentCell.y);

            squaresDiv.push(<Square winCell={checkWinCell(winCells, i, j)}
                // value={squares[i][j]}
                currentPlayer={currentPlayer}
                value='X'
                row={i}
                col={j}
                isCurrentCell={isCurrentCell}
                winCell={true}
                handleClick={() => {
                        handleClick(i, j);
                    }
                }
                key={squareKey}/>);
        }
    }
    return <div className='container-board'>{squaresDiv}</div>;
}

export default Board;