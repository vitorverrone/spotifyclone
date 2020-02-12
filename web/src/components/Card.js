import React from 'react';

import '../styles/Card.css';

function Card({ image, title, text }) {
	return (
        <div className="card-item">
            <img src={image} alt={title} className="card-item__image" />
            <p className="card-item__title">{title}</p>
            <p className="card-item__text">{text}</p>
        </div>
	);
}

export default Card;