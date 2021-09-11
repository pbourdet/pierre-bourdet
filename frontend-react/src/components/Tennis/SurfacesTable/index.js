import React from 'react';
import { Tab, Table, Tabs } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { FormattedMessage } from 'react-intl';

function SurfacesTable ({ periods }) {
    periods.sort((p1, p2) => p2.year - p1.year);
    periods.unshift(periods.pop());

    periods.forEach(period => period.surfaces.sort((s1, s2) => s1.type.localeCompare(s2.type)));

    const resolveSurfaceBackground = (type) => {
        if (type === 'GRASS') return 'bg-success';
        if (type === 'CLAY') return 'bg-warning';

        return 'bg-primary';
    };

    return (
        <div>
            <Tabs variant="pills" className="mb-3">
                {periods.map((period, index) => (
                    <Tab key={index} eventKey={index} title={period.year === 0 ? 'Total' : period.year}>
                        <Table>
                            <thead>
                                <tr>
                                    <th/>
                                    <th><FormattedMessage id="tennis.player.statistics.played"/></th>
                                    <th><FormattedMessage id="tennis.player.statistics.won"/></th>
                                    <th><FormattedMessage id="tennis.player.statistics.win"/></th>
                                </tr>
                            </thead>
                            <tbody>
                                {period.surfaces.map((surface, index) => (
                                    <tr key={index}>
                                        <td>
                                            <div title={surface.type} className={`m-auto ${resolveSurfaceBackground(surface.type)}`} style={{ height: '20px', width: '50px' }}/>
                                        </td>
                                        <td>{surface.statistics.matchesPlayed}</td>
                                        <td>{surface.statistics.matchesWon}</td>
                                        <td>
                                            {Math.round(100 * surface.statistics.matchesWon / surface.statistics.matchesPlayed)}%
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td>Total</td>
                                    <td>{period.statistics.matchesPlayed}</td>
                                    <td>{period.statistics.matchesWon}</td>
                                    <td>
                                        {Math.round(100 * period.statistics.matchesWon / period.statistics.matchesPlayed)}%
                                    </td>
                                </tr>
                            </tbody>
                        </Table>
                    </Tab>
                ))}
            </Tabs>
        </div>
    );
}

SurfacesTable.propTypes = {
    periods: PropTypes.arrayOf(PropTypes.shape({
        statistics: PropTypes.objectOf(PropTypes.number),
        year: PropTypes.number,
        surfaces: PropTypes.arrayOf(PropTypes.shape({
            statistics: PropTypes.objectOf(PropTypes.number),
            type: PropTypes.string
        }))
    }))
};

export default SurfacesTable;
