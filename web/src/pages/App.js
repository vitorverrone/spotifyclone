import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import { verify } from '../services/api';

import '../styles/global.css';

import Header from '../components/Header';
import Sidebar from '../components/Sidebar';
import Main from './Main';
import FooterPlayer from '../components/FooterPlayer';

function App() {
    useEffect(() => {
        verify();
    }, []);

	return (
        <Router>
            <Switch>
                <div className="main-wrapper">
                    <Sidebar />
                    <div className="main">
                        <Header />
                        <Route exact path="/"> <Main /> </Route>
                        <Route path='/' exact component={Main}/>
                    </div>
                    <FooterPlayer />
                </div>
            </Switch>
        </Router>
	);
}

export default App;
