import { Col, Container, Image, Jumbotron, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarker } from '@fortawesome/free-solid-svg-icons';
import { FormattedMessage } from 'react-intl';
import img from '../../../assets/img';
import React from 'react';

function Header () {
    return (
        <Jumbotron className="p-3">
            <Container className="text-justify">
                <Row className="d-flex align-items-center justify-content-around">
                    <Col md={4} className="h6 small font-weight-normal d-none d-md-block">
                        <ul className="list-unstyled">
                            <li className="mb-2">
                                <FontAwesomeIcon className="mr-2" icon={faEnvelope}/>
                                pierre.bourdet1@gmail.com
                            </li>
                            <li className="mb-2">
                                <FontAwesomeIcon className="mr-2" icon={faMapMarker}/>
                                Paris, France
                            </li>
                            <li>
                                <img className="mr-1" height={20} width={20} src={img.tech.github} alt="github"/>
                                <a target="_blank" rel="noopener noreferrer" href="https://github.com/pbourdet">Github</a>
                            </li>
                        </ul>
                    </Col>
                    <Col md={5}>
                        <div className="h2 font-weight-normal">Pierre Bourdet</div>
                        <div className="h3 font-weight-normal">
                            <FormattedMessage id="resume.header.title" />
                        </div>
                        <div className="d-block d-md-none">
                            <img className="mr-1" height={20} width={20} src={img.tech.github} alt="github"/>
                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/pbourdet">Github</a>
                        </div>
                    </Col>
                    <Col md={3} className="d-none d-md-block">
                        <Image src={img.id} thumbnail height="100" width="100"/>
                    </Col>
                </Row>
            </Container>
        </Jumbotron>
    );
}

export default Header;
