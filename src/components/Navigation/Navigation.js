import React from 'react';
import './Navigation.css';

const Navigation = ({ onRouteChange, route }) => {
    if (route === 'home')
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p
                    className='f3 link dim white pa2 mr3 sign pointer'
                    onClick={() => onRouteChange('signout')}
                >Sign Out</p>
            </nav>
        );
    else if (route === 'signin')
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p
                    className='f3 link dim white pa2 mr3 sign pointer'
                    onClick={() => onRouteChange('register')}
                >Register</p>
            </nav>
        );
    else
        return (
            <nav style={{ display: 'flex', justifyContent: 'flex-end' }}>
                <p
                    className='f3 link dim white pa2 mr3 sign pointer'
                    onClick={() => onRouteChange('signin')}
                >Sign In</p>
            </nav>
        );
}

export default Navigation