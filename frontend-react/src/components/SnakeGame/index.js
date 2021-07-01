import React, { useCallback, useEffect, useState } from 'react';
import GridLine from './GridLine';
import GameOver from './GameOver';
import SpeedSelector from './SpeedSelector';
import useInterval from '../../hooks/useInterval';

function SnakeGame () {
    const [speed, setSpeed] = useState(Number(localStorage.getItem('snake-speed')) || 5);
    const [score, setScore] = useState(0);
    const [tickRate, setTickRate] = useState(1000 / speed);
    const [gridSize] = useState({ rows: 10, cols: 20 });
    const [gameOver, setGameOver] = useState(false);
    const [direction, setDirection] = useState('right');
    const [directionChanged, setDirectionChanged] = useState(false);
    const [foodCell, setFoodCell] = useState({ row: 5, col: 10 });
    const [snake, setSnake] = useState({
        head:
            {
                row: Math.ceil(gridSize.rows / 2),
                col: Math.ceil(gridSize.cols / 5),
                direction: 'right'
            },
        tails: [
            {
                row: Math.ceil(gridSize.rows / 2),
                col: Math.ceil(gridSize.cols / 5) - 1,
                direction: 'right'
            }
        ]
    });

    function getRandomEmptyCell (newSnake) {
        let row = Math.ceil(Math.random() * gridSize.rows);
        let col = Math.ceil(Math.random() * gridSize.cols);

        while (isFoodOnSnake(newSnake, row, col)) {
            row = Math.ceil(Math.random() * gridSize.rows);
            col = Math.ceil(Math.random() * gridSize.cols);
        }

        return { row: row, col: col };
    }

    function isFoodOnSnake (newSnake, foodRow, foodCol) {
        if (newSnake.head.row === foodRow && newSnake.head.col === foodCol) {
            return true;
        }

        for (let tail = 0; tail < newSnake.tails.length; tail++) {
            if (newSnake.tails[tail].row === foodRow && newSnake.tails[tail].col === foodCol) {
                return true;
            }
        }

        return false;
    }

    function moveSnake () {
        const newSnake = { ...snake };
        let previousPart = newSnake.head;
        newSnake.head = moveHead();

        for (let tail = 0; tail < newSnake.tails.length; tail++) {
            const tempPart = newSnake.tails[tail];
            newSnake.tails[tail] = previousPart;
            previousPart = tempPart;
        }

        return newSnake;
    }

    function moveHead () {
        switch (direction) {
        case 'left':
            return moveHeadLeft();
        case 'right':
            return moveHeadRight();
        case 'up':
            return moveHeadUp();
        case 'down':
            return moveHeadDown();
        default:
            break;
        }
    }

    function moveHeadLeft () {
        return {
            row: snake.head.row,
            col: snake.head.col === 1 ? gridSize.cols : snake.head.col - 1,
            direction: 'left'
        };
    }

    function moveHeadRight () {
        return {
            row: snake.head.row,
            col: snake.head.col === gridSize.cols ? 1 : snake.head.col + 1,
            direction: 'right'
        };
    }

    function moveHeadDown () {
        return {
            row: snake.head.row === gridSize.rows ? 1 : snake.head.row + 1,
            col: snake.head.col,
            direction: 'down'
        };
    }

    function moveHeadUp () {
        return {
            row: snake.head.row === 1 ? gridSize.rows : snake.head.row - 1,
            col: snake.head.col,
            direction: 'up'
        };
    }

    function eatApple (newSnake) {
        if (newSnake.head.row !== foodCell.row || newSnake.head.col !== foodCell.col) return newSnake;

        setFoodCell(getRandomEmptyCell(newSnake));
        setScore(score => score + speed);
        newSnake.tails.push({ row: newSnake.tails[0].row, col: newSnake.tails[0].col, direction: direction });

        return newSnake;
    }

    const handleKeyPress = (event) => {
        const { keyCode } = event;

        if ([32, 37, 38, 39, 40].includes(keyCode)) event.preventDefault();

        if (gameOver && keyCode === 32) {
            initGame();

            return;
        }

        const verticalDirections = ['up', 'down'];
        const horizontalDirections = ['left', 'right'];

        if (directionChanged === true) return;

        switch (keyCode) {
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
        if (gameOver === true) {
            return;
        }

        let newSnake = moveSnake();

        if (hasSnakeHitItself(newSnake)) setGameOver(true);

        newSnake = eatApple(newSnake);

        setSnake(newSnake);
        setDirectionChanged(false);
    };

    const hasSnakeHitItself = (newSnake) => {
        for (let tail = 0; tail < newSnake.tails.length; tail++) {
            if (newSnake.head.row === newSnake.tails[tail].row && newSnake.head.col === newSnake.tails[tail].col) {
                return true;
            }
        }

        return false;
    };

    const initGame = useCallback((newSpeed = null) => {
        setSnake({
            head:
                {
                    row: Math.ceil(gridSize.rows / 2),
                    col: Math.ceil(gridSize.cols / 5),
                    direction: 'right'
                },
            tails: [
                {
                    row: Math.ceil(gridSize.rows / 2),
                    col: Math.ceil(gridSize.cols / 5) - 1,
                    direction: 'right'
                }
            ]
        });
        setFoodCell({ row: 5, col: 10 });
        setDirection('right');
        setDirectionChanged(false);
        setGameOver(false);
        setScore(0);

        if (newSpeed !== null) {
            setSpeed(newSpeed);
            setTickRate(1000 / newSpeed);
        }
    }, [gridSize]);

    useEffect(() => {
        document.addEventListener('keydown', handleKeyPress);

        return () => document.removeEventListener('keydown', handleKeyPress);
    });

    useEffect(() => {
        function initialize () {
            initGame();
        }

        initialize();
    }, [initGame]);

    const grid = [];
    for (let row = 1; row <= gridSize.rows; row++) {
        grid.push(<GridLine snake={snake} foodCell={foodCell} key={row} row={row} gridWidth={gridSize.cols}/>);
    }

    const delay = gameOver ? null : tickRate;
    useInterval(gameTick, delay);

    return (
        <div className="mt-3">
            <div className="mb-3 d-flex justify-content-around">
                <SpeedSelector currentSpeed={speed} initGame={initGame}/>
                <div className="d-table"><div className="d-table-cell align-middle"><span className="font-weight-bold">Score</span> : {score}</div></div>
            </div>
            <div style={{ width: gridSize.cols * 35, height: gridSize.rows * 35, outline: '1px solid #ddd' }} className="mt-3 m-auto">
                {gameOver
                    ? <GameOver score={score} initGame={initGame}/>
                    : grid
                }
            </div>
        </div>
    );
}

export default SnakeGame;
