import React, { useState } from 'react';
import { Button, Spinner } from 'react-bootstrap';
import { useAuth } from '../../../contexts/AuthContext';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { saveSnakeGame } from '../../../requests/snakeGames';
import { toast } from 'react-toastify';

function SaveGameButton ({ score }) {
    const [loading, setLoading] = useState(false);
    const [gameSaved, setGameSaved] = useState(false);
    const auth = useAuth();

    const saveGame = async () => {
        setLoading(true);
        const isGameSaved = await saveSnakeGame(score);
        setLoading(false);
        setGameSaved(isGameSaved);

        if (!isGameSaved) {
            toast.error(<FormattedMessage id='toast.snake.error'/>);

            return;
        }

        toast.success(<FormattedMessage id='toast.snake.save' values={{ score: score }}/>);
    };

    return (
        <div>
            <div>
                <Button onClick={() => saveGame()} variant="success" disabled={auth === null || gameSaved}>
                    {loading
                        ? <Spinner size="sm" animation="border"/>
                        : <span><FormattedMessage id="snake.save.button"/></span>
                    }
                </Button>
            </div>
            {gameSaved &&
                <div>
                    <span className="text-info small">
                        <FormattedMessage id="snake.save.saved"/>
                    </span>
                </div>
            }
            {auth === null &&
                <div>
                    <span className="text-info small">
                        <FormattedMessage id="snake.save.loggedOut"/>
                    </span>
                </div>
            }
        </div>
    );
}

SaveGameButton.propTypes = {
    score: PropTypes.number
};

export default SaveGameButton;
