import React from 'react';
import '../App.css';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import TodoContainer from '../../components/TodoContainer';
import TodoProvider from '../../contexts/TodoContext';

function Todos () {
    return (
        <>
            <TodoProvider>
                <FormattedMessage id="todos.title">
                    {title => <Helmet><title>{title}</title></Helmet>}
                </FormattedMessage>
                <h1 className="m-2"><FormattedMessage id="todos.title"/></h1>
                <TodoContainer />
            </TodoProvider>
        </>
    );
}

export default Todos;
