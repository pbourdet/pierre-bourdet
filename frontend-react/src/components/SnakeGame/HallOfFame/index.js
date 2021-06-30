import React, { useEffect, useState } from 'react';
import { Col, Row, Spinner, Table } from 'react-bootstrap';
import { getTopSnakeGames, getUserSnakeGames } from '../../../requests/snakeGames';
import { FormattedDate, FormattedMessage, FormattedTime } from 'react-intl';
import { useAuth, useAuthUpdate } from '../../../contexts/AuthContext';
import { faTrophy } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import refreshToken from '../../../requests/refreshToken';

function HallOfFame () {
    const [topGames, setTopGames] = useState([]);
    const [topGamesLoading, setTopGamesLoading] = useState(true);
    const [userGames, setUserGames] = useState([]);
    const [userGamesLoading, setUserGamesLoading] = useState(true);
    const auth = useAuth();
    const updateAuth = useAuthUpdate();

    useEffect(() => {
        if (auth === null) {
            setUserGamesLoading(false);
            return;
        }

        (async () => {
            await refreshToken(auth, updateAuth);
            const userGames = await getUserSnakeGames();
            setUserGames(userGames);
            setUserGamesLoading(false);
        })();
    }, [auth]);

    useEffect(() => {
        (async () => {
            const games = await getTopSnakeGames();
            setTopGames(games);
            setTopGamesLoading(false);
        })();
    }, []);

    if (topGamesLoading || userGamesLoading) {
        return (
            <div className="m-5">
                <Spinner animation="grow" variant="success"/>
                <Spinner animation="grow" variant="danger"/>
                <Spinner animation="grow" variant="warning"/>
            </div>
        );
    }

    return (
        <Row className="mt-5">
            <Col sm={6}>
                <h5 className="m-3">
                    <FontAwesomeIcon className="mr-2" icon={faTrophy}/><FormattedMessage id="snake.hof.highestScores"/>
                </h5>
                <Table striped bordered>
                    <thead>
                        <tr>
                            <th>Score</th>
                            <th><FormattedMessage id="snake.hof.player"/></th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {topGames.map((game, index) => (
                            <tr key={index}>
                                <td>{game.score}</td>
                                <td>{game.user.nickname}</td>
                                <td><FormattedDate value={game.createdAt}/> - <FormattedTime value={game.createdAt}/></td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            </Col>
            <Col sm={6}>
                <h5 className="m-3">
                    <FontAwesomeIcon className="mr-2" icon={faTrophy}/><FormattedMessage id="snake.hof.userScores"/>
                </h5>
                {auth === null
                    ? <div><FormattedMessage id="snake.hof.loggedOut"/></div>
                    : <Table bordered>
                        <thead>
                            <tr>
                                <th>Score</th>
                                <th>Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userGames.map((game, index) => (
                                <tr key={index}>
                                    <td>{game.score}</td>
                                    <td><FormattedDate value={game.createdAt}/> - <FormattedTime value={game.createdAt}/></td>
                                </tr>
                            ))}
                            {userGames.length === 0 &&
                            <tr>
                                <td><FormattedMessage id="snake.hof.noGames"/></td>
                            </tr>
                            }
                        </tbody>
                    </Table>
                }
            </Col>
        </Row>
    );
}

export default HallOfFame;
