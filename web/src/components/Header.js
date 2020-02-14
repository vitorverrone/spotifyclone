import React from 'react';

import { useRouteMatch } from 'react-router-dom';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { AiOutlineSearch } from 'react-icons/ai';

import { login } from '../services/api';
import searchApi from '../services/api-search';

import '../styles/Header.css';

function Header({ updateCards }) {
    let showForm;
    
    const match = useRouteMatch({ path: '/search', exact: false });
    match ? showForm = '' : showForm = 'hide';

    async function searchSomething(text) {
        const response = await searchApi(text);
        updateCards(response);
    }

	return (
        <div className="header">
            <div className="header-col">
                <div className="arrows-navigation">
                    <MdKeyboardArrowLeft className="arrow arrow-left" />
                    <MdKeyboardArrowRight className="arrow arrow-right" />
                </div>
                <form className={`search-form ${showForm}`}>
                    <AiOutlineSearch className="search-form__icon" />
                    <input type="text" className="search-form__input" onKeyUp={e => searchSomething(e.target.value)} placeholder="Busque artistas, músicas ou podcasts" />
                </form>
            </div>
            <div className="header-col">
                <button className="login-button" onClick={login}>Entrar</button>
            </div>
        </div>
	);
}

export default Header;