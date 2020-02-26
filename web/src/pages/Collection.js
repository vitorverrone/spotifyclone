import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import CollectionTracks from '../components/CollectionTracks';

function Collection() {
	return (
        <Router>
            <Switch>
                <Route path="/collection/playlists" exact> oi </Route>
                <Route path="/collection/tracks" exact> <CollectionTracks /> </Route>
            </Switch>
        </Router>
	);
}

export default Collection;
