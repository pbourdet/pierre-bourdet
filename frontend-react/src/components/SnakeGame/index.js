import React from 'react';
import GridLine from './GridLine';

function SnakeGame () {
    const gridSize = { rows: 10, cols: 20 };
    const grid = [];

    for (let i = 0; i < gridSize.rows; i++) {
        grid.push(<GridLine key={i} rowNumber={i} gridWidth={gridSize.cols}/>);
    }

    return (
        <div className="d-table border m-auto">{grid}</div>
    );
}
export default SnakeGame;
