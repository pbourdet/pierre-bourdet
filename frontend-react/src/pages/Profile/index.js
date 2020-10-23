import React from 'react';
import { useAuth } from '../../contexts/AuthContext/index';
import { Redirect } from 'react-router-dom';

function Profile () {
    const auth = useAuth();

    if (auth === null) {
        return <Redirect to="/"/>;
    }

    return (
        <div className="App">
            Profile of {auth.user.nickname}
        </div>
    );
}

export default Profile;
