import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import axios from '../../config/axios';
import { useAuth } from '../AuthContext';

const TodoContext = React.createContext();
const TodoGetContext = React.createContext();

export function useTodos () {
    return useContext(TodoContext);
}

export function useGetTodos () {
    return useContext(TodoGetContext);
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

        setTodos(todos);
    }

    return (
        <TodoContext.Provider value={todos}>
            <TodoGetContext.Provider value={getTodos}>
                {children}
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
