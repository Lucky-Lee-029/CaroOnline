import fetch from 'cross-fetch';
import ActionType from '../constants/actionTypes';
import config from '../config';

export function actionRegister(status, message) {
    return {
        type: ActionType.REGISTER,
        status,
        message
    };
}

export default function fetchRegister(username, password, email, fullname) {

    return dispatch => {

        dispatch(actionRegister('REQUEST', 'Xin vui lòng đợi...'));

        return fetch(config['server-domain'] + 'users/register', {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain, */*',
                'Content-Type':'application/json'
            },
            body: JSON.stringify({
                username: username,
                password: password,
                fullname: fullname,
                email: email
            })
        })
        .then(
            response => response.json(),
            error => {
                console.log('An error occurred.', error);
                dispatch(actionRegister('FAILED', 'Đã có lỗi xảy ra, vui lòng thử lại'));
            }
        )
        .then(json => {
            dispatch(actionRegister('SUCCESS', json.message));
        })
        .catch(err => {
            dispatch(actionRegister('FAILED', 'Đã có lỗi xảy ra, vui lòng thử lại'));
        })
    }
  }