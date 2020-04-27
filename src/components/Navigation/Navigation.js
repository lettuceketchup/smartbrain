import React from 'react';
import './Navigation.css';

const Navigation = () => {
    return (
        <nav style={{display: 'flex', justifyContent: 'flex-end'}}>
            <p className='f3 link dim white underline pa3 sign pointer'>Sign Out</p>
        </nav>
    );
}

export default Navigation