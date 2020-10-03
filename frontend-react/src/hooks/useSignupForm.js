import { useState } from 'react';

const useSignupForm = (validate) => {
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
        setErrors(validate(values));
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

export default useSignupForm;
