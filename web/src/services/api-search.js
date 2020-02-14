import { BASE_URL } from './api';

import { getCookie } from './cookies';

const 
    accessToken = getCookie('access_token'),
    config = {
        headers: {
            'authorization': `Bearer ${accessToken}`
        },
    };

const searchApi = function(text) {    
    return fetch(`${BASE_URL}/search?type=album,artist,playlist,track,show_audio,episode_audio&q=${text}`, config).then(response => response.json());
};

const getUsersPlaylist = (user_id) => {
    return fetch(`${BASE_URL}/users/${user_id}/playlists`, config).then(response => response.json());
}

const getUserLikedTracks = () => {
    return fetch(`${BASE_URL}/me/tracks`, config).then(response => response.json());
};

export {
    searchApi,
    getUsersPlaylist,
    getUserLikedTracks
};