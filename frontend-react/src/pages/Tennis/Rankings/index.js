import React from 'react';
import { motion } from 'framer-motion';
import variants from '../../../config/framer-motion';
import { Helmet } from 'react-helmet';
import { Container, Tab, Tabs } from 'react-bootstrap';
import RankingsTable from '../../../components/Tennis/RankingsTable';
import { FormattedMessage } from 'react-intl';

function TennisRankings () {
    const rankings = ['ATP-singles', 'WTA-singles', 'ATP-doubles', 'WTA-doubles'];

    return (
        <motion.div variants={variants} initial="hidden" animate="visible">
            <FormattedMessage id="tennis.rankings.title">
                {title => <Helmet><title>{title}</title></Helmet>}
            </FormattedMessage>
            <h1 className="m-2"><FormattedMessage id="tennis.rankings.title"/></h1>
            <Container className="shadow p-md-3 p-0 border">
                <Tabs mountOnEnter={true} defaultActiveKey={rankings[0]} id="uncontrolled-tab-example" className="mb-3">
                    {rankings.map((ranking, index) => (
                        <Tab key={index} eventKey={ranking} title={<FormattedMessage id={`tennis.rankings.competition.${ranking}`}/>}>
                            <RankingsTable ranking={ranking}/>
                        </Tab>
                    ))}
                </Tabs>
            </Container>
        </motion.div>
    );
}

export default TennisRankings;
