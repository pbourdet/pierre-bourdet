import React from 'react';
import PropTypes from 'prop-types';
import {
    faAppleAlt,
    faChevronCircleDown,
    faChevronCircleLeft,
    faChevronCircleRight,
    faChevronCircleUp,
    faCircle
} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function GridCell ({ coordinates, snake, isFood }) {
    const isHead = snake.head.row === coordinates.row && snake.head.col === coordinates.col;

    let isTail = false;
    let direction = '';
    snake.tails.forEach(tail => {
        if (tail.row === coordinates.row && tail.col === coordinates.col) {
            isTail = true;
            direction = tail.direction;
        }
    });

    const resolveTailIcon = () => {
        switch (direction) {
        case 'right':
            return <FontAwesomeIcon className="mt-2" icon={faChevronCircleRight}/>;
        case 'left':
            return <FontAwesomeIcon className="mt-2" icon={faChevronCircleLeft}/>;
        case 'up':
            return <FontAwesomeIcon className="mt-2" icon={faChevronCircleUp}/>;
        case 'down':
            return <FontAwesomeIcon className="mt-2" icon={faChevronCircleDown}/>;
        }
    };

    return (
        <div style={{ cursor: 'none', width: 35, height: 35 }}>
            {isFood && <FontAwesomeIcon className="mt-2" icon={faAppleAlt}/>}
            {isHead && <h5><FontAwesomeIcon className="mt-2" icon={faCircle}/></h5>}
            {isTail && resolveTailIcon()}
        </div>
    );
}

GridCell.propTypes = {
    isFood: PropTypes.bool,
    coordinates: PropTypes.object,
    snake: PropTypes.object
};

export default GridCell;
