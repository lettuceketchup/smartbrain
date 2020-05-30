import React, { Component } from 'react';
import { connect } from 'react-redux';
import Particles from 'react-particles-js'
import Navigation from '../../components/Navigation/Navigation';
import Logo from '../../components/Logo/Logo';
import ImageLinkForm from '../ImageLinkForm/ImageLinkForm';
import Rank from '../../components/Rank/Rank';
import FaceRecognition from '../../components/FaceRecognition/FaceRecognition';
import SignIn from '../../components/SignIn/SignIn';
import Register from '../../components/Register/Register';
import './App.css';

import { setInput, setImageUrl, requestFaces } from '../../actions';

const mapStateToProps = state => ({
  input: state.inputChange.input,
  imageUrl: state.setImageUrl.imageUrl,
  boxes: state.requestFaces.boxes,
  isPending: state.requestFaces.isPending,
  error: state.requestFaces.error
})


const mapDispatchToProps = (dispatch) => ({
  onInputChange: (event) => dispatch(setInput(event.target.value)),
  onImageUrlChange: (input) => dispatch(setImageUrl(input)),
  onRequestFaces: (hostUrl, imageUrl, user) => dispatch(requestFaces(hostUrl, imageUrl, user))
})

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
  hostUrl: process.env.HOST_URL,
  // For heroku
  // hostUrl: 'https://rocky-refuge-94414.herokuapp.com/',
  // For Local
  // hostUrl: 'http://localhost:3005/',
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
console.log(initialState);
console.log(process.env);

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

  onRouteChange = (route) => {
    if (route === 'signout' || route === 'signin' || route === 'register')
      this.setState(initialState);
    else if (route === 'home')
      this.setState({ isSignedIn: true });
    this.setState({ route: route });
  }

  render() {
    const { route, user } = this.state;
    const { onInputChange, onImageUrlChange, onRequestFaces, imageUrl, boxes, input } = this.props;
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
                onInputChange={onInputChange}
                onImageUrlChange={onImageUrlChange}
                onRequestFaces={onRequestFaces}
                hostUrl={this.state.hostUrl}
                input={input}
                user={user}
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
