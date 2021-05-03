import axios from '../config/axios';
import { addMinutes, addHours } from 'date-fns';

export default async function refreshToken (auth, updateAuth) {
    if (addMinutes((new Date()), 1).getTime() < auth.exp) {
        return auth.token;
    }

    const response = await axios.post('/token/refresh', JSON.stringify({ refreshToken: auth.refreshToken }))
        .then(response => {
            return response.data;
        })
        .catch(() => {
            updateAuth(null);
        });

    if (response === undefined) {
        return;
    }

    auth.exp = addHours((new Date()), 1).getTime();

    updateAuth(auth);

    return auth.token;
};
