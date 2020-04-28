import React from 'react';
import './ImageLinkForm.css'

const ImageLinkForm = ({ onInputChange, onSubmit }) => {
    return (
        <div>
            <p className='f3 white'>
                {'This Magic Brain will detect faces in your pictures.'}
            </p>
            <div className='center'>
                <div className='pa3 br2 shadow-5 form center'>
                    <input className='f4 pa2 w-70 center' type='text'
                        onChange={onInputChange}
                        // onKeyPress={(event) => {if(event === 'Enter') onSubmit}}
                    />
                    <button className='w-30 grow f4 link ph3 pv2 dib white ba bw-1'
                        onClick={onSubmit}
                    >Detect</button>
                </div>
            </div>
        </div>
    );
}

export default ImageLinkForm;