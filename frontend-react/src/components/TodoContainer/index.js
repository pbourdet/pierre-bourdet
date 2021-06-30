import React, { useEffect, useState } from 'react';
import { useAuth, useAuthUpdate } from '../../contexts/AuthContext';
import TodoTable from '../TodoTable';
import { Alert, Container, Spinner } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { getTodos } from '../../requests/todos';

function TodoContainer () {
    const [loading, setLoading] = useState(true);
    const [showAlert, setShowAlert] = useState(true);
    const [todos, setTodos] = useState([]);
    const auth = useAuth();
    const updateAuth = useAuthUpdate();

    useEffect(() => {
        (async () => {
            setLoading(true);
            const currentTodos = await getTodos(auth, updateAuth);
            setLoading(false);
            setTodos(currentTodos);
        })();
    }, [auth, updateAuth]);

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
                        <TodoTable todos={todos} setTodos={setTodos}/>
                    </>
                }
            </Container>
        </div>
    );
}

export default TodoContainer;
