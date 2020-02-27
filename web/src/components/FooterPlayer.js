import React, { useEffect, useState } from 'react';

import { DEVICE_ID, PLAYER, getUserAvailableDevices, changePlayback,  resumeSong, pauseSong, nextSong, previousSong } from '../services/api-player';

import { joinArtists, convertDuration } from '../services/general';

import '../styles/FooterPlayer.css';

import { IoMdPlay, IoMdPause } from 'react-icons/io';
import { MdSkipNext, MdSkipPrevious, MdComputer } from 'react-icons/md';
import { FiVolume2 } from 'react-icons/fi';

function FooterPlayer({ currentlyPlaying }) {
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
		[volumePercentage, setVolumePercentage]  = useState('0'),
		[availableDevices, setAvailableDevices]  = useState([]),
		[showDevicesMenu, setShowDevicesMenu]  = useState(false);

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

	useEffect(() => {
		getUserDevices();
	}, []);

	async function getUserDevices() {
		const response = await getUserAvailableDevices();
		setAvailableDevices(response['devices']);
	};

	useEffect(() => {
		if(currentlyPlaying && currentlyPlaying['item']) {
			const track = currentlyPlaying['item'];
			setTrackImage(track['album']['images'][0]['url']);
			setCurrentArtists(joinArtists(track['artists']));
			setCurrentSong(track['name']);
		}
	}, [currentlyPlaying])

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

		console.log('coisas', e.target.getBoundingClientRect());
		console.log('coisas la', e.screenX);
		console.log('coisas la', e.screenY);
		console.log('total', total);
		console.log('click', click);
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
		return (<></>)
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

	function AnotherDevice() {
		if(currentlyPlaying && currentlyPlaying['device'] && currentlyPlaying['device']['id'] !== DEVICE_ID) {
			setIsPlaying(currentlyPlaying['is_playing']);
			return (
				<div className="footer-player__device">
					<span> <FiVolume2 /> </span> 
					<p>Você está ouvindo em <b>{currentlyPlaying['device']['name']}</b></p>
				</div>
			)
		}
		
		return (<></>);
	}

	function Devices() {
		if(availableDevices.length) {
			return (
				<>
					<ul className="footer-player__devices-menu-items">
						{availableDevices.map((key, index) => {
							const 
								active = key['is_active'];

							return (
								<li 
									key={key.id} 
									className={`available-device -${active}`} 
									onClick={() => changePlayback(key['id'])}
								>
									<MdComputer className="available-device-icon" />
									<div>
										<p>{key['name']}</p>
										<p> <FiVolume2 /> Spotify Conect </p>
									</div>
								</li>
                            );
                        })}
					</ul>
				</>
			)
		}
		return (<></>);
	}

	// function changePlaybackCallback(index) {
	// 	const isItemSelected = this.state.selectedItem === i;
  	// 	return isItemSelected ? "bg-light-gray" : "";
	// 	console.log('vai mudar', index);
	// }

	return (
        <div className={`footer-player`}>
			<div className="footer-player__current">
				<TrackImage />
				<div>
					<p className="footer-player__current-track">{currentSong}</p>
					<p className="footer-player__current-artists">{currentArtists}</p>
				</div>
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
				<div className={`footer-player__devices-menu -${showDevicesMenu}`}>
					<h3>Conectar a um dispositivo</h3>
					<img src="https://open.scdn.co/cdn/images/connect_header@1x.ecc6912d.png" alt="Conect Device" />
					<Devices />
				</div>
				<MdComputer onClick={() => setShowDevicesMenu(!showDevicesMenu)} className="icon-devices" />
				<FiVolume2 />
				<VolumeBar />
			</div>
			<AnotherDevice />
		</div>
	);
}

export default FooterPlayer;