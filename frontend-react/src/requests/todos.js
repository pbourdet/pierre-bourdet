import axios from '../config/axios';
import { addMinutes, subMinutes } from 'date-fns';
import refreshToken from './refreshToken';

export async function getTodos (auth, updateAuth) {
    if (auth === null) {
        return JSON.parse(localStorage.getItem('todos')) ?? [];
    }

    await refreshToken(auth, updateAuth);

    const todos = await axios.get('/todos')
        .then(response => response.data)
        .catch(() => []);

    todos.sort((td1, td2) => td1.id - td2.id);

    return todos.map(function (todo) {
        todo.date = todo.date && fixDateOffset(todo.date, false);
        todo.reminder = todo.reminder && fixDateOffset(todo.reminder, false);

        return todo;
    });
}

function fixDateOffset (date, addHours = true) {
    return addHours === true
        ? addMinutes(date, new Date().getTimezoneOffset()).getTime()
        : subMinutes(date, new Date().getTimezoneOffset()).getTime();
}
