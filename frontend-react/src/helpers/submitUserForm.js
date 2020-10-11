import axios from '../config/axios';

export async function signinSubmit (values) {
    const payload = {
        username: values.email,
        password: values.password
    };
    const token = await axios.post('/login_check', JSON.stringify(payload))
        .then(response => {
            return response.data.token;
        })
        .catch(error => {
            console.log(error);
            return null;
        });

    if (token === null) {
        return { auth: null, isError: true };
    }

    const user = await axios.get('/account/me', {
        headers: {
            Authorization: 'Bearer ' + token
        }
    })
        .then(response => {
            return response.data;
        });

    const auth = {
        token: token,
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
