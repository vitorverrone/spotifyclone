function joinArtists(artists) {
    let newArtists = [];

    for (let i = 0; i < artists.length; i++) {
        newArtists.push(artists[i]['name']);
    }

    return newArtists.join(', ');
}

export { joinArtists }