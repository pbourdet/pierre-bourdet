import React from 'react';
import { Col, Nav, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FormattedDate, FormattedTime } from 'react-intl';

function ConversationTab ({ user, conversation }) {
    const otherParticipant = conversation.participants.find(participant => participant.user.id !== user.id);

    return (
        <Nav.Item>
            <Nav.Link className="p-3 m-0 border-bottom" style={{ cursor: 'pointer', display: 'flex' }} as={Row} eventKey={conversation.id}>
                <Col className="p-0 text-left" xs={9}>
                    <div className="font-weight-bold h6 m-0 text-truncate">{otherParticipant.user.nickname}</div>
                    {conversation.lastMessage && <div title={conversation.lastMessage.content} className="font-italic text-truncate">{conversation.lastMessage.content}</div>}
                </Col>
                {conversation.lastMessage &&
                    <Col className="pt-1 small" xs={3}>
                        <div><FormattedTime value={conversation.lastMessage.date}/></div>
                        <div><FormattedDate value={conversation.lastMessage.date}/></div>
                    </Col>
                }
            </Nav.Link>
        </Nav.Item>
    );
}

ConversationTab.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        createdAt: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired,
        nickname: PropTypes.string.isRequired
    }),
    index: PropTypes.number,
    conversation: PropTypes.shape({
        id: PropTypes.string.isRequired,
        participants: PropTypes.arrayOf(PropTypes.shape({
            user: PropTypes.shape({
                id: PropTypes.string.isRequired,
                nickname: PropTypes.string.isRequired
            }).isRequired
        })).isRequired,
        lastMessage: PropTypes.shape({
            id: PropTypes.string.isRequired,
            date: PropTypes.number.isRequired,
            content: PropTypes.string.isRequired,
            sender: PropTypes.shape({
                user: PropTypes.shape({
                    id: PropTypes.string.isRequired
                }).isRequired
            }).isRequired
        })
    })
};

export default ConversationTab;
