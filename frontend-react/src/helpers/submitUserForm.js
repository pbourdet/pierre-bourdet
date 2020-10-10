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

    return { auth: auth, isError: false };
}
