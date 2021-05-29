import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import TodoContainer from '../../components/TodoContainer';
import TodoProvider from '../../contexts/TodoContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTasks } from '@fortawesome/free-solid-svg-icons';

function Todos () {
    return (
        <>
            <TodoProvider>
                <FormattedMessage id="todos.title">
                    {title => <Helmet><title>{title}</title></Helmet>}
                </FormattedMessage>
                <h1 className="m-2">
                    <FontAwesomeIcon className="mr-3" icon={faTasks}/>
                    <FormattedMessage id="todos.title"/>
                </h1>
                <TodoContainer />
            </TodoProvider>
        </>
    );
}

export default Todos;
