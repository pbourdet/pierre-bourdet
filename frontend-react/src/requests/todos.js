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

export async function editTodo (editedTodo, todos, auth, updateAuth) {
    const newTodos = todos.map(todo =>
        todo.id === editedTodo.id ? editedTodo : todo
    );

    if (auth === null) {
        return updateLocalTodos(newTodos);
    }

    const date = editedTodo.date ? fixDateOffset(editedTodo.date) : null;
    const reminder = editedTodo.reminder ? fixDateOffset(editedTodo.reminder) : null;

    const payload = {
        name: editedTodo.name,
        description: editedTodo.description,
        date: date,
        reminder: reminder,
        isDone: editedTodo.isDone
    };

    await refreshToken(auth, updateAuth);

    const isEdited = await axios.put('/todos/' + editedTodo.id, JSON.stringify(payload))
        .then(() => true)
        .catch(() => false);

    return isEdited ? newTodos : todos;
}

export async function createTodo (todo, todos, auth, updateAuth) {
    if (auth === null) {
        todo.id = Math.floor(Math.random() * Math.pow(10, 7));

        return updateLocalTodos([...todos, todo]);
    }

    const date = todo.date ? fixDateOffset(todo.date) : null;
    const reminder = todo.reminder ? fixDateOffset(todo.reminder) : null;

    const payload = {
        name: todo.name,
        description: todo.description,
        date: date,
        reminder: reminder,
        isDone: todo.isDone
    };

    await refreshToken(auth, updateAuth);

    const newTodo = await axios.post('/todos', JSON.stringify(payload))
        .then(response => response.data)
        .catch(() => null);

    if (newTodo === null) return todos;

    todo.id = newTodo.id;

    return [...todos, todo];
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
