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

export async function createConversation (id, auth, updateAuth) {
    await refreshToken(auth, updateAuth);

    return await axios.post('/conversations', JSON.stringify({ userId: id }))
        .then(response => response.data)
        .catch(() => null);
}

export async function createMessage (conversationId, content, auth, updateAuth) {
    await refreshToken(auth, updateAuth);

    const payload = {
        conversationId: conversationId,
        content: content
    };

    return await axios.post('/messages', JSON.stringify(payload))
        .then(response => response.data)
        .catch(() => null);
}

export function createMercureEventSource (topic) {
    const hub = new URL(process.env.REACT_APP_MERCURE_URL, window.origin);
    hub.searchParams.append('topic', topic);

    return new EventSource(hub, {
        withCredentials: true
    });
}
