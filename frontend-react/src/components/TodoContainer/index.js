import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useGetTodos } from '../../contexts/TodoContext';
import TodoTable from '../TodoTable';
import { Alert, Container, Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

function TodoContainer () {
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(true);
    const auth = useAuth();
    const getTodos = useGetTodos();

    useEffect(() => {
        async function fetchData () {
            setLoading(true);
            await getTodos();
            setLoading(false);
        }
        fetchData();
    }, [auth]);

    return (
        <div className="m-2 pt-3">
            <Container className="shadow border rounded">
                {loading
                    ? <div className="m-5">
                        <Spinner animation="grow" variant="success"/>
                        <Spinner animation="grow" variant="danger"/>
                        <Spinner animation="grow" variant="warning"/>
                    </div>
                    : <>
                        {(auth === null && showAlert) &&
                        <Alert className="m-3 p-3" variant="warning" onClose={() => setShowAlert(false)} dismissible>
                            <FormattedMessage id="todos.loggedOut"/>
                        </Alert>
                        }
                        <TodoTable/>
                    </>
                }
            </Container>
        </div>
    );
}

export default TodoContainer;
