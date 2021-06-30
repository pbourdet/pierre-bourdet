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

    const fixDateOffset = (date) => {
        return addMinutes(date, new Date().getTimezoneOffset()).getTime();
    };

    const updateLocalTodos = (todos) => {
        localStorage.setItem('todos', JSON.stringify(todos));
        setTodos(todos);
    };

    async function getTodos () {
    }

    async function createTodo (todo) {
        if (auth === null) {
            todo.id = Math.floor(Math.random() * Math.pow(10, 7));
            updateLocalTodos([...todos, todo]);

            return;
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

        const response = await axios.post('/todos', JSON.stringify(payload))
            .then(response => response.data)
            .then(data => data);

        todo.id = response.id;

        setTodos([...todos, todo]);
    }

    async function deleteTodo (todo) {
    }

    async function editTodo (editedTodo) {
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
