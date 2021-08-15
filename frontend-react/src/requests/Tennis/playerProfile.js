import axios from '../../config/axios';

export async function getPlayerProfile (playerId, locale) {
    const url = `tennis/player-profile/${playerId}`;

    return axios.get(url, {
        headers: {
            'Accept-Language': locale
        }
    })
        .then(response => response.data)
        .catch(() => null);
}
