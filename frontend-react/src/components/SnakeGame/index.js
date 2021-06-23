import React, { useState } from 'react';
import GridLine from './GridLine';

function SnakeGame () {
    const [gridSize] = useState({ rows: 10, cols: 20 });
    const initialSnake = {
        head:
            {
                row: Math.floor(gridSize.rows / 2),
                col: Math.floor(gridSize.cols / 5)
            },
        tail: [{
            row: Math.floor(gridSize.rows / 2),
            col: Math.floor(gridSize.cols / 5) - 1
        },
        {
            row: Math.floor(gridSize.rows / 2),
            col: Math.floor(gridSize.cols / 5) - 2
        }]
    };
    const [snake, setSnake] = useState(initialSnake);

    const getRandomCell = () => {
        return {
            row: Math.floor(Math.random() * gridSize.rows),
            col: Math.floor(Math.random() * gridSize.cols)
        };
    };
    const [foodCell, setFoodCell] = useState(getRandomCell());

    const grid = [];
    for (let row = 0; row < gridSize.rows; row++) {
        grid.push(<GridLine snake={snake} foodCell={foodCell} key={row} row={row} gridWidth={gridSize.cols}/>);
    }

    return (
        <div className="d-table border m-auto">{grid}</div>
    );
}
export default SnakeGame;
