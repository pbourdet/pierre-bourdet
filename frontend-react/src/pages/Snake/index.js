import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import { Helmet } from 'react-helmet';
import SnakeGame from '../../components/SnakeGame';
import { FormattedMessage } from 'react-intl';
import HallOfFame from '../../components/SnakeGame/HallOfFame';

function Snake () {
    const [isMobile] = useState(Number(window.innerWidth) <= 768);

    return (
        <>
            <Helmet><title>Snake</title></Helmet>
            <h1 className="m-2">Snake</h1>
            <Container className="shadow p-3 border">
                {isMobile
                    ? <div className="m-3"><FormattedMessage id="snake.mobile"/><span role="img" aria-label="sad"> 😞</span></div>
                    : <div>
                        <SnakeGame/>
                        <HallOfFame/>
                    </div>
                }
            </Container>
        </>
    );
}

export default Snake;
