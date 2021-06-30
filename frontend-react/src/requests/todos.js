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

export async function deleteTodos (todo, todos, auth, updateAuth) {
    const newTodos = todos.filter((td) => td.id !== todo.id);

    if (auth === null) {
        return updateLocalTodos(newTodos);
    }

    await refreshToken(auth, updateAuth);

    const isDeleted = await axios.delete('/todos/' + todo.id)
        .then(() => true)
        .catch(() => false);

    return isDeleted ? newTodos : todos;
}

function fixDateOffset (date, addHours = true) {
    return addHours === true
        ? addMinutes(date, new Date().getTimezoneOffset()).getTime()
        : subMinutes(date, new Date().getTimezoneOffset()).getTime();
}

function updateLocalTodos (todos) {
    localStorage.setItem('todos', JSON.stringify(todos));

    return todos;
}
