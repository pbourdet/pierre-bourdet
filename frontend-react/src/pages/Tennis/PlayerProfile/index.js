import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import variants from '../../../config/framer-motion';
import { Helmet } from 'react-helmet';
import { Container, Spinner } from 'react-bootstrap';
import { Redirect, useLocation, useParams } from 'react-router-dom';
import { getPlayerProfile } from '../../../requests/Tennis/playerProfile';
import PlayerInformationTable from '../../../components/Tennis/PlayerInformationTable';
import { useLocale } from '../../../contexts/LocaleContext';

function TennisPlayerProfile () {
    const location = useLocation();
    const params = useParams();
    const locale = useLocale();
    const [loading, setLoading] = useState(true);
    const [player, setPlayer] = useState({});

    if (location.state === undefined) {
        return <Redirect to="/tennis/rankings"/>;
    }

    const title = params.name.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
    const playerId = location.state.playerId;

    useEffect(() => {
        async function getPlayerData () {
            const playerData = await getPlayerProfile(playerId, locale);

            setPlayer(playerData);
            setLoading(false);
        }

        getPlayerData();
    }, []);

    return (
        <motion.div variants={variants} initial="hidden" animate="visible">
            <Helmet><title>{title}</title></Helmet>
            <h1 className="m-3 text-capitalize">{title}</h1>
            <Container className="shadow p-md-3 p-0 border">
                {loading
                    ? <div className="m-5">
                        <Spinner animation="grow" variant="success"/>
                        <Spinner animation="grow" variant="danger"/>
                        <Spinner animation="grow" variant="warning"/>
                    </div>
                    : <div><PlayerInformationTable player={player}/></div>
                }
            </Container>
        </motion.div>
    );
}

export default TennisPlayerProfile;
