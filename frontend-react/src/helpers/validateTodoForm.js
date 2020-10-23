import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function validateTodoForm (todo) {
    const errors = {};

    if (todo.name.length > 50) {
        errors.name = <FormattedMessage id='todoForm.error.name.long'/>;
    }

    if (todo.description.length > 100) {
        errors.description = <FormattedMessage id='todoForm.error.description.long'/>;
    }

    if (todo.time && !todo.date) {
        errors.time = <FormattedMessage id='todoForm.error.time.missing'/>;
    }

    if (todo.id === undefined) {
        if (new Date(todo.date + ' ' + todo.time) < new Date()) {
            errors.date = <FormattedMessage id='todoForm.error.date.soon'/>;
        }
    }

    return errors;
}
