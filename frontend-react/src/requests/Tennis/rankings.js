import axios from '../../config/axios';

export async function getRankings (name, type, locale) {
    const url = `tennis/${type}-rankings/${name}`;

    return axios.get(url, {
        headers: {
            'Accept-Language': locale
        }
    })
        .then(response => response.data)
        .catch(() => null);
}
