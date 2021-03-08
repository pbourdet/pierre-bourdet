export default {
    languages: {
        'fr-FR': 'Français',
        'en-GB': 'English'
    },

    navbar: {
        home: 'Accueil',
        about: 'A propos',
        resume: 'CV',
        signin: 'Se connecter',
        signup: 'S\'inscrire',
        profile: 'Mon profil',
        logout: 'Déconnexion'
    },

    toast: {
        user: {
            signup: 'Bienvenue {name} !',
            signin: 'Bonjour {name} !',
            logout: 'Vous êtes déconnectés.',
            updatePassword: 'Mot de passe mis à jour !'
        },
        todo: {
            add: 'Todo {name} ajoutée !',
            edit: 'Todo {name} mise à jour !',
            delete: 'Todo {name} supprimée !'
        }
    },

    signinModal: {
        header: 'Se connecter',
        submitButton: 'Se connecter',
        cancelButton: 'Annuler',
        authError: 'Mot de passe ou email incorrect.'
    },

    signupModal: {
        header: 'S\'inscrire',
        submitButton: 'S\'inscrire',
        cancelButton: 'Annuler',
        error: 'Cette adresse email est déjà utilisée, essayez-en une autre.'
    },

    updatePassword: {
        title: 'Modifier votre mot de passe',
        submitButton: 'Modifier mot de passe',
        error: 'Mot de passe actuel erroné.'
    },

    userForm: {
        email: {
            placeholder: 'Votre adresse email',
            label: 'Email'
        },
        password: {
            placeholder: 'Votre mot de passe',
            label: 'Mot de passe'
        },
        currentPassword: {
            placeholder: 'Votre mot de passe actuel',
            label: 'Mot de passe actuel'
        },
        newPassword: {
            placeholder: 'Votre nouveau mot de passe',
            label: 'Nouveau mot de passe'
        },
        confirmPassword: {
            placeholder: 'Confirmez votre mot de passe',
            label: 'Confirmation mot de passe'
        },
        nickname: {
            placeholder: 'Votre pseudo',
            label: 'Pseudo'
        },
        error: {
            email: {
                invalid: 'L\'adresse mail n\'est pas valide.',
                empty: 'Vous devez indiquer une adresse mail.'
            },
            password: {
                invalid: 'Le mot de passe doit contenir au moins un chiffre.',
                short: 'Le mot de passe doit faire au moins 4 caractères de long.'
            },
            newPassword: {
                invalid: 'Le mot de passe doit contenir au moins un chiffre.',
                short: 'Le mot de passe doit faire au moins 4 caractères de long.',
                different: 'Le nouveau mot de passe doit être différent du précédent'
            },
            nickname: {
                invalid: 'Le pseudo ne peut contenir que des chiffres et des lettres.',
                short: 'Le pseudo doit faire au moins 3 caractères de long.'
            },
            confirmPassword: {
                different: 'Les mots de passe ne correspondent pas.'
            }
        }
    },

    homepage: {
        title: 'Page d\'accueil',
        introCard: {
            title: 'Bienvenue !',
            text1: 'Ce site web a été développé comme un entraînement à la création d\'une application React communiquant avec une API Rest. La documentation de l\'API peut être <a>consultée ici</a>.',
            text2: 'L\'API est consommée par une authentification JWT ainsi qu\'une <a>Todo list</a>.',
            text3: 'Tout le code est disponible sur <a>Github</a>',
            text4: 'Plus de détails sur les technologies utilisées ci-dessous.'
        },
        techCard: {
            misc: 'Développement'
        }
    },

    profile: {
        settings: 'Paramètres du compte'
    },

    about: {
        title: 'A propos'
    },

    resume: {
        title: 'CV'
    },

    todos: {
        title: 'Todos',
        noTodos: 'Vous n\'avez aucune todo !',
        loggedOut: 'Connectez-vous pour utiliser les todos.'
    },

    todoTable: {
        task: 'Tâche',
        description: 'Description',
        date: 'Date et heure',
        add: 'Ajouter',
        cancel: 'Annuler',
        confirmDelete: {
            title: 'Confirmation',
            button: 'Supprimer'
        }
    },

    todoForm: {
        addTodo: 'Ajouter todo',
        editTodo: 'Modifier todo',
        name: {
            placeholder: 'Une tâche',
            label: 'Tâche'
        },
        description: {
            placeholder: 'Une description',
            label: 'Description'
        },
        date: {
            label: 'Date'
        },
        time: {
            label: 'Heure'
        },
        error: {
            name: {
                long: 'La tâche ne doit pas excéder 50 caractères'
            },
            description: {
                long: 'La description ne doit pas excéder 100 caractères'
            },
            date: {
                soon: 'La date ne peut pas être antérieur à aujourd\'hui.'
            }
        }
    }
};
