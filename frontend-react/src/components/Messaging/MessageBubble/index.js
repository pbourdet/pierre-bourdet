import React from 'react';
import PropTypes from 'prop-types';
import { FormattedDate, FormattedTime } from 'react-intl';

function MessageBubble ({ user, message, previousMessage }) {
    const isLoggedInUserMessage = message.sender.user.id === user.id;
    const isPreviousMessageSameSender = previousMessage !== null && previousMessage.sender.user.id === message.sender.user.id;

    const loggedInUserMessageClasses = 'bg-primary align-self-end';
    const otherUserMessageClasses = 'bg-success align-self-start';

    return (
        <>
            <div style={{ borderRadius: '12px', maxWidth: '75%' }}
                className={`text-left text-white p-1 pr-2 pl-2 ${isPreviousMessageSameSender ? 'mt-1' : 'mt-2'} ${isLoggedInUserMessage ? loggedInUserMessageClasses : otherUserMessageClasses}`}
            >
                <div><span className="text-break">{message.content}</span><span style={{ width: '75px' }} className="d-inline-block"/></div>
                <div className="float-right text-right position-relative" style={{ fontSize: '65%', top: '-15px', marginBottom: '-12px', lineHeight: '15px' }}>
                    <div style={{ height: '11px' }}><FormattedTime value={message.date}/></div>
                    <div style={{ height: '11px' }}><FormattedDate month="2-digit" day="2-digit" year="2-digit" value={message.date}/></div>
                </div>
            </div>
        </>
    );
}

MessageBubble.propTypes = {
    user: PropTypes.shape({
        id: PropTypes.string.isRequired,
        createdAt: PropTypes.number.isRequired,
        email: PropTypes.string.isRequired,
        nickname: PropTypes.string.isRequired
    }),
    message: PropTypes.shape({
        id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        date: PropTypes.number.isRequired,
        sender: PropTypes.shape({
            user: PropTypes.shape({
                id: PropTypes.string.isRequired,
                nickname: PropTypes.string
            })
        })
    }),
    previousMessage: PropTypes.shape({
        id: PropTypes.string.isRequired,
        content: PropTypes.string.isRequired,
        date: PropTypes.number.isRequired,
        sender: PropTypes.shape({
            user: PropTypes.shape({
                id: PropTypes.string.isRequired,
                nickname: PropTypes.string
            })
        })
    })
};

export default MessageBubble;
