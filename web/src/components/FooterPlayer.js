import React, { useEffect, useState } from 'react';

import { PLAYER, resumeSong, pauseSong, nextSong, previousSong } from '../services/api-player';

import { joinArtists, convertDuration } from '../services/general';

import '../styles/FooterPlayer.css';

import { IoMdPlay, IoMdPause } from 'react-icons/io';
import { MdSkipNext, MdSkipPrevious } from 'react-icons/md';
import { FiVolume2 } from 'react-icons/fi';

function FooterPlayer() {
	const 
		[isPlaying, setIsPlaying] = useState(false),
		[currentSong, setCurrentSong] = useState([]),
		[currentArtists, setCurrentArtists]  = useState(''),
		[trackDuration, setTrackDuration]  = useState('0:00'),
		[trackImage, setTrackImage] = useState(''),
		// [trackDurationMS, setTrackDurationMS]  = useState('0:00'),
		// [trackProgressMS, setTrackProgressMS]  = useState(''),
		[trackProgress, setTrackProgress]  = useState('0:00'),
		[trackPercentage, setTrackPercentage]  = useState('0'),
		[volumePercentage, setVolumePercentage]  = useState('0');

	if(PLAYER) {
		PLAYER.addListener('player_state_changed', state => {
			setIsPlaying(!state.paused);
			const track = state['track_window']['current_track'];

			setTrackDuration(convertDuration(track['duration_ms']));
			setTrackImage(track['album']['images'][0]['url']);
			setCurrentArtists(joinArtists(track['artists']));
			setCurrentSong(track['name']);

			PLAYER.getVolume().then(volume => {
				let volume_percentage = volume * 100;
				console.log(`The volume of the player is ${volume_percentage}%`);
			});
		});
	}

	// const volume = document.querySelector('.footer-player__options-volume');
	// volume.addEventListener('click', function(e) {
	// 	const 
	// 		$this = this,
	// 		widthclicked = e.pageX - $this.getBoundingClientRect().left,
	// 		totalWidth = $this.offsetWidth;

	// 	console.log('a porcentagem é', getPercentage(totalWidth, widthclicked));
	// });

	function volumeCallback(e) {
		const 
			total = e.target.getBoundingClientRect().right,
			click = e.screenX,
			percent = Math.abs((total - click) - 100);

		setVolumePercentage(percent);
	}


	// function setPlayStart() {
	// 	setPlay(() => {
	// 		setInterval(() => {
	// 			setTrackProgressMS((trackProgressMS) => {
	// 				return trackProgressMS+1000;
	// 			});
	// 		}, 1000); 
	// 	});
	// }

	function getPercentage(total, progress) {
		const percent = parseInt((100 * progress) / total);

		return percent;
	}

	// useEffect(() => {
	// 	setTrackProgress(convertDuration(trackProgressMS));
	// 	const percent = getPercentage();
	// 	setTrackPercentage(percent);
	// }, [trackProgressMS])

	function TrackProgress() {
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

	function TrackImage() {
		if(trackImage) {
			return (
				<div className="footer-player__current-image">
					<img src={trackImage} alt={currentSong} />
				</div>
			)
		}
		return (
			<></>
		)
	}



	function VolumeBar() {
		const divStyle = {
			width: `${volumePercentage}%`
		};
		return (
			<div className="footer-player__options-volume" onClick={(e) => volumeCallback(e)}>
				<div className="percentage" style={divStyle}></div>
			</div>
		)
	}

	return (
        <div className="footer-player">
			<div className="footer-player__current">
				<TrackImage />
				<p className="footer-player__current-track">{currentSong}</p>
				<p className="footer-player__current-artists">{currentArtists}</p>
			</div>
			<div className="footer-player__controls">
				<div className="footer-player__controls-song">
					<MdSkipPrevious className="footer-player__icon" onClick={previousSong}  />
					<div className={`footer-player__controls-play-pause -${isPlaying}`} >
						<IoMdPlay className="footer-player__icon --play" onClick={resumeSong} />
						<IoMdPause className="footer-player__icon --pause" onClick={pauseSong} />
					</div>
					<MdSkipNext className="footer-player__icon" onClick={nextSong} />
				</div>
				<div className="footer-player__controls-progress">
					<TrackProgress />
				</div>
			</div>
			<div className="footer-player__options">
				<FiVolume2 />
				<VolumeBar />
			</div>
		</div>
	);
}

export default FooterPlayer;