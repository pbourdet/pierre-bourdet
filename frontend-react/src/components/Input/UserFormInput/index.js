import React from 'react';
import {Form} from "react-bootstrap";
import {FormattedMessage, useIntl} from "react-intl";

function UserFormInput({type, innerRef, handleBlur, handleChange, values, errors, touched}) {
    const labelId = `userForm.${type}.label`;
    const ref = 'email' === type ? innerRef : null;
    const htmlType = 'confirmPassword' === type ? 'password' : type;
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

export default UserFormInput