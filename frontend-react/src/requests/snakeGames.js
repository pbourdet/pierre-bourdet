import axios from '../config/axios';

export async function getTopSnakeGames () {
    return await axios.get('/games/snake/top')
        .then(response => response.data)
        .catch(() => null);
}

export async function getUserSnakeGames () {
    return await axios.get('/games/snake/user')
        .then(response => response.data)
        .catch(() => null);
}

export async function saveSnakeGame (score) {
    return await axios.post('/games/snake', JSON.stringify({ score: score }))
        .then(() => true)
        .catch(() => false);
}
