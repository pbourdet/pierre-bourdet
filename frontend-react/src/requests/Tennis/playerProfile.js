import axios from '../../config/axios';

export async function getPlayerProfile (playerId) {
    const url = `tennis/player-profile/${playerId}`;

    return axios.get(url)
        .then(response => response.data)
        .catch(() => null);
}
