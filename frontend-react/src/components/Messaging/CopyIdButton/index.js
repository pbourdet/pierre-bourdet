import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { faCopy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';

function CopyIdButton ({ user }) {
    const [buttonText, setButtonText] = useState(<span>{user.id}</span>);
    const [disabled, setDisabled] = useState(false);

    const copyIdToClipboard = () => {
        navigator.clipboard.writeText(user.id);

        setButtonText(<FormattedMessage id="messaging.create.conversation.copied"/>);
        setDisabled(true);

        setTimeout(() => {
            setButtonText(<span>{user.id}</span>);
            setDisabled(false);
        }, 2000);
    };

    return (
        <div>
            <div className="small"><FormattedMessage id="messaging.create.conversation.share"/></div>
            <div>
                <Button disabled={disabled} variant="light" onClick={copyIdToClipboard}>
                    {buttonText}
                    {!disabled && <FontAwesomeIcon className="ml-2" icon={faCopy}/>}
                </Button>
            </div>
        </div>
    );
}

CopyIdButton.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string,
        createdAt: PropTypes.number,
        email: PropTypes.string,
        nickname: PropTypes.string
    })
};

export default CopyIdButton;
