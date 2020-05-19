import React from 'react';
import BoxArray from '../BoxArray/BoxArray';

const FaceRecognition = ({ boxes, imageUrl }) => {
    return (
        <div className='center ma'>
            <div className='absolute mt2 box-container'>
                <img id='inputImage' src={imageUrl} alt='' width='500px' height='auto' />
                <BoxArray boxes={boxes} />
            </div>
        </div>
    )
}

export default FaceRecognition;