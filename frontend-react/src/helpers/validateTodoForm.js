import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function validateTodoForm (todo) {
    const errors = {};

    if (todo.name.length > 50) {
        errors.name = <FormattedMessage id='userForm.error.nickname.short'/>;
    }

    if (todo.description.length > 100) {
        errors.description = <FormattedMessage id='userForm.error.password.short'/>;
    }

    if (new Date(todo.date + ' ' + todo.time) < new Date()) {
        errors.date = 'date trop petite';
    }

    if (todo.time && !todo.date) {
        errors.date = 'atchoum';
    }

    console.log(errors);
    return errors;
}
