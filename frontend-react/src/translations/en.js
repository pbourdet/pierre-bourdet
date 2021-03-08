export default {
    languages: {
        'fr-FR': 'Français',
        'en-GB': 'English'
    },

    navbar: {
        home: 'Homepage',
        about: 'About',
        resume: 'Resume',
        signin: 'Sign in',
        signup: 'Sign up',
        profile: 'My profile',
        logout: 'Log out'
    },

    toast: {
        user: {
            signup: 'Welcome {name} !',
            signin: 'Hello {name} !',
            logout: 'You are now logged out.',
            updatePassword: 'Password updated !'
        },
        todo: {
            add: 'Todo {name} added !',
            edit: 'Todo {name} updated !',
            delete: 'Todo {name} deleted !'
        }
    },

    signinModal: {
        header: 'Sign in',
        submitButton: 'Sign in',
        cancelButton: 'Cancel',
        authError: 'Incorrect username or password.'
    },

    signupModal: {
        header: 'Sign up',
        submitButton: 'Sign up',
        cancelButton: 'Cancel',
        error: 'This address email is already taken, try another one.'
    },

    updatePassword: {
        title: 'Update your password',
        submitButton: 'Update password',
        error: 'Current password incorrect.'
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
        currentPassword: {
            placeholder: 'Your current password',
            label: 'Current password'
        },
        newPassword: {
            placeholder: 'Your new password',
            label: 'New password'
        },
        confirmPassword: {
            placeholder: 'Confirm your password',
            label: 'Password confirmation'
        },
        nickname: {
            placeholder: 'Your nickname',
            label: 'Nickname'
        },
        error: {
            email: {
                invalid: 'The email address is not valid.'
            },
            password: {
                invalid: 'The password must contains at least one number.',
                short: 'The password must be at least 4 characters long.'
            },
            newPassword: {
                invalid: 'The password must contains at least one number.',
                short: 'The password must be at least 4 characters long.',
                different: 'The new password must be different from the previous one.'
            },
            nickname: {
                invalid: 'The nickname can only contain letters or digits.',
                short: 'The nickname must be at least 3 characters long.'
            },
            confirmPassword: {
                different: 'The passwords do not match.'
            }
        }
    },

    homepage: {
        title: 'Homepage',
        introCard: {
            title: 'Welcome !',
            text1: 'This website has been developed as a training to create a React front-end application communicating with a Rest API. The API documentation can be <a>seen here</a>. ',
            text2: 'The API is consumed by a fully functional JWT authentication and a <a>Todo list</a>.',
            text3: 'The full codebase is available on <a>Github</a>',
            text4: 'More details about the technical stack used in this application below.'
        },
        techCard: {
            misc: 'Development'
        }
    },

    profile: {
        settings: 'Account\'s setttings'
    },

    about: {
        title: 'About'
    },

    resume: {
        title: 'Resume'
    },

    todos: {
        title: 'Todos',
        noTodos: 'You have no todo !',
        loggedOut: 'Sign in to use the todo list.'
    },

    todoTable: {
        task: 'Task',
        description: 'Description',
        date: 'Date and time',
        add: 'Add',
        cancel: 'Cancel',
        confirmDelete: {
            title: 'Confirmation',
            button: 'Delete'
        }
    },

    todoForm: {
        addTodo: 'Add todo',
        editTodo: 'Edit todo',
        name: {
            placeholder: 'A task',
            label: 'Task'
        },
        description: {
            placeholder: 'A description',
            label: 'Description'
        },
        date: {
            label: 'Date'
        },
        time: {
            label: 'Time'
        },
        error: {
            name: {
                long: 'The task must contains less than 50 characters.'
            },
            description: {
                long: 'The description must contains less than 100 characters.'
            },
            date: {
                soon: 'The date must not be before today.'
            }
        }
    }
};
