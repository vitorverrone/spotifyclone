import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { verify, getUserData } from '../services/api';

import { getCookie } from '../services/cookies';

import '../styles/global.css';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Main from './Main';
import FooterPlayer from '../components/FooterPlayer';

function App() {
    const [cardData, setcardData] = useState([]);

    function updateCards(childData) {
        setcardData(childData);
    };

    useEffect(() => {
        console.log('verify', verify());
        if(getCookie('access_token')) {
            async function lala() {
                return await getUserData(getCookie('access_token'));
            } 
            console.log(lala());
        }
    }, []);

	return (
        <Router>
            <Switch>
                <div className="main-wrapper">
                    <Sidebar />
                    <div className="main">
                        <Header updateCards={updateCards}/>
                        <Route exact path="/"> <Main cards={cardData} /> </Route>
                        <Route path="/search"> <Main cards={cardData} /> </Route>
                    </div>
                    <FooterPlayer />
                </div>
            </Switch>
        </Router>
	);
}

export default App;
