import axios from '../config/axios';

export async function fetchTodos (auth) {
    if (auth === null) {
        return [];
    }

    return await axios.get('/todos', {
        headers: {
            Authorization: 'Bearer ' + auth.token
        }
    })
        .then(response => response.data)
        .then(data => data);
}
