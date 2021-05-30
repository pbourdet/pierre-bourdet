import axios from '../config/axios';
import { addMinutes, addHours } from 'date-fns';

export default async function refreshToken (auth, updateAuth) {
    if (addMinutes((new Date()), 1).getTime() < auth.exp) {
        return;
    }

    const isTokenRefreshed = await axios.post('/security/refresh-token', {})
        .then(() => true)
        .catch(() => false);

    if (isTokenRefreshed === false) {
        updateAuth(null);

        return;
    }

    auth.exp = addHours((new Date()), 1).getTime();
    updateAuth(auth);
};
