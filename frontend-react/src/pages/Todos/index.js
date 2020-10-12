import React, { useEffect, useState } from 'react';
import '../App.css';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../contexts/AuthContext';
import { fetchTodos } from '../../requests/fetchTodos';

function Todos () {
    const [todos, setTodos] = useState({});
    const auth = useAuth();

    useEffect(() => {
        async function fetchData () {
            const data = await fetchTodos(auth);
            setTodos(data);
            return data;
        }
        fetchData();
    }, [auth]);

    return (
        <div className="App">
            <FormattedMessage id="todos.title">
                {title => <Helmet><title>{title}</title></Helmet>}
            </FormattedMessage>
            <h1><FormattedMessage id="todos.title"/></h1>
            <p><FormattedMessage id="todos.info"/></p>
        </div>
    );
}

export default Todos;
