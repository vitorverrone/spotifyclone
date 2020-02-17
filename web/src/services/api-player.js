import { BASE_URL, CONFIG } from './api';

const getUserCurrentlyPlaying = () => {
    return fetch(`${BASE_URL}/me/player/currently-playing`, CONFIG)
        .then(res => res.json())
        .then((result) => {
            return result;
        },
        (error) => {
            
        }
    );
}

const setPlayerState = (state, method = 'PUT') => {
    CONFIG['method'] = method;
    fetch(`${BASE_URL}/me/player/${state}`, CONFIG);
}

export {
    getUserCurrentlyPlaying,
    setPlayerState
};