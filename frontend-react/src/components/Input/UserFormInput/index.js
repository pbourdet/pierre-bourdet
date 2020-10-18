import React from 'react';
import { Form } from 'react-bootstrap';
import { useIntl } from 'react-intl';
import PropTypes from 'prop-types';

function UserFormInput ({ type, asterisk, innerRef, values, errors, touched }) {
    const ref = type === 'email' ? innerRef : null;
    const htmlType = type === 'confirmPassword' ? 'password' : type;
    const intl = useIntl();

    return (
        <Form.Group>
            <Form.Label htmlFor={type}>{intl.formatMessage({ id: `userForm.${type}.label` })}{asterisk && <span className="text-danger"> *</span>}</Form.Label>
            <Form.Control
                ref={ref}
                isInvalid={touched[type] && errors[type]} isValid={touched[type] && !errors[type]}
                values={values[type]} type={htmlType} name={type} id={type} placeholder={intl.formatMessage({ id: `userForm.${type}.placeholder` })} />
            <Form.Control.Feedback type="invalid">{errors[type]}</Form.Control.Feedback>
        </Form.Group>
    );
}

UserFormInput.propTypes = {
    type: PropTypes.string,
    asterisk: PropTypes.bool,
    innerRef: PropTypes.object,
    values: PropTypes.object,
    errors: PropTypes.object,
    touched: PropTypes.object
};

export default UserFormInput;
