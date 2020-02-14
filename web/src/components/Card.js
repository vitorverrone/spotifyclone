import React from 'react';

import '../styles/Card.css';

function Card({ image, title, text, classes = '' }) {
	return (
        <div className={`card-item ${classes}`}>
            <div className="card-item__image">
                <img src={image} alt={title} />
            </div>
            <p className="card-item__title">{title}</p>
            <p className="card-item__text">{text}</p>
        </div>
	);
}

export default Card;