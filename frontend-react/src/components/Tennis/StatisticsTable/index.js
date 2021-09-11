import React from 'react';
import { Tab, Tabs } from 'react-bootstrap';
import PropTypes from 'prop-types';
import SurfacesTable from '../SurfacesTable';
import { FormattedMessage } from 'react-intl';

function StatisticsTable ({ player }) {
    return (
        <div>
            <hr/>
            <h2><FormattedMessage id="tennis.player.statistics.title"/></h2>
            <Tabs className="mb-3">
                <Tab eventKey="surfaces" title="Surfaces">
                    <SurfacesTable periods={player.periods}/>
                </Tab>
            </Tabs>
        </div>
    );
}

StatisticsTable.propTypes = {
    player: PropTypes.shape({
        competitor: PropTypes.object,
        competitorRankings: PropTypes.array,
        info: PropTypes.object,
        periods: PropTypes.array
    })
};

export default StatisticsTable;
