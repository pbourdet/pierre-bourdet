import React from 'react';
import GridCell from '../GridCell';
import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

function GridLine ({ row, gridWidth, foodCell }) {
    const cols = [];

    for (let col = 0; col < gridWidth; col++) {
        cols.push(<GridCell isFood={row === foodCell.row && col === foodCell.col} key={row + '_' + col}/>);
    }

    return (
        <Row className="m-0">{cols}</Row>
    );
}

GridLine.propTypes = {
    row: PropTypes.number.isRequired,
    gridWidth: PropTypes.number.isRequired,
    foodCell: PropTypes.object.isRequired
};

export default GridLine;
