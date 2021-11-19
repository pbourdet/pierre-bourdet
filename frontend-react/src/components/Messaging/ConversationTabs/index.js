import React, { useEffect, useState } from 'react';
import { Tab, Col, Nav, Row } from 'react-bootstrap';
import { useAuth, useAuthUpdate } from '../../../contexts/AuthContext';
import PropTypes from 'prop-types';
import { getConversations } from '../../../requests/messaging';
import ConversationTab from '../ConversationTab';
import Loader from '../../Loader';
import ConversationDisplay from '../ConversationDisplay';
import CreateConversationModal from '../CreateConversationModal';
import CopyIdButton from '../CopyIdButton';
import { FormattedMessage } from 'react-intl';

function ConversationTabs () {
    const user = JSON.parse(localStorage.getItem('user'));
    const auth = useAuth();
    const updateAuth = useAuthUpdate();
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showMessages, setShowMessages] = useState(false);
    const [isMobile] = useState(Number(window.innerWidth) < 768);
    const [activeKey, setActiveKey] = useState('');

    useEffect(() => {
        (async () => {
            const currentConversations = await getConversations(auth, updateAuth);

            currentConversations.sort(function (c1, c2) {
                if (c1.lastMessage === null) return 1;
                if (c2.lastMessage === null) return -1;

                return c2.lastMessage.date - c1.lastMessage.date;
            });
            setConversations(currentConversations);
            setLoading(false);
        })();

        return () => setLoading(false);
    }, [auth, updateAuth]);

    if (loading) {
        return <Loader/>;
    }

    if (conversations.length === 0) {
        return <div className="border-bottom p-2">
            <div>No conversation</div>
            <CreateConversationModal setActiveKey={setActiveKey} conversations={conversations} setConversations={setConversations}/>
            <Row className="m-0">
                <Col className="p-0"><hr/></Col>
                <Col className="col-auto">
                    <FormattedMessage id="messaging.create.conversation.or"/>
                </Col>
                <Col className="p-0"><hr/></Col>
            </Row>
            <CopyIdButton user={user}/>
        </div>;
    }

    return (
        <>
            <Tab.Container defaultActiveKey={conversations[0].id} activeKey={activeKey} onSelect={(k) => setActiveKey(k)} mountOnEnter>
                <Row className="m-0 h-100">
                    <Col style={{ overflowY: 'overlay' }} className={`p-0 h-100 border-right ${(!isMobile || (isMobile && !showMessages)) ? '' : 'd-none'}`} md={4}>
                        <div style={{ backgroundColor: 'azure' }} className="border-bottom pt-2 pb-2">
                            <CreateConversationModal setActiveKey={setActiveKey} conversations={conversations} setConversations={setConversations}/>
                            <Row className="m-0">
                                <Col className="p-0"><hr/></Col>
                                <Col className="col-auto">
                                    <FormattedMessage id="messaging.create.conversation.or"/>
                                </Col>
                                <Col className="p-0"><hr/></Col>
                            </Row>
                            <CopyIdButton user={user}/>
                        </div>
                        <Nav onClick={() => setShowMessages(true)} variant="pills" className="flex-column flex-nowrap">
                            {conversations.map((conversation) => (
                                <ConversationTab key={conversation.id} user={user} conversation={conversation}/>
                            ))}
                        </Nav>
                    </Col>
                    <Col style={{ overflowY: 'overlay' }} className={`p-0 h-100 ${(!isMobile || (isMobile && showMessages)) ? '' : 'd-none'}`} md={8}>
                        {conversations.map((conversation) => (
                            <Tab.Content key={conversation.id}>
                                <Tab.Pane eventKey={conversation.id}>
                                    <ConversationDisplay conversations={conversations} setConversations={setConversations} setShowMessages={setShowMessages} conversation={conversation} user={user}/>
                                </Tab.Pane>
                            </Tab.Content>
                        ))}
                    </Col>
                </Row>
            </Tab.Container>
        </>
    );
}

ConversationTabs.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string,
        createdAt: PropTypes.number,
        email: PropTypes.string,
        nickname: PropTypes.string
    })
};

export default ConversationTabs;
