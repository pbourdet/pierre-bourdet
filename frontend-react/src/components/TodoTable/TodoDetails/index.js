import React from 'react';
import PropTypes from 'prop-types';
import { Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-regular-svg-icons';
import { FormattedDate, FormattedTime } from 'react-intl';
import { faBell } from '@fortawesome/free-solid-svg-icons';

function TodoDetails ({ todo }) {
    return (
        <Col className="d-flex flex-column text-left" xs={8} sm={9}>
            <div>
                <div className="h5 text-left font-weight-normal mb-0">
                    {todo.isDone
                        ? <del>{todo.name}</del>
                        : <span>{todo.name}</span>
                    }
                </div>
            </div>
            {todo.description &&
                <div>{todo.description}</div>
            }
            {todo.date &&
                <div>
                    <small className="text-success">
                        <FontAwesomeIcon className="mr-1" icon={faCalendarAlt}/>
                        <FormattedDate value={todo.date}/> - <FormattedTime value={todo.date}/>
                    </small>
                </div>
            }
            {todo.reminder &&
                <div>
                    <small className="text-info">
                        <FontAwesomeIcon className="mr-1" icon={faBell}/>
                        <FormattedDate value={todo.reminder}/> - <FormattedTime value={todo.reminder}/>
                    </small>
                </div>
            }
        </Col>
    );
}

TodoDetails.propTypes = {
    todo: PropTypes.object
};

export default TodoDetails;
