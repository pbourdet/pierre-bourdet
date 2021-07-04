import axios from '../config/axios';
import { addHours } from 'date-fns';
import refreshToken from './refreshToken';

export async function signinSubmit (values) {
    const payload = {
        username: values.email,
        password: values.password
    };

    const response = await axios.post('/security/login', JSON.stringify(payload))
        .then(response => {
            return response.data;
        })
        .catch(() => null);

    const auth = {};

    if (response === null) {
        auth.isAuthenticated = false;

        return { auth, user: null };
    }

    auth.exp = addHours((new Date()), 1).getTime();
    auth.isAuthenticated = true;

    const user = await getMe(auth);

    return { auth, user };
}

export async function signupSubmit (values, locale) {
    const payload = {
        email: values.email,
        nickname: values.nickname,
        password: values.password,
        language: locale
    };

    return await axios.post('/users', JSON.stringify(payload))
        .then(() => true)
        .catch(() => false);
}

export async function updatePasswordSubmit (values, auth, updateAuth) {
    const payload = {
        currentPassword: values.currentPassword,
        newPassword: values.newPassword,
        confirmPassword: values.confirmPassword
    };

    await refreshToken(auth, updateAuth);

    return await axios.post('/account/update-password', JSON.stringify(payload))
        .then(response => {
            return response.status === 200;
        })
        .catch(() => {
            return false;
        });
}

export async function getMe () {
    const user = await axios.get('/account/me')
        .then(response => {
            return response.data;
        });

    localStorage.setItem('user', JSON.stringify(user));

    return user;
}

export async function logout (updateAuth) {
    updateAuth(null);
    localStorage.removeItem('user');

    await axios.post('/security/logout');
}

export async function deleteUser (user) {
    return await axios.delete('/users/' + user.id)
        .then(() => true)
        .catch(() => false);
}
