import React from 'react';
import { Form } from 'react-bootstrap';
import { FormattedMessage, useIntl } from 'react-intl';
import PropTypes from 'prop-types';

function UserFormInput ({ type, innerRef, handleBlur, handleChange, values, errors, touched }) {
    const labelId = `userForm.${type}.label`;
    const ref = type === 'email' ? innerRef : null;
    const htmlType = type === 'confirmPassword' ? 'password' : type;
    const intl = useIntl();

    return (
        <Form.Group>
            <Form.Label htmlFor={type}><FormattedMessage id={labelId}/><span className="text-danger"> *</span></Form.Label>
            <Form.Control
                ref={ref}
                onBlur={handleBlur} onChange={handleChange}
                isInvalid={touched[type] && errors[type]} isValid={touched[type] && !errors[type]}
                values={values[type]} type={htmlType} name={type} id={type} placeholder={intl.formatMessage({ id: `userForm.${type}.placeholder` })} />
            <Form.Control.Feedback type="invalid">{errors[type]}</Form.Control.Feedback>
        </Form.Group>
    );
}

UserFormInput.propTypes = {
    type: PropTypes.string,
    innerRef: PropTypes.object,
    handleBlur: PropTypes.func,
    handleChange: PropTypes.func,
    values: PropTypes.object,
    errors: PropTypes.object,
    touched: PropTypes.object
};

export default UserFormInput;
