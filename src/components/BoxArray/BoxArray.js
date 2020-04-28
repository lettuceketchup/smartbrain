import React from 'react';
import Box from '../Box/Box'

const BoxArray = ({ boxes }) => {
    return (
        boxes.map((box) => {
            return <Box box={box} />
        })
    );
}

export default BoxArray;