import React, { useState } from 'react';
import { Button, OverlayTrigger, Popover, Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { toast } from 'react-toastify';
import { useAuthUpdate } from '../../contexts/AuthContext';
import PropTypes from 'prop-types';
import { deleteUser, logout } from '../../requests/user';

function DeleteUserButton ({ user }) {
    const updateAuth = useAuthUpdate();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        const isDeleted = deleteUser(user);
        setLoading(false);

        if (!isDeleted) {
            toast.error(<FormattedMessage id="toast.user.delete.error"/>);

            return;
        }

        logout(updateAuth);
        toast.success(<FormattedMessage id="toast.user.delete.success"/>);
    };

    return (
        <OverlayTrigger
            trigger="focus"
            placement="bottom"
            overlay={
                <Popover>
                    <Popover.Title as="h5"><FormattedMessage id="profile.user.delete.title"/></Popover.Title>
                    <Popover.Content>
                        <Button block variant="outline-danger" onClick={() => handleDelete()}>
                            <FormattedMessage id="profile.user.delete.confirmation"/>
                        </Button>
                    </Popover.Content>
                </Popover>
            }
        >
            <div className="ml-2 mt-2">
                {loading
                    ? <Spinner animation="border" variant="primary"/>
                    : <Button variant="danger">
                        <FormattedMessage id="profile.user.delete.button"/>
                    </Button>
                }
            </div>
        </OverlayTrigger>
    );
}

DeleteUserButton.propTypes = {
    user: PropTypes.object
};

export default DeleteUserButton;
