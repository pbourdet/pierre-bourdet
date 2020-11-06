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
            logout: 'You are now logged out.'
        },
        todo: {
            add: 'Todo {name} added !',
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
                invalid: 'The email address is not valid.'
            },
            password: {
                invalid: 'The password must contains at least one number.',
                short: 'The password must be at least 4 characters long.'
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
        info: 'Site under construction...'
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
            },
            time: {
                missing: 'You must also choose a date'
            }
        }
    }
};
