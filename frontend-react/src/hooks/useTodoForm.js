import { useEffect, useState } from 'react';
import validateTodoForm from '../helpers/validateTodoForm';

export default function useTodoForm (todo) {
    const [errors, setErrors] = useState({});
    const [currentTodo, setCurrentTodo] = useState({
        name: '',
        description: '',
        date: '',
        reminder: '',
        isDone: false
    });

    useEffect(() => {
        Object.keys(todo).length && setCurrentTodo(todo);
    }, [todo]);

    useEffect(() => {
        setErrors(validateTodoForm(currentTodo));
    }, [currentTodo]);

    const handleChange = e => {
        let { name, value } = e.target;
        if (['date', 'reminder'].includes(name)) {
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
            reminder: '',
            isDone: false
        });
    };

    const formatDate = (value) => {
        const date = new Date(value);
        date.setMinutes(Math.round(date.getMinutes() / 5) * 5);

        if (value === '') {
            return null;
        }

        return date.getTime();
    };

    return { currentTodo, errors, handleChange, clearAll };
};
