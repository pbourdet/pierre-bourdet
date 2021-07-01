import React, { useState } from 'react';
import { Collapse, Button, Card, Container, Row, Col } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faChevronUp } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';

const Section = ({ title, children }) => {
    const [isOpen, setIsOpen] = useState(true);

    const toggle = () => setIsOpen(!isOpen);

    return (
        <Container className="text-justify mb-4">
            <Row className="justify-content-start mb-1">
                <Col xs={{ span: 6, offset: 3 }} className="text-center">
                    <div className="h4 mr-3">{title}</div>
                </Col>
                <Col className="d-flex ml-1">
                    <div className="align-self-center">
                        <Button
                            variant="link"
                            className="border pl-3 pr-3"
                            size="sm"
                            onClick={toggle}>
                            {isOpen
                                ? (
                                    <FontAwesomeIcon icon={faChevronDown}/>
                                )
                                : (
                                    <FontAwesomeIcon icon={faChevronUp}/>
                                )}
                        </Button>
                    </div>
                </Col>
            </Row>
            <Collapse in={isOpen}>
                <Card>
                    <Card.Body>{children}</Card.Body>
                </Card>
            </Collapse>
        </Container>
    );
};

Section.propTypes = {
    title: PropTypes.object,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default Section;
