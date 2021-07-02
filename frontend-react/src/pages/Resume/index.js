import React from 'react';
import { FormattedMessage } from 'react-intl';
import { Helmet } from 'react-helmet';
import Header from '../../components/Resume/Header';
import Section from '../../components/Resume/Section';
import Entry from '../../components/Resume/Entry';
import img from '../../assets/img';
import ContactMeModal from '../../components/Resume/ContactMeModal';
import { faChess, faCode, faCogs, faGamepad, faLanguage, faServer } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row } from 'react-bootstrap';
import TechnicalStackEntry from '../../components/TechnicalStackEntry';
import variants from '../../config/framer-motion';
import { motion } from 'framer-motion';

function Resume () {
    return (
        <motion.div variants={variants} initial="hidden" animate="visible">
            <FormattedMessage id="resume.title">
                {title => <Helmet><title>{title}</title></Helmet>}
            </FormattedMessage>
            <Header/>
            <Section title={<FormattedMessage id="resume.experience.title"/>}>
                <Entry
                    date={<FormattedMessage id="resume.experience.ekwateur.date"/>}
                    img={img.society.ekwateur}
                    title={<FormattedMessage id="resume.experience.ekwateur.title"/>}
                    location="Paris IX, France"
                >
                    <div><FormattedMessage id="resume.experience.ekwateur.line1"/></div>
                    <div><FormattedMessage id="resume.experience.ekwateur.line2"/></div>
                    <div><FormattedMessage id="resume.experience.ekwateur.line3"/></div>
                </Entry>
                <Entry
                    date={<FormattedMessage id="resume.experience.bnp.date"/>}
                    img={img.society.hn}
                    title={<FormattedMessage id="resume.experience.bnp.title"/>}
                    location="Montreuil, France"
                >
                    <div><FormattedMessage id="resume.experience.bnp.line1"/></div>
                    <div><FormattedMessage id="resume.experience.bnp.line2"/></div>
                </Entry>
                <Entry
                    date={<FormattedMessage id="resume.experience.nxs.date"/>}
                    img={img.society.hn}
                    title={<FormattedMessage id="resume.experience.nxs.title"/>}
                    location="Charenton-le-Pont, France"
                >
                    <div><FormattedMessage id="resume.experience.nxs.line1"/></div>
                    <div><FormattedMessage id="resume.experience.nxs.line2"/></div>
                    <div><FormattedMessage id="resume.experience.nxs.line3"/></div>
                </Entry>
                <Entry
                    date={<FormattedMessage id="resume.experience.pcs.date"/>}
                    img={img.society.hn}
                    title={<FormattedMessage id="resume.experience.pcs.title"/>}
                    location="Charenton-le-Pont, France"
                >
                    <div><FormattedMessage id="resume.experience.pcs.line1"/></div>
                    <div><FormattedMessage id="resume.experience.pcs.line2"/></div>
                    <div><FormattedMessage id="resume.experience.pcs.line3"/></div>
                </Entry>
            </Section>
            <Section title={<FormattedMessage id="resume.education.title"/>}>
                <Entry
                    date={<FormattedMessage id="resume.education.opcr.date"/>}
                    img={img.society.opcr}
                    title={<FormattedMessage id="resume.education.opcr.title"/>}
                >
                    <div><FormattedMessage id="resume.education.opcr.line1"/></div>
                </Entry>
                <Entry
                    date={<FormattedMessage id="resume.education.hni.date"/>}
                    img={img.society.hn}
                    title={<FormattedMessage id="resume.education.hni.title"/>}
                    location="Paris XII, France"
                >
                    <div><FormattedMessage id="resume.education.hni.line1"/></div>
                </Entry>
                <Entry
                    date={<FormattedMessage id="resume.education.n7.date"/>}
                    img={img.society.n7}
                    title={<FormattedMessage id="resume.education.n7.title"/>}
                    location="Toulouse, France"
                >
                    <div><FormattedMessage id="resume.education.n7.line1"/></div>
                </Entry>
            </Section>
            <Section title={<FormattedMessage id="resume.skills.title"/>}>
                <Row>
                    <Col className="text-center h5">
                        <FormattedMessage id="resume.skills.programming.title"/>
                    </Col>
                </Row>
                <Row className="text-center mt-3 mb-3 border-bottom">
                    <Col sm={4} className="border-right">
                        <div className="h5 font-weight-normal mb-4">
                            <FontAwesomeIcon className="mr-2" icon={faCode}/>
                            <span>Front-end</span>
                        </div>
                        <div className="text-justify ml-3">
                            <ul>
                                <TechnicalStackEntry entry="react"/>
                                <TechnicalStackEntry entry="bootstrap"/>
                                <TechnicalStackEntry entry="jquery"/>
                            </ul>
                        </div>
                    </Col>
                    <Col sm={4} className="border-right">
                        <div className="h5 font-weight-normal mb-4">
                            <FontAwesomeIcon className="mr-2" icon={faServer}/>
                            <span>Back-end</span>
                        </div>
                        <div className="text-justify ml-3">
                            <ul>
                                <TechnicalStackEntry entry="PHP"/>
                                <TechnicalStackEntry entry="symfony"/>
                                <TechnicalStackEntry entry="API-Platform"/>
                            </ul>
                        </div>
                    </Col>
                    <Col sm={4}>
                        <div className="h5 font-weight-normal mb-4">
                            <FontAwesomeIcon className="mr-2" icon={faCogs}/>
                            <span><FormattedMessage id="resume.skills.misc"/></span>
                        </div>
                        <div className="text-justify ml-3">
                            <ul>
                                <TechnicalStackEntry entry="circleci"/>
                                <TechnicalStackEntry entry="git"/>
                            </ul>
                        </div>
                    </Col>
                </Row>
                <Row className="mt-4 mb-3">
                    <Col sm={4} className="ml-3">
                        <div className="text-center font-weight-normal h5 mb-3">
                            <FontAwesomeIcon className="mr-2" icon={faLanguage}/>
                            <span><FormattedMessage id="resume.skills.languages.title"/></span>
                        </div>
                        <div className="ml-3">
                            <img id="fr-flag" className="mr-1"
                                height={25} width={25}
                                alt="fr-flag" src={img.flag['fr-FR']}
                            />
                            <FormattedMessage id="resume.skills.languages.french"/>
                        </div>
                        <div className="ml-3">
                            <img id="en-flag" className="mr-1"
                                height={25} width={25}
                                alt="en-flag" src={img.flag['en-GB']}
                            />
                            <FormattedMessage id="resume.skills.languages.english"/>
                        </div>
                    </Col>
                </Row>
            </Section>
            <Section title={<FormattedMessage id="resume.hobbies.title"/>}>
                <div className="ml-2 mb-2">
                    <FontAwesomeIcon className="mr-2" icon={faChess}/>
                    <span><FormattedMessage id="resume.hobbies.chess"/></span>
                </div>
                <div className="ml-2 mb-2">
                    <FontAwesomeIcon className="mr-2" icon={faCode}/>
                    <span><FormattedMessage id="resume.hobbies.coding"/></span>
                </div>
                <div className="ml-2">
                    <FontAwesomeIcon className="mr-2" icon={faGamepad}/>
                    <span><FormattedMessage id="resume.hobbies.games"/></span>
                </div>
            </Section>
            <ContactMeModal/>
        </motion.div>
    );
}

export default Resume;
