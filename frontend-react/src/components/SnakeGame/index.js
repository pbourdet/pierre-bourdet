import React from 'react';
import GridLine from './GridLine';

function SnakeGame () {
    const gridSize = { rows: 10, cols: 20 };
    const grid = [];

    const getRandomCell = () => {
        return {
            row: Math.floor(Math.random() * gridSize.rows),
            col: Math.floor(Math.random() * gridSize.cols)
        };
    };

    const foodCell = getRandomCell();

    for (let row = 0; row < gridSize.rows; row++) {
        grid.push(<GridLine foodCell={foodCell} key={row} row={row} gridWidth={gridSize.cols}/>);
    }

    return (
        <div className="d-table border m-auto">{grid}</div>
    );
}
export default SnakeGame;
