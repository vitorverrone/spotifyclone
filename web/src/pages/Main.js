import React from 'react';

import '../styles/Main.css';

import Card from '../components/Card';

function Main() {
    const rows = []
    for(let i=0; i < 10; i++) {
      rows.push(i)
    }

    function renderRow(row) {
        return (
            <Card
                image="https://mosaic.scdn.co/640/ab67616d0000b2731b603b0cdfbaffc8cfa4bb86ab67616d0000b273e800204371c3a3af6fa2a703ab67616d0000b273f1ec3e558e25c2444f3887b0ab67616d0000b273f66ac2aeca5bdf5d2f22e426"
                title="Tech to house"
                text="De vittinhoskt"
            />
        )
    }

	return (
        <div className="content">
            <div className="card-group">
                <h3>Tocado recentemente</h3>
                {rows.map(elem => {
                    return renderRow(elem)
                })}
            </div>

            <div className="card-group">
                <h3>Feito para xxx</h3>
                {rows.map(elem => {
                    return renderRow(elem)
                })}
            </div>

            <div className="card-group">
                <h3>Não sai dos seus ouvidos</h3>
                {rows.map(elem => {
                    return renderRow(elem)
                })}
            </div>
        </div>
	);
}

export default Main;
