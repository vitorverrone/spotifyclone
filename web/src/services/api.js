import { setCookie, getCookie } from './cookies';

const 
    CLIENT_ID = '00fb90fe315a482b9b138ed88f703434',
    REDIRECT_URI = 'http://localhost:3000',
    BASE_URL = 'https://api.spotify.com/v1',
    ACCESS_TOKEN = getCookie('access_token'),
    CONFIG = {
        headers: {
            'authorization': `Bearer ${ACCESS_TOKEN}`
        },
    };

function verify() {
    window.addEventListener("message", function(event) {
        if(event.data.type === 'access_token') {
            const access_token = event.data.access_token;
            setCookie('access_token', access_token, event.data.expires_in);
            return true;
        }
    }, false);

    var hash = {};
      
    window.location.hash.replace(/^#\/?/, '').split('&').forEach(function(kv) {
        var spl = kv.indexOf('=');
        if (spl !== -1) {
            hash[kv.substring(0, spl)] = decodeURIComponent(kv.substring(spl+1));
        }
    });      

    if (hash.access_token) {
        window.opener.postMessage(({
            type:'access_token',
            access_token: hash.access_token,
            expires_in: hash.expires_in || 0
        }), '*');
        window.close();
    };
};

const login = function() {
    const 
        url = getLoginURL([ 'user-library-read', 'user-read-email', 'playlist-read-private', 'playlist-read-collaborative', 'user-read-currently-playing', 'user-read-playback-state', 'user-modify-playback-state' ]),
        width = 450,
        height = 730,
        left = (window.screen.width / 2) - (width / 2),
        top = (window.screen.height / 2) - (height / 2);
        
    window.open(url, 'Spotify', 'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);
}

async function getUserData() {
    const response = await fetch(`${BASE_URL}/me`, CONFIG).then(response => {
        if (response.ok) { 
            response.json();  
        }
        else { 
            console.log('erro aquie');
            throw new Error('Something went wrong'); 
        }
    }).catch(error => console.log('deu erro aqui', error));
    return response;
}

function getLoginURL(scopes) {
    return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
      '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
      '&scope=' + encodeURIComponent(scopes.join(' ')) +
      '&response_type=token';
}

export {
    BASE_URL,
    CONFIG,
    login,
    verify,
    getUserData
};