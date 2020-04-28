import React, { Component } from 'react';
import './App.css';
import Particles from 'react-particles-js'
import Navigation from '../../components/Navigation/Navigation';
import Logo from '../../components/Logo/Logo';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import Rank from '../../components/Rank/Rank';
import FaceRecognition from '../../components/FaceRecognition/FaceRecognition';
import Clarifai from 'clarifai';
import SignIn from '../../components/SignIn/SignIn';
import Register from '../../components/Register/Register';

// Instantiate a new Clarifai app by passing in your API key.
const app = new Clarifai.App({ apiKey: '48ab05d6a0af406586d1179d82f479e8' });

const particlesOptions = {
  particles: {
    number: {
      value: 70,
      density: {
        enable: true,
        value_area: 1000
      }
    }
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: "repulse"
      }
    }
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      input: '',
      imageUrl: '',
      boxes: [],
      route: 'signin',
      isSignedIn: false
    }
    // this.onInputChange = this.onInputChange.bind(this);
    // this.onSubmit = this.onSubmit.bind(this);
  }

  calculateFaceLocations = (data) => {
    const faces = data.outputs[0].data.regions
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    const boxes = [];

    for (let box of faces) {
      const face = box.region_info.bounding_box;
      boxes.push({
        leftCol: face.left_col * width,
        topRow: face.top_row * height,
        rightCol: width * (1 - face.right_col),
        bottomRow: height * (1 - face.bottom_row),
        hover: false
      })
    }
    return boxes
  }

  displayFaceBoxes = (resp) => {
    let boxes = [];
    boxes = this.calculateFaceLocations(resp);
    this.setState({ boxes: boxes });
  }

  onInputChange = (event) => {
    this.setState({ input: event.target.value });
  }

  onSubmit = () => {
    this.setState({ imageUrl: this.state.input })
    app.models.predict(Clarifai.FACE_DETECT_MODEL, this.state.input)
      .then(response => this.displayFaceBoxes(response))
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout' || route === 'signin' || route === 'register')
      this.setState({ isSignedIn: false });
    else if (route === 'home')
      this.setState({ isSignedIn: true });
    this.setState({ route: route });
  }

  render() {
    const { imageUrl, boxes, route } = this.state;
    return (
      <div className='App'>
        <Particles className='particles'
          param={particlesOptions}
        />
        <Navigation onRouteChange={this.onRouteChange} route={route} />
        {
          route === 'home'
            ? <div>
              <Logo />
              <Rank />
              <ImageLinkForm onInputChange={this.onInputChange} onSubmit={this.onSubmit} />
              <FaceRecognition boxes={boxes} imageUrl={imageUrl}
              />
            </div>
            : (
              route === 'register'
                ? <Register onRouteChange={this.onRouteChange} />
                : <SignIn onRouteChange={this.onRouteChange} />
            )
        }
      </div>
    );
  }
}

export default App;
