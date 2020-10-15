import React, { useEffect, useState } from 'react';
import '../App.css';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import { useAuth } from '../../contexts/AuthContext';
import { fetchTodos } from '../../requests/fetchTodos';
import { Spinner } from 'react-bootstrap';
import TodoTable from '../../components/TodoTable';

function Todos () {
    const [todos, setTodos] = useState({});
    const [loading, setLoading] = useState(true);
    const auth = useAuth();

    useEffect(() => {
        async function fetchData () {
            const data = await fetchTodos(auth);
            setTodos(data);
            setLoading(false);
        }
        fetchData();
    }, [auth]);

    return (
        <>
            <FormattedMessage id="todos.title">
                {title => <Helmet><title>{title}</title></Helmet>}
            </FormattedMessage>
            <h1><FormattedMessage id="todos.title"/></h1>
            <p><FormattedMessage id="todos.info"/></p>
            {loading
                ? <div className="mt-5">
                    <Spinner animation="grow" variant="success" />
                    <Spinner animation="grow" variant="danger" />
                    <Spinner animation="grow" variant="warning" />
                </div>
                : (<TodoTable todos={todos}/>)
            }
        </>
    );
}

export default Todos;
