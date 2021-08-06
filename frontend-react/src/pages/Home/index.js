import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import { Card, Col, Container, Row } from 'react-bootstrap';
import { faHome, faCode, faServer, faCogs } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import TechnicalStackEntry from '../../components/TechnicalStackEntry';
import { motion } from 'framer-motion';
import variants from '../../config/framer-motion';

function Home () {
    return (
        <motion.div variants={variants} initial="hidden" animate="visible">
            <Container>
                <FormattedMessage id="homepage.title">
                    {title => <Helmet><title>{title}</title></Helmet>}
                </FormattedMessage>
                <h1 className="mt-2 mb-3">
                    <FontAwesomeIcon className="mr-2" icon={faHome}/>
                    <FormattedMessage id="homepage.title"/>
                </h1>
                <Card className="mt-4 m-2 pr-2 pl-2 shadow">
                    <Card.Body>
                        <Card.Title className="mb-3">
                            <FormattedMessage id="homepage.introCard.title"/>
                        </Card.Title>
                        <div className="h5 text-justify font-weight-normal">
                            <div className="mb-3">
                                <FormattedMessage
                                    id="homepage.introCard.text1"
                                    values={{
                                        // eslint-disable-next-line react/display-name
                                        a: chunks => (
                                            <a target="_blank" href={process.env.REACT_APP_API_URL} rel="noopener noreferrer">
                                                {chunks}
                                            </a>
                                        )
                                    }}
                                />
                            </div>
                            <div className="mb-3">
                                <FormattedMessage id="homepage.introCard.text2"/>
                            </div>
                            <div className="mb-3">
                                <FormattedMessage
                                    id="homepage.introCard.text3"
                                    values={{
                                        // eslint-disable-next-line react/display-name
                                        a: chunks => (
                                            <a target="_blank" href="https://github.com/pbourdet/pierre-bourdet" rel="noopener noreferrer">
                                                {chunks}
                                            </a>
                                        )
                                    }}
                                />
                            </div>
                            <div>
                                <FormattedMessage id="homepage.introCard.text4"/>
                            </div>
                        </div>
                    </Card.Body>
                </Card>
                <Card className="mt-5 m-2 pr-2 pl-2 shadow">
                    <Row className="mt-4 mb-3">
                        <Col sm={4} className="border-right">
                            <div className="h5 mb-4">
                                <FontAwesomeIcon className="mr-2" icon={faCode}/>
                                <span>Front-end</span>
                            </div>
                            <div className="text-justify ml-3">
                                <ul>
                                    <TechnicalStackEntry entry="react" version="17"/>
                                    <TechnicalStackEntry entry="bootstrap" version="4"/>
                                    <TechnicalStackEntry entry="jest"/>
                                    <TechnicalStackEntry entry="formatjs" version="React-intl"/>
                                    <TechnicalStackEntry entry="eslint"/>
                                </ul>
                            </div>
                        </Col>
                        <Col sm={4} className="border-right">
                            <div className="h5 mb-4">
                                <FontAwesomeIcon className="mr-2" icon={faServer}/>
                                <span>Back-end</span>
                            </div>
                            <div className="text-justify ml-3">
                                <ul>
                                    <TechnicalStackEntry entry="PHP" version="8"/>
                                    <TechnicalStackEntry entry="symfony" version="5.3"/>
                                    <TechnicalStackEntry entry="API-Platform"/>
                                    <TechnicalStackEntry entry="doctrine"/>
                                    <TechnicalStackEntry entry="phpunit"/>
                                    <TechnicalStackEntry entry="rabbitmq"/>
                                </ul>
                            </div>
                        </Col>
                        <Col sm={4}>
                            <div className="h5 mb-4">
                                <FontAwesomeIcon className="mr-2" icon={faCogs}/>
                                <span><FormattedMessage id="homepage.techCard.misc"/></span>
                            </div>
                            <div className="text-justify ml-3">
                                <ul>
                                    <TechnicalStackEntry entry="circleci"/>
                                    <TechnicalStackEntry entry="sentry"/>
                                    <TechnicalStackEntry entry="laravel" version="Homestead"/>
                                    <TechnicalStackEntry entry="vagrant"/>
                                </ul>
                            </div>
                        </Col>
                    </Row>
                </Card>
            </Container>
        </motion.div>
    );
}

export default Home;
