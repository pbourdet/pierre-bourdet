import React from 'react';
import PropTypes from 'prop-types';
import { faAppleAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function GridCell ({ isFood }) {
    return (
        <div style={{ width: 35, height: 35 }} className="border">
            {isFood && <FontAwesomeIcon className="mt-2" icon={faAppleAlt}/>}
        </div>
    );
}

GridCell.propTypes = {
    isFood: PropTypes.bool
};

export default GridCell;
