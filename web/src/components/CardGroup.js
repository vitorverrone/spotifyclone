import React, { useEffect, useState } from 'react';

import { joinArtists } from '../services/general'

import Card from '../components/Card';

function CardGroup({ cards }) {
    const 
        [newCards, setNewCards] = useState([]),
        [albumCards, setAlbumCards] = useState([]),
        [artistCards, setArtistCards] = useState([]),
        [trackCards, setTrackCards] = useState([]),
        [playlistCards, setPlaylistCards] = useState([]);

    useEffect(() => {
        setNewCards(Object.keys(cards).map((key) => cards[key]));
    
        if(newCards.length) { 
            setAlbumCards(newCards[0]['items']);
            setArtistCards(newCards[1]['items']);
            setTrackCards(newCards[2]['items']);
            setPlaylistCards(newCards[3]['items']);

            setCards(); 
        }
    }, [cards]);

    function setImage(images) {
        let image;

        if(images.length) {
            image = images[0]['url'];
        }

        return image;
    }

    function Albums() {
        if(albumCards.length) {
            return (
                <div className="card-group">
                    <h3>Albums</h3>
                    {albumCards.map(key => {
                        const 
                            name = key['name'],
                            artists = key['artists'][0]['name'],
                            image = setImage(key['images']);

                        return (
                            <Card
                                classes="-albums"
                                key={key.id}
                                image={image}
                                title={name}
                                text={artists}
                            />
                        )
                    })}
                </div>
            );
        }
        return (
            <></>
        )
    }

    function Artists() {
        if(artistCards.length) {
            return (
                <div className="card-group">
                    <h3>Artistas</h3>
                    {artistCards.map(key => {
                        const 
                            name = key['name'],
                            image = setImage(key['images']);

                        return (
                            <Card
                                classes="-artists"
                                key={key.id}
                                image={image}
                                title={name}
                                text="Artistas"
                            />
                        )
                    })}
                </div>
            );
        }
        return (
            <></>
        )
    }

    function Tracks() {
        if(trackCards.length) {
            return (
                <div className="card-group">
                    <h3>Músicas</h3>
                    {trackCards.map(key => {
                        const 
                            artists = joinArtists(key['artists']),
                            name = key['name'],
                            image = setImage(key['album']['images']);

                        return (
                            <Card
                                classes="-tracks"
                                key={key.id}
                                image={image}
                                title={name}
                                text={artists}
                            />
                        )
                    })}
                </div>
            );
        }
        return (
            <></>
        )
    }

    function Playlists() {
        if(playlistCards.length) {
            return (
                <div className="card-group">
                    <h3>Playlists</h3>
                    {playlistCards.map(key => {
                        const 
                            owner = key['owner']['display_name'],
                            name = key['name'],
                            image = setImage(key['images']);

                        return (
                            <Card
                                classes="-playlists"
                                key={key.id}
                                image={image}
                                title={name}
                                text={`De ${owner}`}
                            />
                        )
                    })}
                </div>
            );
        }
        return (
            <></>
        )
    }

    function setCards() {
        if(newCards.length) {
            return (
                <>
                    <Albums />
                    <Artists />
                    <Tracks />
                    <Playlists />
                </>
            );
        }
    };  


	return (
        <>
            {setCards()}
        </>
	);
}

export default CardGroup;