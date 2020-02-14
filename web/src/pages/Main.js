import React from 'react';

import '../styles/Main.css';

import CardGroup from '../components/CardGroup';

function Main({ cards }) {
	return (
        <div className="content">
            <CardGroup cards={cards} />
        </div>
	);
}

export default Main;
