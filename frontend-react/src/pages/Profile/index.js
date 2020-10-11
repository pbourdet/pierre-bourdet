import React from 'react';
import '../App.css';
import { useAuth } from '../../contexts/AuthContext';
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
