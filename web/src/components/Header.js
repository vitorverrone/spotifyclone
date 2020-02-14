import React, { useEffect, useState } from 'react';

import { useRouteMatch } from 'react-router-dom';

import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from 'react-icons/md';
import { AiOutlineSearch, AiOutlineUser } from 'react-icons/ai';
import { IoMdArrowDropdown } from 'react-icons/io';

import { login } from '../services/api';
import { searchApi } from '../services/api-search';

import { setCookie } from '../services/cookies';

import '../styles/Header.css';

function Header({ updateCards, userData, userCallbackFunction }) {

    // Search form
    let showForm;
    const match = useRouteMatch({ path: '/search', exact: false });
    match ? showForm = '' : showForm = 'hide';

    async function searchSomething(text) {
        const response = await searchApi(text);
        updateCards(response);
    }
    // \Search form

    // User Menu
    const [menuActivated, setMenuActivated] = useState('');

    function activeMenu() {
        if(!menuActivated) {
            setMenuActivated('active');
        } else {
            setMenuActivated('');
        }
    }

    useEffect(() => {
        setHeader()
    }, [userData]);

    function setHeader() {
        console.log('mudou o header');
        if(userData.display_name) {
            return (
                <div className={`user-header ${menuActivated}`} onClick={activeMenu}>
                    <AiOutlineUser className="user-header__icon" />
                    <span className="user-header__name">{userData.display_name}</span>
                    <IoMdArrowDropdown className="user-header__arrow" />
                    <ul className="user-header__menu">
                        <li onClick={logout}> Sair </li>
                    </ul>
                </div>
            );
        } else {
            return (
                <button className="login-button" onClick={login}>Entrar</button>
            );
        };
    }

    function logout() {
        setCookie('access_token', '');
        userCallbackFunction([]);
    }
    // \User menu

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
            <div className="header-col"> {setHeader()}</div>
        </div>
	);
}

export default Header;