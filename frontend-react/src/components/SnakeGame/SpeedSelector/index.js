import React from 'react';
import PropTypes from 'prop-types';
import { Dropdown } from 'react-bootstrap';
import { FormattedMessage } from 'react-intl';

function SpeedSelector ({ currentSpeed, resetGame }) {
    const speeds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

    const handleChange = (e, speed) => {
        e.currentTarget.blur();
        localStorage.setItem('snake-speed', speed);
        resetGame(speed);
    };

    return (
        <Dropdown>
            <Dropdown.Toggle style={{ cursor: 'pointer' }} variant="info" className="mr-2" id="dropdown-basic">
                <FormattedMessage id="snake.speed"/> {currentSpeed}
            </Dropdown.Toggle>
            <Dropdown.Menu>
                {speeds.map((speed, index) => (
                    <Dropdown.Item key={index} onClick={(e) => handleChange(e, speed)}>
                        {speed}
                    </Dropdown.Item>
                ))}
            </Dropdown.Menu>
        </Dropdown>
    );
}

SpeedSelector.propTypes = {
    resetGame: PropTypes.func,
    currentSpeed: PropTypes.number
};

export default SpeedSelector;
