import React from 'react';
import './FaceRecognition.css';
import BoxArray from '../BoxArray/BoxArray';

const FaceRecognition = ({ boxes, imageUrl }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2 box-container'>
                <img id='inputImage' src={imageUrl} alt='searched' width='500px' height='auto' />
                <BoxArray boxes={boxes} />
            </div>
        </div>
    )
}

export default FaceRecognition;