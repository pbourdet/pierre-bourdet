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
        if (new Date(todo.date).getTime() < new Date().getTime()) {
            errors.date = <FormattedMessage id='todoForm.error.date.soon'/>;
        }
    }

    if (todo.date && todo.reminder) {
        if (new Date(todo.date).getTime() <= new Date(todo.reminder).getTime()) {
            errors.reminder = <FormattedMessage id='todoForm.error.reminder.late'/>;
        }

        if (new Date() > new Date(todo.reminder).getTime()) {
            errors.reminder = <FormattedMessage id='todoForm.error.reminder.soon'/>;
        }
    }

    return errors;
}
