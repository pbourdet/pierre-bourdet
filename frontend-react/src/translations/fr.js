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
        error: 'Une erreur est survenue lors de l\'opération. Veuillez réessayez plus tard.',
        user: {
            signup: 'Bienvenue {name} !',
            signin: 'Bonjour {name} !',
            logout: 'Vous êtes déconnectés.',
            updatePassword: 'Mot de passe mis à jour !',
            delete: {
                error: 'Une erreur est survenue lors de la suppression de votre compte.',
                success: 'Votre compte a bien été supprimé.'
            }
        },
        todo: {
            add: 'Todo {name} ajoutée !',
            edit: 'Todo {name} mise à jour !',
            delete: 'Todo {name} supprimée !',
            done: 'Todo {name} terminée !',
            undone: 'Todo {name} à faire.'
        },
        contact: {
            success: 'Votre email a bien été envoyé !'
        },
        reset: {
            email: 'Un mail a été envoyé à : {email}',
            success: 'Votre mot de passe a été réinitialisé !'
        },
        snake: {
            save: 'Votre partie a été enregistrée ! Score : {score}',
            error: 'Une erreur est survenue lors de la sauvegarde de votre partie :(.'
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
        title: 'Mon profil',
        settings: 'Paramètres du compte',
        user: {
            delete: {
                button: 'Supprimer votre compte',
                title: 'Confirmation',
                confirmation: 'Supprimer'
            }
        }
    },

    resume: {
        title: 'CV',
        header: {
            title: 'Développeur web'
        },
        contact: {
            button: 'Contactez-moi',
            submit: 'Envoyer',
            error: 'Une erreur est survenue lors de l\'envoi du mail',
            modal: {
                header: 'Contactez-moi'
            },
            email: {
                label: 'Adresse email',
                placeholder: 'Votre email',
                error: 'Cette adresse email n\'est pas valide'
            },
            name: {
                label: 'Nom',
                placeholder: 'Votre nom'
            },
            subject: {
                label: 'Objet',
                placeholder: 'Objet de votre message'
            },
            message: {
                label: 'Message',
                placeholder: 'Votre message'
            }
        },
        experience: {
            title: 'Expériences professionnelles',
            ekwateur: {
                date: 'Janvier 2020 - Aujourd\'hui',
                title: 'Développeur back-end Symfony (Ekwateur)',
                line1: 'En charge des développements de l\'espace client.',
                line2: 'Espace client Web : Symfony 3.4 / API de l\'application mobile : Symfony 4.4.',
                line3: 'Stack technique : Symfony 3/4, Rest API, PHPUnit, Doctrine, Twig.'
            },
            bnp: {
                date: 'Août 2019 - Décembre 2019',
                title: 'Responsable d\'application facturation (HN Services)',
                line1: 'En prestation chez BNP Paribas.',
                line2: 'Homologation et déploiement des évolutions de l\'application.'
            },
            nxs: {
                date: 'Juin 2018 - Juin 2019',
                title: 'Recetteur fonctionnel monétique (HN Services)',
                line1: 'En prestation chez Natixis Payments Solution.',
                line2: 'Vérification de la conformité des fonctionnalités livrées sur le SI.',
                line3: 'Analyse des tests et remontées d\'anomalies aux éditeurs.'
            },
            pcs: {
                date: 'Septembre 2015 - Mai 2018',
                title: 'Analyse mainframe monétique (HN Services)',
                line1: 'En Mission chez PARTECIS.',
                line2: 'Suivi de production et maintien en condition opérationnelle des environnements mainframe.',
                line3: 'Maîtrise d\'oeuvre des clients (BNP, Natixis, CE) et chefs de projet.'
            }
        },
        education: {
            title: 'Études & Formations',
            opcr: {
                date: 'Été 2019',
                title: 'Formation de développeur Web (Openclassroom)',
                line1: 'Cours suivis : HTML5/CSS3, JavaScript, PHP, PHP Orienté Objet, Modèle MVC, ' +
                    'Git/Github, Bootstrap, React.js, Symfony 4.'
            },
            hni: {
                date: 'Juillet - Août 2015',
                title: 'Formation Mainframe/COBOL (HN Institut)',
                line1: 'Apprentissage en e-learning de zOS, MVS, JCL, Programmation COBOL, SQL, DB2.'
            },
            n7: {
                date: 'Septembre 2011 - Septembre 2014',
                title: 'Diplôme d\'ingénieur (ENSEEIHT)',
                line1: 'Formation d\'ingénieur en électronique.'
            }
        },
        skills: {
            title: 'Compétences',
            misc: 'Autres',
            programming: {
                title: 'Programmation'
            },
            languages: {
                title: 'Langues',
                french: '- Français : langue maternelle',
                english: '- Anglais : courant'
            }
        },
        hobbies: {
            title: 'Hobbies',
            chess: 'Échecs - ELO de ~1000 sur chess.com',
            coding: 'Code - développement de ce site',
            games: 'Jeux vidéos'
        }
    },

    todos: {
        title: 'Todo liste',
        noTodos: 'Vous n\'avez aucune todo !',
        loggedOut: 'Vos todos ne seront sauvegardées que sur cet appareil. Connectez-vous pour accéder à vos todos n\'importe où !'
    },

    todoTable: {
        task: 'Tâche',
        description: 'Description',
        date: 'Date',
        reminder: 'Rappel',
        add: 'Ajouter une todo',
        cancel: 'Annuler',
        confirmDelete: {
            title: 'Confirmation',
            button: 'Supprimer'
        },
        moreInfo: 'Plus d\'info',
        lessInfo: 'Moins d\'info'
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
        reminder: {
            label: 'Rappel',
            loggedOut: 'Vous devez être connecté pour utiliser le rappel !'
        },
        error: {
            name: {
                long: 'La tâche ne doit pas excéder 50 caractères'
            },
            description: {
                long: 'La description ne doit pas excéder 100 caractères'
            },
            date: {
                soon: 'La date ne peut pas être dans le passé.'
            },
            reminder: {
                late: 'Le rappel doit être avant la date.',
                soon: 'Le rappel ne peut pas être dans le passé.'
            }
        }
    },

    reset: {
        modal: {
            open: 'Mot de passe oublié',
            header: 'Réinitialiser votre mot de passe',
            body: 'Vous receverez à l\'adresse fournie un email contenant un lien vous permettant de réinitialiser votre mot de passe.',
            error: 'Une erreur est survenue lors de l\'envoi du mail.',
            submit: 'Envoyer'
        },
        page: {
            title: 'Réinitialiser votre mot de passe',
            submit: 'Réinitialiser',
            error: 'Le lien n\'est pas valide ou expiré.'
        }
    },

    snake: {
        gameOver: 'Perdu !',
        newGame: 'Nouvelle partie',
        speed: 'Vitesse',
        spacebar: 'Ou appuyez sur la barre espace',
        mobile: 'Ce jeu n\'est pas disponible sur téléphone.',
        save: {
            button: 'Enregistrer la partie',
            loggedOut: 'Vous devez être connecté pour sauvegarder votre partie.',
            saved: 'Votre partie est déjà enregistrée :).'
        },
        hof: {
            highestScores: 'Meilleurs scores',
            userScores: 'Mes meilleurs scores',
            player: 'Joueur',
            loggedOut: 'Connectez-vous pour enregistrer et consulter vos meilleures parties !',
            noGames: 'Vous n\'avez pas de partie enregistrée.'
        }
    }
};
