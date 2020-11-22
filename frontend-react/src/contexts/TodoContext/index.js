import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../../config/axios';
import { useAuth, useAuthUpdate } from '../AuthContext';
import refreshToken from '../../requests/refreshToken';

const TodoContext = React.createContext();
const TodoGetContext = React.createContext();
const TodoCreateContext = React.createContext();
const TodoDeleteContext = React.createContext();

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
            date: todo.date !== '' ? new Date(todo.date).getTime() : null,
            isDone: todo.isDone
        };

        await refreshToken(auth, updateAuth);

        const response = await axios.post('/todos', JSON.stringify(payload), {
            headers: {
                Authorization: 'Bearer ' + auth.token
            }
        })
            .then(response => response.data)
            .then(data => data);

        todo.id = response.id;

        const newTodos = [todo, ...todos];

        setTodos(newTodos);
    }

    async function deleteTodo (todo) {
        await refreshToken(auth, updateAuth);

        await axios.delete('/todos/' + todo.id, {
            headers: {
                Authorization: 'Bearer ' + auth.token
            }
        })
            .then(response => response.data)
            .then(data => data);

        const newTodos = todos.filter((td) => td.id !== todo.id);

        setTodos(newTodos);
    }

    return (
        <TodoContext.Provider value={todos}>
            <TodoGetContext.Provider value={getTodos}>
                <TodoCreateContext.Provider value={createTodo}>
                    <TodoDeleteContext.Provider value={deleteTodo}>
                        {children}
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
