import axios from '../config/axios';

export async function resetPasswordEmail (email, locale) {
    return await axios.post('/security/reset-password-email', JSON.stringify({ email: email }), {
        headers: {
            'Accept-Language': locale
        }
    })
        .then(response => {
            return response.status === 200;
        })
        .catch(() => {
            return false;
        });
}

export async function resetPassword (token, values) {
    const payload = {
        token: token,
        password: values.password,
        confirmPassword: values.confirmPassword
    };

    return await axios.post('/security/reset-password', JSON.stringify(payload))
        .then(response => {
            return response.data;
        })
        .catch(() => {
            return null;
        });
}
