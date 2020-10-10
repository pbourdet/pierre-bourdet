import { useEffect, useState } from 'react';
import validateUserForm from '../helpers/validateUserForm';

export default function useUserFormValidation () {
    const [values, setValues] = useState({
        email: '',
        nickname: '',
        password: '',
        confirmPassword: ''
    });
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});

    useEffect(() => {
        setErrors(validateUserForm(values));
    }, [values]);

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
        setTouched({
            ...touched,
            [name]: value !== ''
        });
    };

    const clearAll = () => {
        setErrors({});
        setTouched({});
        setValues({
            email: '',
            nickname: '',
            password: '',
            confirmPassword: ''
        });
    };

    return { values, errors, touched, handleChange, clearAll };
};
