import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGetTodos } from '../../contexts/TodoContext';
import TodoTable from '../TodoTable';
import { Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

function TodoContainer () {
    const [loading, setLoading] = useState(true);
    const auth = useAuth();
    const getTodos = useGetTodos();

    useEffect(() => {
        async function fetchData () {
            setLoading(true);
            if (auth !== null) {
                await getTodos();
                setLoading(false);
            }
        }
        fetchData();
    }, [auth]);

    if (!auth) {
        return (
            <div><FormattedMessage id="todos.loggedOut"/></div>
        );
    }

    return (
        <div className="m-lg-5">
            {loading
                ? <div className="mt-5">
                    <Spinner animation="grow" variant="success"/>
                    <Spinner animation="grow" variant="danger"/>
                    <Spinner animation="grow" variant="warning"/>
                </div>
                : (<TodoTable/>)
            }
        </div>
    );
}

export default TodoContainer;
