import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { verify, getUserData } from '../services/api';
import { getUsersPlaylist } from '../services/api-search';
import { getUserCurrentlyPlaying } from '../services/api-player';

import { getCookie } from '../services/cookies';

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
        [currentlyPlaying, setcurrentlyPlaying] = useState([]);

    function updateCards(childData) {
        setcardData(childData);
    };

    async function userDataFunction() {
        const response = await getUserData();
        console.log('entrou aqui', response);
        if(response) {
            console.log('entrou aqui if');
            setUserData(response); 
            const playlists = await getUsersPlaylist(response.id);
            setUserPlaylists(playlists['items']);
        }
    }

    function useSetUserData(newData) { setUserData(newData) }

    useEffect(() => {

        const script = document.createElement('script');
        script.src = "https://sdk.scdn.co/spotify-player.js";
        script.async = true;
        document.body.appendChild(script);
        document.body.removeChild(script);

        if(verify()) { userDataFunction(); }
    }, []);

    useEffect(() => {
        verify();
        const access_token = getCookie('access_token');
        if(access_token) {
            userDataFunction(access_token);
            currentlyPlayingFunction();
        }
    }, []);


    async function currentlyPlayingFunction() {
        const response = await getUserCurrentlyPlaying();
        setcurrentlyPlaying(response);
    }

	return (
        <Router>
            <Switch>
                <div className="main-wrapper">
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
