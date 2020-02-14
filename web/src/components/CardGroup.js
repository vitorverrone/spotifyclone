import React, { useEffect } from 'react';

import Card from '../components/Card';

function CardGroup({ cards }) {
    useEffect(() => {
        const 
            newCards = Object.keys(cards).map((key) => cards[key]),
            albumCards = newCards[0];

        if(newCards.length) {
            console.log(albumCards);
        }
    }, [cards])


	return (
        <div className="card-group">
            <h3>Texto</h3>
            <Card
                image="https://mosaic.scdn.co/640/ab67616d0000b2731b603b0cdfbaffc8cfa4bb86ab67616d0000b273e800204371c3a3af6fa2a703ab67616d0000b273f1ec3e558e25c2444f3887b0ab67616d0000b273f66ac2aeca5bdf5d2f22e426"
                title="Tech to house"
                text="De vittinhoskt"
            />
        </div>
	);
}

export default CardGroup;