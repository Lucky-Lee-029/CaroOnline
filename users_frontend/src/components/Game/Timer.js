import TableCell from '@material-ui/core/TableCell';
import React, {useEffect, useState} from 'react';
const time = 30;
function Timer (props){
    const {onTimeOut} = props;
    const [countDown, setCountDown] = useState(30);
    const timer = ()=>{setCountDown(countDown-1)}; 
    useEffect(()=>{
        if(countDown <= 0){
            onTimeOut();
        }        
        const run = setInterval(timer, 1000);   
        return (()=>{clearInterval(run)});
    },[countDown])
    return(
        <TableCell>
            Time: {countDown}
        </TableCell>
    )
}

export default Timer;