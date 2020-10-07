import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';

const AuthContext = React.createContext();
const AuthUpdateContext = React.createContext();

export function useAuth () {
    return useContext(AuthContext);
}

export function useAuthUpdate () {
    return useContext(AuthUpdateContext);
}

export function AuthProvider ({ children }) {
    const [auth, setAuth] = useState({
        token: '',
        user: {},
        exp: 0
    });

    function updateAuth (newAuth) {
        setAuth(newAuth);
    }

    return (
        <AuthContext.Provider value={auth}>
            <AuthUpdateContext.Provider value={updateAuth}>
                {children}
            </AuthUpdateContext.Provider>
        </AuthContext.Provider>
    );
}

AuthProvider.propTypes = {
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ])
};
