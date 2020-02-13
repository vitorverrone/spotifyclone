const 
    CLIENT_ID = '00fb90fe315a482b9b138ed88f703434',
    REDIRECT_URI = 'http://localhost:3000';

//let accessToken;

const login = function(accessToken) {
    const url = getLoginURL([ 'user-read-email' ]);

    let
        width = 450,
        height = 730,
        left = (window.screen.width / 2) - (width / 2),
        top = (window.screen.height / 2) - (height / 2);
    
    window.addEventListener("message", function(event) {
        var hash = JSON.parse(event.data);
        if (hash.type === 'access_token') {
            accessToken(hash.access_token);
        }
    }, false);
        
    var w = window.open(url, 'Spotify', 'menubar=no,location=no,resizable=no,scrollbars=no,status=no, width=' + width + ', height=' + height + ', top=' + top + ', left=' + left);
}

function loginApi() {
    login(function(accessToken) {
        getUserData(accessToken).then(function(response) {
            console.log('response', response);
        });
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

export default loginApi;