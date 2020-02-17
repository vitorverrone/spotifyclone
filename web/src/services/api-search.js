import { BASE_URL, CONFIG } from './api';


const searchApi = function(text) {    
    return fetch(`${BASE_URL}/search?type=album,artist,playlist,track,show_audio,episode_audio&q=${text}`, CONFIG).then(response => response.json());
};

const getUsersPlaylist = (user_id) => {
    return fetch(`${BASE_URL}/users/${user_id}/playlists`, CONFIG).then(response => response.json());
}

const getUserLikedTracks = () => {
    return fetch(`${BASE_URL}/me/tracks`, CONFIG).then(response => response.json());
};

export {
    searchApi,
    getUsersPlaylist,
    getUserLikedTracks
};