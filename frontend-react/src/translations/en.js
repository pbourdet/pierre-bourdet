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
            delete: 'Todo {name} deleted !',
            done: 'Todo {name} done !',
            undone: 'Todo {name} to do.'
        },
        contact: {
            success: 'Your email was successfully sent !'
        },
        reset: {
            email: 'An email was sent to : {email}',
            success: 'Your password has been resetted !'
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
        settings: 'Account\'s setttings',
        user: {
            delete: {
                button: 'Delete your account',
                title: 'Confirmation',
                confirmation: 'Delete'
            }
        }
    },

    resume: {
        title: 'Resume',
        header: {
            title: 'Web developer'
        },
        contact: {
            button: 'Contact me',
            submit: 'Send',
            error: 'Something wrong happened when sending the email',
            modal: {
                header: 'Contact me'
            },
            email: {
                label: 'Email address',
                placeholder: 'Your email',
                error: 'This email is not valid'
            },
            name: {
                label: 'Name',
                placeholder: 'Your name'
            },
            subject: {
                label: 'Object',
                placeholder: 'Object of your message'
            },
            message: {
                label: 'Message',
                placeholder: 'Your message'
            }
        },
        experience: {
            title: 'Professional experiences',
            ekwateur: {
                date: 'January 2020 - Today',
                title: 'Symfony back-end developer (Ekwateur)',
                line1: 'In charge of the development of the customer area.',
                line2: 'Web customer area : Symfony 3.4 / Mobile app API : Symfony 4.4.',
                line3: 'Technical stack : Symfony 3/4, Rest API, PHPUnit, Doctrine, Twig.'
            },
            bnp: {
                date: 'August 2019 - December 2019',
                title: 'Billing Application Manager (HN Services)',
                line1: 'On assignment at BNP Paribas.',
                line2: 'Approval and deployment of the application\'s evolutions.'
            },
            nxs: {
                date: 'June 2018 - June 2019',
                title: 'Functional Tester for Electronic Banking (HN Services)',
                line1: 'On assignment at Natixis Payments Solution.',
                line2: 'Verification of the compliance of the delivered functionalities.',
                line3: 'Analysis of tests and reporting of anomalies to the editors.'
            },
            pcs: {
                date: 'September 2015 - May 2018',
                title: 'Electronic payment Mainframe Analyst (HN Services)',
                line1: 'On assignment at PARTECIS.',
                line2: 'Production monitoring and maintenance of mainframe environments.',
                line3: 'Technical support for clients (BNP, Natixis, CE) and project managers.'
            }
        },
        education: {
            title: 'Education & Training',
            opcr: {
                date: 'Summer 2019',
                title: 'Web developer training (Openclassroom)',
                line1: 'Courses followed : HTML5/CSS3, JavaScript, PHP, PHP Object Oriented, MVC Model, ' +
                    'Git/Github, Bootstrap, React.js, Symfony 4.'
            },
            hni: {
                date: 'July - August 2015',
                title: 'Mainframe/COBOL Training (HN Institut)',
                line1: 'E-learning courses on zOS, MVS, JCL, COBOL Programming, SQL, DB2.'
            },
            n7: {
                date: 'September 2011 - September 2014',
                title: 'Engineer degree (ENSEEIHT)',
                line1: 'Electronic engineer degree.'
            }
        },
        skills: {
            title: 'Skills',
            misc: 'Miscellaneous',
            programming: {
                title: 'Programming'
            },
            languages: {
                title: 'Languages',
                french: '- French : native',
                english: '- English : fluent'
            }
        },
        hobbies: {
            title: 'Hobbies',
            chess: 'Chess - ~1000 ELO rating on chess.com',
            coding: 'Coding - developing this very website',
            games: 'Video games'
        }
    },

    todos: {
        title: 'Todo list',
        noTodos: 'You have no todo !',
        loggedOut: 'Sign in to use the todo list.'
    },

    todoTable: {
        task: 'Task',
        description: 'Description',
        date: 'Date',
        reminder: 'Reminder',
        add: 'Add a todo',
        cancel: 'Cancel',
        confirmDelete: {
            title: 'Confirmation',
            button: 'Delete'
        },
        moreInfo: 'More info',
        lessInfo: 'Less info'
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
        reminder: {
            label: 'Remind me'
        },
        error: {
            name: {
                long: 'The task must contains less than 50 characters.'
            },
            description: {
                long: 'The description must contains less than 100 characters.'
            },
            date: {
                soon: 'The date must not be in the past.'
            },
            reminder: {
                late: 'The reminder must be before the date.',
                soon: 'The reminder cannot be in the past.'
            }
        }
    },

    reset: {
        modal: {
            open: 'Forgotten password',
            header: 'Reset your password',
            body: 'You will receive at the provided address an email containing a link allowing you to reset your password.',
            error: 'An error was encountered when sending the email.',
            submit: 'Send'
        },
        page: {
            title: 'Reset your password',
            submit: 'Reset',
            error: 'The link is invalid or expired.'
        }
    }
};
