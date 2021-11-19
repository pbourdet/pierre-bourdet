import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { Table } from 'react-bootstrap';
import { getRankings } from '../../../requests/Tennis/rankings';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { FormattedMessage } from 'react-intl';
import PropTypes from 'prop-types';
import { useLocale } from '../../../contexts/LocaleContext';
import Loader from '../../Loader';

function RankingsTable ({ ranking }) {
    const [name, type] = ranking.split('-');
    const history = useHistory();
    const locale = useLocale();

    if (type === 'doubles') {
        return <div>Soon...</div>;
    }

    const [rankings, setRankings] = useState({ competitorRankings: [] });
    const [loading, setLoading] = useState(true);

    const handleRowClick = (competitor) => {
        const formattedName = competitor.name.replace(/\W\s/, '-').toLowerCase();
        history.push(`/tennis/player/${formattedName}`, { playerId: competitor.id });
    };

    const getMovementSpan = (movement) => {
        let className = 'text-success';
        let icon = faChevronUp;

        if (movement < 0) {
            className = 'text-danger';
            icon = faChevronDown;
        }

        return <span className={className}>
            <small><FontAwesomeIcon icon={icon}/> {movement}</small>
        </span>;
    };

    useEffect(() => {
        async function getRankingsData () {
            const rankingsData = await getRankings(name, type, locale);

            setRankings(rankingsData);
            setLoading(false);
        }

        getRankingsData();
    }, []);

    if (loading) {
        return <Loader/>;
    }

    return (
        <Table hover>
            <thead>
                <tr>
                    <th className="col-1"/>
                    <th className="col-1">#</th>
                    <th className="text-justify"><FormattedMessage id="tennis.rankings.table.name"/></th>
                    <th className="col-2 d-none d-sm-table-cell"><FormattedMessage id="tennis.rankings.table.tournaments"/></th>
                    <th className="col-1"><FormattedMessage id="tennis.rankings.table.points"/></th>
                </tr>
            </thead>
            <tbody style={{ fontSize: '95%' }}>
                {rankings.competitorRankings.map((competitorRanking, index) => (
                    <tr onClick={() => handleRowClick(competitorRanking.competitor)} style={{ cursor: 'pointer' }} key={index}>
                        <td className="pl-0 pr-0" style={{ fontSize: '85%' }}>
                            {competitorRanking.movement !== 0 && getMovementSpan(competitorRanking.movement)}
                        </td>
                        <td className="pl-0 pr-0 font-weight-bold">{competitorRanking.rank}.</td>
                        <td className="pl-0 pr-0 text-left text-capitalize text-info">
                            <u>{competitorRanking.competitor.name.toLowerCase()}</u>
                        </td>
                        <td className="pl-0 pr-0 col-2 d-none d-sm-table-cell">{competitorRanking.competitionsPlayed}</td>
                        <td className="pl-0 pr-0">{competitorRanking.points}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    );
}

RankingsTable.propTypes = {
    ranking: PropTypes.string
};

export default RankingsTable;
