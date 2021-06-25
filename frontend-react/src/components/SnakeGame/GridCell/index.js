import React from 'react';
import PropTypes from 'prop-types';
import { faAppleAlt, faCircle, faHorseHead } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function GridCell ({ coordinates, snake, isFood }) {
    const isHead = snake.head.row === coordinates.row && snake.head.col === coordinates.col;

    let isTail = false;
    snake.tails.forEach(tail => {
        if (tail.row === coordinates.row && tail.col === coordinates.col) {
            isTail = true;
        }
    });

    return (
        <div style={{ cursor: 'none', width: 35, height: 35 }} className="border">
            {isFood && <FontAwesomeIcon className="mt-2" icon={faAppleAlt}/>}
            {isHead && <FontAwesomeIcon className="mt-2" icon={faHorseHead}/>}
            {isTail && <FontAwesomeIcon className="mt-2" icon={faCircle}/>}
        </div>
    );
}

GridCell.propTypes = {
    isFood: PropTypes.bool,
    coordinates: PropTypes.object,
    snake: PropTypes.object
};

export default GridCell;
