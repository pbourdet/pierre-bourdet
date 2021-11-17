import axios from '../config/axios';
import refreshToken from './refreshToken';

export async function getConversations (auth, updateAuth) {
    await refreshToken(auth, updateAuth);

    return await axios.get('/conversations')
        .then(response => response.data)
        .catch(() => []);
}

export async function getConversation (id, auth, updateAuth) {
    await refreshToken(auth, updateAuth);

    return await axios.get('/conversations/' + id)
        .then(response => response.data)
        .catch(() => null);
}
