import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../../config/axios';
import { useAuth } from '../AuthContext';

const TodoContext = React.createContext();
const TodoGetContext = React.createContext();
const TodoCreateContext = React.createContext();

export function useTodos () {
    return useContext(TodoContext);
}

export function useGetTodos () {
    return useContext(TodoGetContext);
}

export function useCreateTodo () {
    return useContext(TodoCreateContext);
}

export default function TodoProvider ({ children }) {
    const [todos, setTodos] = useState([]);
    const auth = useAuth();

    async function getTodos () {
        if (auth === null) {
            setTodos([]);
            return;
        }

        const todos = await axios.get('/todos', {
            headers: {
                Authorization: 'Bearer ' + auth.token
            }
        })
            .then(response => response.data)
            .then(data => data);

        todos.sort((td1, td2) => td2.id - td1.id);

        setTodos(todos);
    }

    async function createTodo (todo) {
        const payload = {
            name: todo.name,
            description: todo.description,
            date: todo.date !== '' ? new Date(todo.date + ' ' + todo.time).getTime() / 1000 : null,
            isDone: todo.isDone
        };

        const response = await axios.post('/todos', JSON.stringify(payload), {
            headers: {
                Authorization: 'Bearer ' + auth.token
            }
        })
            .then(response => response.data)
            .then(data => data);

        payload.id = response.id;

        const newTodos = [payload, ...todos];

        setTodos(newTodos);
    }

    return (
        <TodoContext.Provider value={todos}>
            <TodoGetContext.Provider value={getTodos}>
                <TodoCreateContext.Provider value={createTodo}>
                    {children}
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
