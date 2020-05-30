import React, { Component } from 'react';
import './ImageLinkForm.css'

class ImageLinkForm extends Component {
    constructor(props) {
        super(props);
        this.onInputChange = this.props.onInputChange;
        this.onImageUrlChange = this.props.onImageUrlChange;
        this.onRequestFaces = this.props.onRequestFaces;
        this.focusInput = React.createRef()
    }

    onSubmit = () => {
        this.onImageUrlChange(this.props.input);
        this.onRequestFaces(this.props.hostUrl, this.props.input, this.props.user);
    }

    handleFocus = event => event.target.select();

    keyPress = e => {
        if (e.key === 'Enter') {
            this.onSubmit();
        }
    }

    componentDidMount() {
        this.focusInput.current.focus();
    }

    render() {
        return (
            <div>
                <p className='f3 white'>
                    {'This Magic Brain will detect faces in your pictures.'}
                </p>
                <div className='center'>
                    <div className='pa3 br2 shadow-5 form center'
                        onKeyDown={this.keyPress}>
                        <input className='f4 pa2 w-70 center' type='text'
                            onChange={this.onInputChange}
                            onFocus={this.handleFocus}
                            ref={this.focusInput}
                        />
                        <button className='w-30 grow f4 link ph3 pv2 dib white ba bw-1 mh1'
                            onClick={this.onSubmit}
                        >Detect</button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ImageLinkForm;