import React from 'react';

function CardGroup({ title, image, title, text }) {
	return (
        <div className="card-group">
            <h3>{title}</h3>
            <div className="card-item">
                <img src={image} alt={title} className="card-item__image" />
                <p className="card-item__title">{title}</p>
                <p className="card-item__text">{text}</p>
            </div>
        </div>
	);
}

export default CardGroup;