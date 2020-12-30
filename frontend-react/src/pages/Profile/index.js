import React from 'react';
import { useAuth } from '../../contexts/AuthContext/index';
import { Redirect } from 'react-router-dom';
import UpdatePasswordForm from '../../components/UpdatePasswordForm';

function Profile () {
    const auth = useAuth();

    if (auth === null) {
        return <Redirect to="/"/>;
    }

    return (
        <div className="App">
            <div className="mb-2">Profile of {auth.user.nickname}</div>
            <UpdatePasswordForm/>
        </div>
    );
}

export default Profile;
