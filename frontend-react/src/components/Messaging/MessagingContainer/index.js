import React from 'react';
import { Container } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import SigninModal from '../../SigninModal';
import SignupModal from '../../SignupModal';
import { useAuth } from '../../../contexts/AuthContext';
import ConversationTabs from '../ConversationTabs';

function MessagingContainer () {
    const auth = useAuth();

    if (auth === null) {
        return <Container className="mt-4 shadow border rounded">
            <div className="m-5">
                <div className="mb-2"><FormattedMessage id="messaging.loggedOut"/></div>
                <div>
                    <SigninModal/>
                    <SignupModal/>
                </div>
            </div>
        </Container>;
    }

    return (
        <Container style={{ height: 'calc(100vh - 66px)' }} className="p-0 shadow border rounded">
            <ConversationTabs/>
        </Container>
    );
}

export default MessagingContainer;
