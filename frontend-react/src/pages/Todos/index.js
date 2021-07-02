import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import TodoContainer from '../../components/TodoContainer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons';
import variants from '../../config/framer-motion';
import { motion } from 'framer-motion';

function Todos () {
    return (
        <motion.div variants={variants} initial="hidden" animate="visible">
            <FormattedMessage id="todos.title">
                {title => <Helmet><title>{title}</title></Helmet>}
            </FormattedMessage>
            <h1 className="m-2">
                <FontAwesomeIcon className="mr-3" icon={faTasks}/>
                <FormattedMessage id="todos.title"/>
            </h1>
            <TodoContainer />
        </motion.div>
    );
}

export default Todos;
