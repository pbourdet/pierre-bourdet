import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDizzy } from '@fortawesome/free-regular-svg-icons';

function GameOver ({ resetGame }) {
    return (
        <div className="h-100 d-flex justify-content-around flex-column">
            <h2>
                <FormattedMessage id="snake.gameOver"/>
                <FontAwesomeIcon className="ml-2" icon={faDizzy}/>
            </h2>
            <div>
                <Button onClick={() => resetGame()}><FormattedMessage id="snake.newGame"/></Button>
            </div>
        </div>
    );
}

GameOver.propTypes = {
    resetGame: PropTypes.func
};

export default GameOver;
