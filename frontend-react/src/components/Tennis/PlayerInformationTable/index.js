import React from 'react';
import { Col, Row, Table } from 'react-bootstrap';
import { FormattedDate, FormattedMessage, FormattedNumber } from 'react-intl';
import img from '../../../assets/img';
import PropTypes from 'prop-types';

function PlayerInformationTable ({ player }) {
    const rankingsOrder = ['singles', 'doubles'];
    const orderedRankings = player.competitorRankings
        .sort((r1, r2) => rankingsOrder.indexOf(r1.type) - rankingsOrder.indexOf(r2.type))
        .sort((r1, r2) => r1.raceRanking - r2.raceRanking);

    return (
        <Row>
            <Col md={3}>
                <Row>
                    <Col className="d-flex align-items-center justify-content-center p-1" xs={5} sm={6} md={12}>
                        <img className="m-3 img-thumbnail" width={150} height={150}
                            src={img.tennis.placeholder[player.competitor.gender]} alt={`${player.competitor.gender} placeholder`}
                        />
                    </Col>
                    <Col xs={7} sm={6} md={12}>
                        <Table size="sm" className="text-left">
                            <thead>
                                <tr>
                                    <th><FormattedMessage id="tennis.player.info.rankings"/></th>
                                    <th/>
                                </tr>
                            </thead>
                            <tbody>
                                {orderedRankings.map((ranking, index) => (
                                    <tr key={index}>
                                        <td>
                                            {ranking.raceRanking && 'Race '}
                                            <FormattedMessage id={`tennis.rankings.competition.${ranking.type}`}/>
                                        </td>
                                        <td>#{ranking.rank}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </Col>
            <Col>
                <Table>
                    <tbody className="text-left">
                        <tr>
                            <td className="font-weight-bold"><FormattedMessage id="tennis.player.info.nationality"/></td>
                            <td>{player.competitor.country}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold"><FormattedMessage id="tennis.player.info.birth"/></td>
                            <td><FormattedDate value={player.info.dateOfBirth}/></td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold"><FormattedMessage id="tennis.player.info.body"/></td>
                            <td>
                                <FormattedNumber value={player.info.height} unit="centimeter" style="unit"/>{' - '}
                                <FormattedNumber value={player.info.weight} unit="kilogram" style={'unit'}/>
                            </td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold"><FormattedMessage id="tennis.player.info.handedness"/></td>
                            <td><FormattedMessage id={`tennis.player.handedness.${player.info.handedness}`}/></td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold"><FormattedMessage id="tennis.player.info.proDate"/></td>
                            <td>{player.info.proYear}</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold"><FormattedMessage id="tennis.player.info.highestSinglesRanking"/></td>
                            <td>#{player.info.highestSinglesRanking} ({player.info.highestSinglesRankingDate.replace('.', '/')})</td>
                        </tr>
                        <tr>
                            <td className="font-weight-bold"><FormattedMessage id="tennis.player.info.highestDoublesRanking"/></td>
                            <td>#{player.info.highestDoublesRanking} ({player.info.highestDoublesRankingDate.replace('.', '/')})</td>
                        </tr>
                    </tbody>
                </Table>
            </Col>
        </Row>
    );
}

PlayerInformationTable.propTypes = {
    player: PropTypes.shape({
        competitor: PropTypes.object,
        competitorRankings: PropTypes.array,
        info: PropTypes.object,
        periods: PropTypes.array
    })
};

export default PlayerInformationTable;
