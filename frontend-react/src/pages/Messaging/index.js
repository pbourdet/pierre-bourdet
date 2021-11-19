import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import variants from '../../config/framer-motion';
import { motion } from 'framer-motion';
import MessagingContainer from '../../components/Messaging/MessagingContainer';

function Messaging () {
    return (
        <motion.div variants={variants} initial="hidden" animate="visible">
            <FormattedMessage id="messaging.title">
                {title => <Helmet><title>{title}</title></Helmet>}
            </FormattedMessage>
            <MessagingContainer/>
        </motion.div>
    );
}

export default Messaging;
