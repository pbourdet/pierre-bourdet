import React from 'react';
import { Col, Row } from 'react-bootstrap';
import PropTypes from 'prop-types';

const Entry = ({ date, title, img, location, children }) => {
    return (
        <React.Fragment>
            <Row>
                {date && (<Col md={4}>
                    <div className="font-weight-bold mt-1 mb-2">{date}</div>
                </Col>)}
                <Col md={8} className="mb-1">
                    {img && (<img className="border float-left mr-2 mt-1"
                        alt={img} src={img}
                        height="40"
                        width="40" />)}
                    <div className="h5 text-left font-weight-normal mb-0">{title}</div>
                    <div className="small text-secondary">{location}</div>
                </Col>
            </Row>
            <Row>
                <Col md={{ span: 8, offset: 4 }} className="mb-3">
                    {children}
                </Col>
            </Row>
        </React.Fragment>
    );
};

Entry.propTypes = {
    title: PropTypes.object,
    date: PropTypes.object,
    location: PropTypes.string,
    img: PropTypes.string,
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};

export default Entry;
