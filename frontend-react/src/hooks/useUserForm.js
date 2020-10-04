import { useState } from 'react';
import validateSignup from '../helpers/validateUserForm';

const useUserForm = () => {
    const [values, setValues] = useState({
        email: '',
        nickname: '',
        password: '',
        confirmPassword: ''
    });
    const [touched, setTouched] = useState({});
    const [errors, setErrors] = useState({});

    const handleChange = e => {
        const { name, value } = e.target;
        setValues({
            ...values,
            [name]: value
        });
    };

    const handleSubmit = e => {
        e.preventDefault();
    };

    const handleBlur = e => {
        const { name, value } = e.target;
        setTouched({
            ...touched,
            [name]: value !== ''
        });
        setErrors(validateSignup(values));
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

    return { values, errors, touched, handleChange, handleBlur, handleSubmit, clearAll };
};

export default useUserForm;
