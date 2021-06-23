import React, { useCallback, useEffect, useState } from 'react';
import GridLine from './GridLine';

function SnakeGame () {
    const [tickRate] = useState(1000);
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

    const getRandomCell = useCallback(() => {
        return {
            row: Math.floor(Math.random() * gridSize.rows),
            col: Math.floor(Math.random() * gridSize.cols)
        };
    }, [gridSize]);
    const [foodCell, setFoodCell] = useState(getRandomCell());

    const gameTick = useCallback(() => {
        const newSnake = { ...snake };
        newSnake.tail.unshift({
            row: snake.head.row,
            col: snake.head.col
        });

        newSnake.head.col++;

        if (newSnake.head.row === foodCell.row && newSnake.head.col === foodCell.col) {
            setFoodCell(getRandomCell());
        } else {
            newSnake.tail.pop();
        }

        setSnake(newSnake);
    }, [snake, foodCell, getRandomCell]);

    const grid = [];
    for (let row = 0; row < gridSize.rows; row++) {
        grid.push(<GridLine snake={snake} foodCell={foodCell} key={row} row={row} gridWidth={gridSize.cols}/>);
    }

    useEffect(() => {
        window.fnInterval = setInterval(() => {
            gameTick();
        }, tickRate);

        return () => clearInterval(window.fnInterval);
    }, [tickRate, gameTick]);

    return (
        <div className="d-table border m-auto">{grid}</div>
    );
}
export default SnakeGame;
