import React from 'react';
import loginApi from '../services/api';

import '../styles/Header.css';

function Header() {
	return (
        <div className="header">

            <button className="login-button" onClick={loginApi}>Entrar</button>
        </div>
	);
}

export default Header;