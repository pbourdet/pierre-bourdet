import {useEffect, useState} from 'react';
import validateTodoForm from '../helpers/validateTodoForm';

export default function useTodoForm () {
    const [currentTodo, setCurrentTodo] = useState({
        name: '',
        description: '',
        date: '',
        time: '',
        isDone: false
    });
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setErrors(validateTodoForm(currentTodo));
    }, [currentTodo]);

    const handleChange = e => {
        let { name, value } = e.target;
        if (name === 'time') {
            value = formatTime(value);
            console.log(value);
        }
        setCurrentTodo({
            ...currentTodo,
            [name]: value
        });
    };

    const formatTime = (value) => {
        const hours = value.slice(0, 2);
        let minutes = Math.round(value.slice(3, 5) / 5) * 5;

        minutes = minutes < 10 ? '0' + minutes : minutes;
        minutes = minutes === 60 ? '00' : minutes;

        return [hours, minutes].join(':');
    };

    return { currentTodo, errors, handleChange };
};
