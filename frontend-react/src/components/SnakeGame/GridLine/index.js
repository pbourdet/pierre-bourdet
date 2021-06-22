import React from 'react';
import GridCell from '../GridCell';
import { Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

function GridLine ({ rowNumber, gridWidth }) {
    const cols = [];
    for (let i = 0; i < gridWidth; i++) {
        cols.push(<GridCell key={rowNumber + i}/>);
    }

    return (
        <Row className="m-0">{cols}</Row>
    );
}

GridLine.propTypes = {
    rowNumber: PropTypes.number.isRequired,
    gridWidth: PropTypes.number.isRequired
};

export default GridLine;
