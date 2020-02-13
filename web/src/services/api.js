const 
    CLIENT_ID = '00fb90fe315a482b9b138ed88f703434',
    REDIRECT_URI = 'http://localhost:3000';

//let accessToken;

function verify() {
    window.addEventListener("message", function(event) {
        var hash = JSON.parse(event.data);
        if (hash.type === 'access_token') {
            console.log(hash.access_token);
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
        window.opener.postMessage(JSON.stringify({
            type:'access_token',
            access_token: hash.access_token,
            expires_in: hash.expires_in || 0
        }), '*');
        window.close();
    };
};

const login = function(accessToken) {
    const 
        url = getLoginURL([ 'user-read-email' ]),
        width = 450,
        height = 730,
        left = (window.screen.width / 2) - (width / 2),
        top = (window.screen.height / 2) - (height / 2);
        
    window.open(url, 'Spotify', 'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);
}

function loginApi() {
    login(function(accessToken) {
        getUserData(accessToken);
    });
};

function getUserData(accessToken) {
    const config = {
        headers: {
            'Authorization': 'Bearer ' + accessToken
        },
    };
    return fetch('https://api.spotify.com/v1/me', config);
}

function getLoginURL(scopes) {
    return 'https://accounts.spotify.com/authorize?client_id=' + CLIENT_ID +
      '&redirect_uri=' + encodeURIComponent(REDIRECT_URI) +
      '&scope=' + encodeURIComponent(scopes.join(' ')) +
      '&response_type=token';
}

export {
    loginApi,
    verify
};