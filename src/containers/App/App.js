import React, { Component } from 'react';
import Particles from 'react-particles-js'
import Navigation from '../../components/Navigation/Navigation';
import Logo from '../../components/Logo/Logo';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import Rank from '../../components/Rank/Rank';
import FaceRecognition from '../../components/FaceRecognition/FaceRecognition';
import SignIn from '../../components/SignIn/SignIn';
import Register from '../../components/Register/Register';
import './App.css';

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

const initialState = {
  input: '',
  imageUrl: '',
  // For heroku
  hostUrl: 'https://rocky-refuge-94414.herokuapp.com/',
  // For Local
  // hostUrl: 'http://localhost:3005/',
  boxes: [],
  route: 'signin',
  isSignedIn: false,
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  }
}

class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  loadUser = data => {
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    })
  }

  calculateFaceLocations = (data) => {
    // const faces = data.outputs[0].data.regions
    const faces = data
    const image = document.getElementById('inputImage');
    const width = Number(image.width);
    const height = Number(image.height);
    const boxes = [];

    for (let face of faces) {
      // const face = box.region_info.bounding_box;
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
    fetch(`${this.state.hostUrl}imageurl`, {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input: this.state.input
      })
    })
      .then(response => response.json())
      .then(response => {
        if (response) {
          fetch(`${this.state.hostUrl}image`, {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: this.state.user.id
            })
          })
            .then(response => response.json())
            .then(count => {
              this.setState(Object.assign(this.state.user, { entries: count }))
            })
            .catch(err => console.log);
        }
        console.log(response)
        this.displayFaceBoxes(response)
      })
      .catch(err => console.log(err));
  }

  onRouteChange = (route) => {
    if (route === 'signout' || route === 'signin' || route === 'register')
      this.setState(initialState);
    else if (route === 'home')
      this.setState({ isSignedIn: true });
    this.setState({ route: route });
  }

  render() {
    const { imageUrl, boxes, route, user } = this.state;
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
              <Rank name={user.name} entries={user.entries} />
              <ImageLinkForm
                onInputChange={this.onInputChange}
                onSubmit={this.onSubmit}
              />
              <FaceRecognition boxes={boxes} imageUrl={imageUrl}
              />
            </div>
            : (
              route === 'register'
                ? <Register
                  onRouteChange={this.onRouteChange}
                  loadUser={this.loadUser}
                  hostUrl={this.state.hostUrl}
                />
                : <SignIn
                  onRouteChange={this.onRouteChange}
                  loadUser={this.loadUser}
                  hostUrl={this.state.hostUrl}
                />
            )
        }
      </div>
    );
  }
}

export default App;
