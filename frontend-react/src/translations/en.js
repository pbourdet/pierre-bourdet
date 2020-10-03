export default {
    navbar: {
        home: 'Homepage',
        about: 'About',
        resume: 'Resume',
        signin: 'Sign in',
        signup: 'Sign up'
    },

    signinModal: {
        header: 'Sign in',
        submitButton: 'Sign in',
        cancelButton: 'Cancel'
    },

    signupModal: {
        header: 'Sign up',
        submitButton: 'Sign up',
        cancelButton: 'Cancel'
    },

    userForm: {
        email: {
            placeholder: 'Your email address',
            label: 'Email'
        },
        password: {
            placeholder: 'Your password',
            label: 'Password'
        },
        confirmPassword: {
            placeholder: 'Confirm your password',
            label: 'Password Confirmation'
        },
        nickname: {
            placeholder: 'Your nickname',
            label: 'Nickname'
        },
        error: {
            email: {
                invalid: 'The email address is not valid.',
            },
            password: {
                invalid: 'The password must contains at least one number.',
                short: 'The password must be at least 4 characters long.',
            },
            nickname: {
                invalid: 'The nickname can only contain letters or digits.',
                short: 'The nickname must be at least 3 characters long.',
            },
            confirmPassword: {
                different: 'The passwords do not match.'
            }
        }
    },

    homepage: {
        title: 'Homepage',
        info: 'Site under construction...'
    },

    about: {
        title: 'About'
    },

    resume: {
        title: 'Resume'
    }
};
