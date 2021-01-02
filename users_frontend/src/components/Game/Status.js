import React from 'react';
import Config from '../../constants/configs';

function Status(props) {
    const { messages } = props;
    let message=messages;
    return (
        <div className='status'><b>{message}</b></div>
    )
}

export default Status;