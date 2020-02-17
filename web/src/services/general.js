function joinArtists(artists) {
    let newArtists = [];

    for (let i = 0; i < artists.length; i++) {
        newArtists.push(artists[i]['name']);
    }

    return newArtists.join(', ');
}

function convertDuration(duration) {
    const 
        minutes = Math.floor(duration / 60000),
        seconds = ((duration % 60000) / 1000).toFixed(0);
    return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}

export { 
    joinArtists,
    convertDuration
}