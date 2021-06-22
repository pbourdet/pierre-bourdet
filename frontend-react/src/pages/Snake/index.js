import React from 'react';
import { Container } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBus } from '@fortawesome/free-solid-svg-icons';
import { Helmet } from "react-helmet";

function Snake () {
    return (
        <Container className="shadow p-3">
            <Helmet><title>Snake</title></Helmet>
            <FontAwesomeIcon className="mr-2" icon={faBus}/>Snake
        </Container>
    );
}

export default Snake;
