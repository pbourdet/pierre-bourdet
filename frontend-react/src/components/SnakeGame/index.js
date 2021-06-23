import React, { useCallback, useEffect, useRef, useState } from 'react';
import GridLine from './GridLine';

function SnakeGame () {
    const [tickRate] = useState(200);
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

    const [direction, setDirection] = useState('right');
    const [directionChanged, setDirectionChanged] = useState(false);

    const handleKeyPress = (event) => {
        const verticalDirections = ['up', 'down'];
        const horizontalDirections = ['left', 'right'];

        if (directionChanged === true) return;

        switch (event.keyCode) {
        case 37:
            if (!horizontalDirections.includes(direction)) {
                setDirection('left');
            }

            break;
        case 38:
            if (!verticalDirections.includes(direction)) {
                setDirection('up');
            }

            break;
        case 39:
            if (!horizontalDirections.includes(direction)) {
                setDirection('right');
            }

            break;
        case 40:
            if (!verticalDirections.includes(direction)) {
                setDirection('down');
            }

            break;
        default:
            break;
        }

        setDirectionChanged(true);
    };

    const gameTick = () => {
        const newSnake = { ...snake };
        newSnake.tail.unshift({
            row: snake.head.row,
            col: snake.head.col
        });

        switch (direction) {
        case 'left':
            newSnake.head.col--;
            break;

        case 'right':
            newSnake.head.col++;
            break;

        case 'up':
            newSnake.head.row--;
            break;

        case 'down':
            newSnake.head.row++;
            break;

        default:
            break;
        }

        if (newSnake.head.row === foodCell.row && newSnake.head.col === foodCell.col) {
            setFoodCell(getRandomCell());
        } else {
            newSnake.tail.pop();
        }

        setDirectionChanged(false);
        setSnake(newSnake);
    };

    const grid = [];
    for (let row = 0; row < gridSize.rows; row++) {
        grid.push(<GridLine snake={snake} foodCell={foodCell} key={row} row={row} gridWidth={gridSize.cols}/>);
    }

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);

        return () => document.removeEventListener('keydown', handleKeyPress);
    });

    useInterval(gameTick, tickRate);

    function useInterval (callback, delay) {
        const savedCallback = useRef();

        useEffect(() => {
            savedCallback.current = callback;
        }, [callback]);

        useEffect(() => {
            function tick () {
                savedCallback.current();
            }
            if (delay !== null) {
                const id = setInterval(tick, delay);
                return () => clearInterval(id);
            }
        }, [delay]);
    }

    return (
        <div className="d-table border m-auto">{grid}</div>
    );
}

export default SnakeGame;
