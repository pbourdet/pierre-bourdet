import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../../config/axios';
import { useAuth, useAuthUpdate } from '../AuthContext';
import refreshToken from '../../requests/refreshToken';
import { addMinutes, subMinutes } from 'date-fns';

const TodoContext = React.createContext();
const TodoGetContext = React.createContext();
const TodoCreateContext = React.createContext();
const TodoDeleteContext = React.createContext();
const TodoEditContext = React.createContext();

export function useTodos () {
    return useContext(TodoContext);
}

export function useGetTodos () {
    return useContext(TodoGetContext);
}

export function useCreateTodo () {
    return useContext(TodoCreateContext);
}

export function useDeleteTodo () {
    return useContext(TodoDeleteContext);
}

export function useEditTodo () {
    return useContext(TodoEditContext);
}

export default function TodoProvider ({ children }) {
    const [todos, setTodos] = useState([]);
    const auth = useAuth();
    const updateAuth = useAuthUpdate();

    async function getTodos () {
        if (auth === null) {
            setTodos([]);
            return;
        }

        await refreshToken(auth, updateAuth);

        const response = await axios.get('/todos')
            .then(response => response.data)
            .then(data => data);

        response.sort((td1, td2) => td2.id - td1.id);
        const todos = response.map(function (todo) {
            todo.date = todo.date && subMinutes(todo.date, new Date().getTimezoneOffset()).getTime();
            todo.reminder = todo.reminder && subMinutes(todo.reminder, new Date().getTimezoneOffset()).getTime();

            return todo;
        });

        setTodos(todos);
    }

    async function createTodo (todo) {
        const date = todo.date
            ? addMinutes(todo.date, new Date().getTimezoneOffset()).getTime()
            : null
        ;

        const payload = {
            name: todo.name,
            description: todo.description,
            date: date,
            isDone: todo.isDone
        };

        await refreshToken(auth, updateAuth);

        const response = await axios.post('/todos', JSON.stringify(payload))
            .then(response => response.data)
            .then(data => data);

        todo.id = response.id;

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
    }

    async function deleteTodo (todo) {
        await refreshToken(auth, updateAuth);

        await axios.delete('/todos/' + todo.id)
            .then(response => response.data)
            .then(data => data);

        const newTodos = todos.filter((td) => td.id !== todo.id);

        setTodos(newTodos);
    }

    async function editTodo (editedTodo) {
        const date = editedTodo.date
            ? addMinutes(editedTodo.date, new Date().getTimezoneOffset()).getTime()
            : null
        ;

        const payload = {
            name: editedTodo.name,
            description: editedTodo.description,
            date: date,
            isDone: editedTodo.isDone
        };
        await refreshToken(auth, updateAuth);

        await axios.put('/todos/' + editedTodo.id, JSON.stringify(payload))
            .then(response => response.data)
            .then(data => data);

        const newTodos = todos.map(todo =>
            todo.id === editedTodo.id ? editedTodo : todo
        );

        setTodos(newTodos);
    }

    return (
        <TodoContext.Provider value={todos}>
            <TodoGetContext.Provider value={getTodos}>
                <TodoCreateContext.Provider value={createTodo}>
                    <TodoDeleteContext.Provider value={deleteTodo}>
                        <TodoEditContext.Provider value={editTodo}>
                            {children}
                        </TodoEditContext.Provider>
                    </TodoDeleteContext.Provider>
                </TodoCreateContext.Provider>
            </TodoGetContext.Provider>
        </TodoContext.Provider>
    );
}

TodoProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired
};
