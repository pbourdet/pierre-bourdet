import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDizzy } from '@fortawesome/free-regular-svg-icons';
import SaveGameButton from '../SaveGameButton';

function GameOver ({ initGame, score }) {
    return (
        <div className="h-100 d-flex justify-content-around flex-column">
            <h2>
                <FormattedMessage id="snake.gameOver"/>
                <FontAwesomeIcon className="ml-2" icon={faDizzy}/>
            </h2>
            <h3>
                Score : {score}
            </h3>
            <div>
                <SaveGameButton score={score}/>
            </div>
            <div>
                <div>
                    <Button onClick={() => initGame()}><FormattedMessage id="snake.newGame"/></Button>
                </div>
                <div className="small"><FormattedMessage id="snake.spacebar"/></div>
            </div>
        </div>
    );
}

GameOver.propTypes = {
    initGame: PropTypes.func,
    score: PropTypes.number
};

export default GameOver;
