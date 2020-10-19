import axios from '../config/axios';

export async function createTodo (todo, auth) {
    Object.keys(todo).forEach((key) => (todo[key] === '') && delete todo[key]);
    return await axios.post('/todos', JSON.stringify(todo), {
        headers: {
            Authorization: 'Bearer ' + auth.token
        }
    })
        .then(response => response.data)
        .then(data => data);
}
