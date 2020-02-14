import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { verify, getUserData } from '../services/api';
import { getUsersPlaylist } from '../services/api-search';

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
        [userPlaylists, setUserPlaylists] = useState([]);

    function updateCards(childData) {
        setcardData(childData);
    };

    async function userDataFunction(access_token) {
        const response = await getUserData(access_token);
        if(response) {
            setUserData(response); 
            const playlists = await getUsersPlaylist(response.id);
            setUserPlaylists(playlists['items']);
        }
    }

    function useSetUserData(newData) { setUserData(newData) }

    useEffect(() => {
        verify();
        const access_token = getCookie('access_token');
        if(access_token) { userDataFunction(access_token) }
    }, []);

	return (
        <Router>
            <Switch>
                <div className="main-wrapper">
                    <Sidebar playlists={userPlaylists} />
                    <div className="main">
                        <Header updateCards={updateCards} userData={userData} userCallbackFunction={useSetUserData}/>
                        <Route exact path="/"> <Main cards={cardData} /> </Route>
                        <Route path="/search"> <Main cards={cardData} /> </Route>
                        <Route path="/collection/tracks"> <CollectionTracks /> </Route>
                    </div>
                    <FooterPlayer />
                </div>
            </Switch>
        </Router>
	);
}

export default App;
