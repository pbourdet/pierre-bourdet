import React from 'react';
import img from '../../assets/img';
import PropTypes from 'prop-types';

function TechnicalStackEntry ({ entry, version }) {
    const capitalizedEntry = entry.charAt(0).toUpperCase() + entry.slice(1);

    return (
        <li className="mt-1">
            <img className="mr-2 mb-1" height={25} width={25} src={img.tech[entry]} alt={entry}/>
            <span className="h5 font-weight-normal">{capitalizedEntry} {version}</span>
        </li>
    );
}

TechnicalStackEntry.propTypes = {
    entry: PropTypes.string,
    version: PropTypes.string
};

export default TechnicalStackEntry;
