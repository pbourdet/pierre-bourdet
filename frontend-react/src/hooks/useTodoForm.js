import { useEffect, useState } from 'react';
import validateTodoForm from '../helpers/validateTodoForm';
import { format } from 'date-fns';

export default function useTodoForm (todo) {
    const initialTodo = Object.keys(todo).length
        ? todo
        : {
            name: '',
            description: '',
            date: '',
            isDone: false
        };
    const [currentTodo, setCurrentTodo] = useState(initialTodo);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setErrors(validateTodoForm(currentTodo));
    }, [currentTodo]);

    const handleChange = e => {
        let { name, value } = e.target;
        if (name === 'date') {
            value = formatDate(value);
        }
        setCurrentTodo({
            ...currentTodo,
            [name]: value
        });
    };

    const clearAll = () => {
        setErrors({});
        setCurrentTodo({
            name: '',
            description: '',
            date: '',
            isDone: false
        });
    };

    const formatDate = (value) => {
        const date = new Date(value);

        return format(date.setMinutes(Math.round(date.getMinutes() / 5) * 5), "yyyy-MM-dd'T'HH:mm");
    };

    return { currentTodo, errors, handleChange, clearAll };
};
