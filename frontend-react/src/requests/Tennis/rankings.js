import axios from '../../config/axios';

export async function getRankings (name, type) {
    const url = `tennis/${type}-rankings/${name}`;

    return axios.get(url)
        .then(response => response.data)
        .catch(() => null);
}
