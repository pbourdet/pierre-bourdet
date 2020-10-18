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
            logout: 'Vous êtes déconnectés.'
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

    userForm: {
        email: {
            placeholder: 'Votre adresse email',
            label: 'Email'
        },
        password: {
            placeholder: 'Votre mot de passe',
            label: 'Mot de passe'
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
                short: 'Le mot de passe doit faire au moins 4 caractères de long.',
                empty: 'Vous devez indiquer un mot de passe.'
            },
            nickname: {
                invalid: 'Le pseudo ne peut contenir que des chiffres et des lettres.',
                short: 'Le pseudo doit faire au moins 3 caractères de long.',
                empty: 'Vous devez indiquer un pseudo.'
            },
            confirmPassword: {
                empty: 'Vous devez vérifier votre mot de passe.',
                different: 'Les mots de passe ne correspondent pas.'
            }
        }
    },

    homepage: {
        title: 'Page d\'accueil',
        info: 'Site en construction...'
    },

    about: {
        title: 'A propos'
    },

    resume: {
        title: 'CV'
    },

    todos: {
        title: 'Todos',
        info: 'Vos todos'
    },

    todoTable: {
        task: 'Tâche',
        date: 'Date & Heure'
    }
};
