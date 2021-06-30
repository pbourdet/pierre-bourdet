import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

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
    const [todos] = useState([]);

    async function getTodos () {
    }

    async function createTodo (todo) {
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
