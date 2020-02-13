const searchApi = function(text) {
    const accessToken = 'BQDBTzyFN8njcfvHKQgCNAO52QKwfhbaaxN-U_SIo8oyIb1wCBpGtt83MvpK6oyQRyKRm3jOyj0CNOjxiCk';
    const config = {
        headers: {
            'authorization': `Bearer ${accessToken}`
        },
    }
    
    return fetch(`https://api.spotify.com/v1/search?type=album,artist,playlist,track,show_audio,episode_audio&q=${text}`, config).then(response => response.json());
};

export default searchApi;