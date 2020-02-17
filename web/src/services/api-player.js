import { BASE_URL, CONFIG } from './api';

const getUserCurrentlyPlaying = () => {
    return fetch(`${BASE_URL}/me/player/currently-playing`, CONFIG).then(response => {
        if (response.ok) { response.json(); }
    });
}

const setPlayerState = (state) => {
    CONFIG['method'] = 'PUT';
    fetch(`${BASE_URL}/me/player/${state}`, CONFIG);
}

export {
    getUserCurrentlyPlaying,
    setPlayerState
};