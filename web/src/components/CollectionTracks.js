import React, { useState, useEffect } from 'react';

import { getUserLikedTracks } from '../services/api-search';
import { playSong } from '../services/api-player';

import { joinArtists } from '../services/general';

import { IoMdMusicalNote } from 'react-icons/io';

import '../styles/CollectionTracks.css';

function CollectionTracks() {
    const 
        [likedTracks, setLikedTracks] = useState([]),
        [totalTracks, setTotalTracks] = useState(0);

    // Tive que fazer isso pq fica chamando a função sem parar quando está no escopo
    useEffect(() => {
        getLikedTracks();
    }, []);

    async function getLikedTracks() {
        const response = await getUserLikedTracks();
        setTotalTracks(response.total);
        setLikedTracks(response['items']);
    }

    function convertDuration(duration) {
        const 
            minutes = Math.floor(duration / 60000),
            seconds = ((duration % 60000) / 1000).toFixed(0);
        return minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
    }

	return (
        <div className="content liked-tracks">
            <div className="liked-tracks__info">
                <div className="liked-tracks__info-icon"></div>
                <h4>Músicas curtidas</h4>
                <p>{totalTracks} Músicas</p>
            </div>
            <ul className="liked-tracks__tracks">
                {
                    likedTracks.map(key => {
                        const 
                            track = key['track'],
                            trackName = track['name'],
                            artists = joinArtists(track['artists']),
                            album = track['album']['name'],
                            duration = track['duration_ms'],
                            uri = track['uri'];

                        return (
                            <li key={track.id} onClick={e => playSong(uri)} className="liked-tracks__track">
                                <div className="liked-tracks__track-icon">
                                    <IoMdMusicalNote/>
                                </div>
                                <div className="liked-tracks__track-name">
                                    <p>{trackName}</p>
                                    <p className="liked-tracks__track-artists">{artists} | {album}</p>
                                </div>
                                <div className="liked-tracks__track-duration">
                                    {convertDuration(duration)}
                                </div>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
	);
}

export default CollectionTracks;