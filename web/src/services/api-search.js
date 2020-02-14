const searchApi = function(text) {
    const accessToken = 'BQA1QyfeB57BRPurXeEGSGsIkU5gyPyB45osclf4IyZB2L9Kg6Kq51iUa4GJOIMNxy9Oa0hqdZCKhtIeGnqM1Q-_c_5SCu3v0DVXPIQPAszjL6vATsSQIrv6Thg-5K04q1OXkbm8KRxdULUBrFBq5w';
    const config = {
        headers: {
            'authorization': `Bearer ${accessToken}`
        },
    }
    
    return fetch(`https://api.spotify.com/v1/search?type=album,artist,playlist,track,show_audio,episode_audio&q=${text}`, config).then(response => response.json());
};

export default searchApi;