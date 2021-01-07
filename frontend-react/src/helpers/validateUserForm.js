import React from 'react';
import { FormattedMessage } from 'react-intl';

export default function validateUserForm (values) {
    const errors = {};

    if (values.nickname) {
        if (values.nickname && values.nickname.trim().length < 3) {
            errors.nickname = <FormattedMessage id='userForm.error.nickname.short'/>;
        } else if (!/^[a-zA-Z0-9]{3,}$/.test(values.nickname)) {
            errors.nickname = <FormattedMessage id='userForm.error.nickname.invalid'/>;
        }
    }

    if (values.email) {
        if (!/^[a-zA-Z0-9.!#$%&'*+\\/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/.test(values.email)) {
            errors.email = <FormattedMessage id='userForm.error.email.invalid'/>;
        }
    }

    if (values.password) {
        if (values.password.length < 4) {
            errors.password = <FormattedMessage id='userForm.error.password.short'/>;
        } else if (!/\d/.test(values.password)) {
            errors.password = <FormattedMessage id='userForm.error.password.invalid'/>;
        }
    }

    if (values.newPassword) {
        if (values.newPassword.length < 4) {
            errors.newPassword = <FormattedMessage id='userForm.error.newPassword.short'/>;
        } else if (!/\d/.test(values.newPassword)) {
            errors.newPassword = <FormattedMessage id='userForm.error.newPassword.invalid'/>;
        }
    }

    if (values.confirmPassword) {
        if (values.confirmPassword !== values.password && values.confirmPassword !== values.newPassword) {
            errors.confirmPassword = <FormattedMessage id='userForm.error.confirmPassword.different'/>;
        }
    }

    if (values.newPassword) {
        if (values.newPassword === values.currentPassword) {
            errors.newPassword = <FormattedMessage id='userForm.error.newPassword.different'/>;
        }
    }

    return errors;
}
