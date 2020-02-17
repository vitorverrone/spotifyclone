import React, { useEffect, useState } from 'react';

import { setPlayerState } from '../services/api-player';

import '../styles/FooterPlayer.css';

import { IoMdPlay, IoMdPause } from 'react-icons/io';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { FiVolume2 } from 'react-icons/fi';

function FooterPlayer({ currentlyPlaying }) {
	const 
		[isPlaying, setIsPlaying] = useState(false),
		[currentSong, setCurrentSong] = useState(''),
		[currentArtists, setCurrentArtists]  = useState('');

	function setPlayerStateFunction (state, method = 'PUT') {
		setPlayerState(state, method)
	}

	useEffect(() => {
		console.log('currentlyPlaying', currentlyPlaying);
		const track = currentlyPlaying['item'];
		console.log('track', track);
		// setCurrentSong(track['name']); 
		setIsPlaying(currentlyPlaying['is_playing']);
	}, [currentlyPlaying])

	return (
        <div className="footer-player">
			<div className="footer-player__current-song">
				<p>{currentSong}</p>
				<p>{currentArtists}</p>
			</div>
			<div className="footer-player__controls">
				<MdSkipPrevious className="footer-player__icon" onClick={() => setPlayerStateFunction('next', 'POST')}  />
				<div className={`footer-player__controls-play-pause -${isPlaying}`} >
					<IoMdPlay className="footer-player__icon --play" onClick={() => setPlayerStateFunction('play')} />
					<IoMdPause className="footer-player__icon --pause" onClick={() => setPlayerStateFunction('pause')} />
				</div>
				<MdSkipNext className="footer-player__icon" onClick={() => setPlayerStateFunction('previous', 'POST')} />
			</div>
			<div className="footer-player__options">
				<FiVolume2 />
			</div>
		</div>
	);
}

export default FooterPlayer;