import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { verify, getUserData } from '../services/api';
import { getUsersPlaylist } from '../services/api-search';
import { DEVICE_ID, PLAYER, getUserCurrentlyPlayer } from '../services/api-player';

import '../styles/global.css';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Main from './Main';
import FooterPlayer from '../components/FooterPlayer';
import CollectionTracks from '../components/CollectionTracks';

function App() {
    const 
        [cardData, setcardData] = useState([]),
        [userData, setUserData] = useState([]),
        [userPlaylists, setUserPlaylists] = useState([]),
        [currentlyPlaying, setcurrentlyPlaying] = useState([]),
        [anotherDevice, setAnotherDevice] = useState('');

    function updateCards(childData) {
        setcardData(childData);
    };

    async function userDataFunction() {
        const response = await getUserData();
        if(response) {
            console.log('entrou aqui if');
            setUserData(response); 
            const playlists = await getUsersPlaylist(response.id);
            setUserPlaylists(playlists['items']);
        }
    }

    function useSetUserData(newData) { setUserData(newData) }

    useEffect(() => {
        verify();
        const script = document.createElement('script');
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);
        document.body.removeChild(script);

        userDataFunction();
        currentlyPlayingFunction();
    }, []);

    async function currentlyPlayingFunction() {
        const response = await getUserCurrentlyPlayer();
        response && response['device'] && response['device']['id'] !== DEVICE_ID ? setAnotherDevice('-device') : setAnotherDevice('');
        setcurrentlyPlaying(response);
    }

    if(PLAYER) PLAYER.addListener('player_state_changed', () => currentlyPlayingFunction(), false);

	return (
        <Router>
            <Switch>
                <div className={`main-wrapper ${anotherDevice}`}>
                    <Sidebar playlists={userPlaylists} currentlyPlaying={currentlyPlaying} />
                    <div className="main">
                        <Header updateCards={updateCards} userData={userData} userCallbackFunction={useSetUserData}/>
                        <Route exact path="/"> <Main cards={cardData} /> </Route>
                        <Route path="/search"> <Main cards={cardData} /> </Route>
                        <Route path="/collection/tracks"> <CollectionTracks /> </Route>
                    </div>
                    <FooterPlayer currentlyPlaying={currentlyPlaying}/>
                </div>
            </Switch>
        </Router>
	);
}

export default App;
