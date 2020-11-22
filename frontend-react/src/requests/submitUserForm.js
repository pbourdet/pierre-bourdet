import axios from '../config/axios';
import { addHours } from 'date-fns';

export async function signinSubmit (values) {
    const payload = {
        username: values.email,
        password: values.password
    };
    const response = await axios.post('/login_check', JSON.stringify(payload))
        .then(response => {
            return response.data;
        })
        .catch(error => {
            console.log(error);
            return null;
        });

    if (response === null) {
        return { auth: null, isError: true };
    }

    const accessToken = response.token;

    const user = await axios.get('/account/me', {
        headers: {
            Authorization: 'Bearer ' + accessToken
        }
    })
        .then(response => {
            return response.data;
        });

    const auth = {
        token: accessToken,
        refreshToken: response.refreshToken,
        exp: addHours((new Date()), 1).getTime(),
        user: user
    };

    return { auth, isError: false };
}

export async function signupSubmit (values) {
    const payload = {
        email: values.email,
        nickname: values.nickname,
        password: values.password
    };
    return await axios.post('/users', JSON.stringify(payload))
        .then(response => {
            return response.status === 201;
        })
        .catch(error => {
            console.log(error);
            return false;
        });
}
