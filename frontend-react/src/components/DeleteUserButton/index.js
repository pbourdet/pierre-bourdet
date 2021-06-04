import React, { useState } from 'react';
import { Button, OverlayTrigger, Popover, Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import axios from '../../config/axios';
import { toast } from 'react-toastify';
import { useAuthUpdate } from '../../contexts/AuthContext';
import PropTypes from 'prop-types';

function DeleteUserButton ({ user }) {
    const updateAuth = useAuthUpdate();
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        setLoading(true);
        const isDeleted = await axios.delete('/users/' + user.id)
            .then(() => true)
            .catch(() => false);

        setLoading(false);

        if (!isDeleted) {
            toast.error(<FormattedMessage id="toast.user.delete.error"/>);

            return;
        }

        updateAuth(null);
        localStorage.removeItem('user');
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
