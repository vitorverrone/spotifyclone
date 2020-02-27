import { BASE_URL, CONFIG } from './api';
import { getCookie } from './cookies';

let 
    PLAYER, 
    DEVICE_ID, 
    PAUSED = false;

window.onSpotifyWebPlaybackSDKReady = () => {
    setPlayer();
};

function setPlayer() {
    const token = getCookie('access_token');
    PLAYER = new window.Spotify.Player({
        name: 'Spotify Clone',
        getOAuthToken: cb => { cb(token); }
    });
    
    //Error handling
    PLAYER.addListener('initialization_error', ({ message }) => { console.error(message); });
    PLAYER.addListener('authentication_error', ({ message }) => { console.error(message); });
    PLAYER.addListener('account_error', ({ message }) => { console.error(message); });
    PLAYER.addListener('playback_error', ({ message }) => { console.error(message); });
        
    // Ready
    PLAYER.addListener('ready', ({ device_id }) => DEVICE_ID = device_id);
        
    // Not Ready
    PLAYER.addListener('not_ready', ({ device_id }) => {
        console.log('Device ID has gone offline', device_id);
    });

    PLAYER.getCurrentState().then(state => {
        if (!state) { 
            console.error('User is not playing music through the Web Playback SDK');
            return;
        }
      
        let { current_track, next_tracks: [next_track] } = state.track_window;

        console.log('ESTADO', state);
      
        console.log('Currently Playing', current_track);
        console.log('Playing Next', next_track);
      });
    
    // Connect to the player!
    PLAYER.connect();
}

const playSong = (uri) => {
    CONFIG['method'] = 'PUT';
    CONFIG['body'] = JSON.stringify({ uris: [uri] });
    fetch(`${BASE_URL}/me/player/play?device_id=${DEVICE_ID}`, CONFIG);
};

const resumeSong = () => PLAYER.resume();
const pauseSong = () => PLAYER.pause();
const nextSong = () => PLAYER.nextTrack();
const previousSong = () => PLAYER.previousTrack();

const getUserCurrentlyPlayer = () => {
    return fetch(`${BASE_URL}/me/player`, CONFIG)
        .then(res => res.json())
        .then((result) => {
            return result;
        },
        (error) => {
            
        }
    );
}

const getUserAvailableDevices = () => {
    return fetch(`${BASE_URL}/me/player/devices`, CONFIG)
        .then(res => res.json())
        .then((result) => {
            return result;
        },
        (error) => {
            
        }
    );
}

const changePlayback = (device_id) => {
    CONFIG['method'] = 'PUT';
    CONFIG['body'] = JSON.stringify({ device_ids: [device_id] });
    return fetch(`${BASE_URL}/me/player`, CONFIG)
        .then(res => res.json())
        .then((result) => {
            return result;
        },
        (error) => {
            
        }
    );
}

export {
    getUserCurrentlyPlayer,
    getUserAvailableDevices,
    changePlayback,
    playSong,
    resumeSong,
    pauseSong,
    nextSong,
    previousSong,
    PAUSED,
    PLAYER,
    DEVICE_ID
};