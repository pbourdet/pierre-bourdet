import axios from '../config/axios';

export default function updateLanguage (locale) {
    axios.post('/account/update-language', JSON.stringify({ language: locale }))
        .then(response => response)
        .catch(err => err);
};
