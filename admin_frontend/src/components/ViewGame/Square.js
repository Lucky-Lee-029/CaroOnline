import React, {useState} from 'react';
import Config from './configs';
import './css/game.css';

function Square(props) {
    const {value} = props;
    const { winCell } = props;
    const { isCurrentCell } = props;
    const {handleClick}=props;
    const { currentPlayer} = props;
    
    const moveColor = value === Config.xPlayer ? Config.plColor.X : Config.plColor.O;
    const className = isCurrentCell ? 'square-current' : (winCell === false ? 'square' : 'square-win');
    return (
        <button className={className} onClick={()=>{
                handleClick();
            }} style={{margin: 1}}>
            <font color={moveColor}>{value}</font>
        </button>
    );
}

export default Square;