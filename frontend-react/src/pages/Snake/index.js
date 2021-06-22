import React from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from 'react-helmet';
import SnakeGame from '../../components/SnakeGame';

function Snake () {
    return (
        <Container className="shadow p-3">
            <Helmet><title>Snake</title></Helmet>
            <FontAwesomeIcon className="mr-2" icon={faBus}/>Snake
            <SnakeGame/>
        </Container>
    );
}

export default Snake;
