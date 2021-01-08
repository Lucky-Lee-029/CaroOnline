import React, {useState} from 'react';
import Config from '../../constants/configs';
import './css/game.css'
// import Button from '@material-ui/core/Button';

function Square(props) {
    // const  [value, setValue]  = useState("");
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
            }}>
            <font color={moveColor}>{value}</font>
        </button>
    );
}

export default Square;