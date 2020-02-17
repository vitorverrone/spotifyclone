import React, { useEffect, useState } from 'react';

import { setPlayerState } from '../services/api-player';

import { joinArtists, convertDuration } from '../services/general';

import '../styles/FooterPlayer.css';

import { IoMdPlay, IoMdPause } from 'react-icons/io';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { FiVolume2 } from 'react-icons/fi';

function FooterPlayer({ currentlyPlaying }) {
	const 
		[isPlaying, setIsPlaying] = useState(false),
		[currentSong, setCurrentSong] = useState(''),
		[currentArtists, setCurrentArtists]  = useState(''),
		[trackDuration, setTrackDuration]  = useState(''),
		[trackProgress, setTrackProgress]  = useState(''),
		[trackPercentage, setTrackPercentage]  = useState('');

	function setPlayerStateFunction (state, method = 'PUT') {
		setPlayerState(state, method)
	}

	useEffect(() => {
		if(currentlyPlaying) {
			const track = currentlyPlaying['item'];
			if(track) {	
				const 
					duration_ms = track['duration_ms'],
					progress_ms = currentlyPlaying['progress_ms'],
					percent = parseInt((100 * progress_ms) / duration_ms);

				setTrackDuration(convertDuration(duration_ms));
				setTrackProgress(convertDuration(progress_ms));
				setTrackPercentage(percent);
				setCurrentArtists(joinArtists(track['artists']));
				setCurrentSong(track['name']);
			}
			setIsPlaying(currentlyPlaying['is_playing']);
		}
	}, [currentlyPlaying]);

	function TrackProgress() {
		if(trackProgress) {
			const divStyle = {
				width: `${trackPercentage}%`
			};
			return (
				<>
					{trackProgress}
					<div className="footer-player__controls-progress-bar">
						<div className="percentage" style={divStyle}></div>
					</div>
					{trackDuration}
				</>
			)
		}
		return (
			<></>
		);
	}

	return (
        <div className="footer-player">
			<div className="footer-player__current">
				<p className="footer-player__current-track">{currentSong}</p>
				<p className="footer-player__current-artists">{currentArtists}</p>
			</div>
			<div className="footer-player__controls">
				<div className="footer-player__controls-song">
					<MdSkipPrevious className="footer-player__icon" onClick={() => setPlayerStateFunction('next', 'POST')}  />
					<div className={`footer-player__controls-play-pause -${isPlaying}`} >
						<IoMdPlay className="footer-player__icon --play" onClick={() => setPlayerStateFunction('play')} />
						<IoMdPause className="footer-player__icon --pause" onClick={() => setPlayerStateFunction('pause')} />
					</div>
					<MdSkipNext className="footer-player__icon" onClick={() => setPlayerStateFunction('previous', 'POST')} />
				</div>
				<div className="footer-player__controls-progress">
					<TrackProgress />
				</div>
			</div>
			<div className="footer-player__options">
				<FiVolume2 />
			</div>
		</div>
	);
}

export default FooterPlayer;