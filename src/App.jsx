import React, { useState } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/navigation/Navigation';
import SignIn from './components/signIn/SignIn';
import SignUp from './components/signUp/SignUp';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import ImageInputForm from './components/imageInputForm/ImageInputForm';
import FaceRecognition from './components/faceRecognition/FaceRecognition';

const API_KEY = process.env.REACT_APP_CLARIFAI_API_KEY;

const app = new Clarifai.App({
  apiKey: API_KEY,
});

const particleOptions = {
  particles: {
    number: {
      value: 220,
    },
    size: {
      value: 2,
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: 'repulse',
      },
      onclick: {
        enable: true,
        mode: 'push',
      },
    },
    modes: {
      repulse: {
        distance: 150,
        duration: 0.4,
      },
    },
  },
};

const App = () => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [detectedFaceBox, setDetectedFaceBox] = useState({});
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  });

  const calculateFaceLocation = (data) => {
    const detectedFace = data.outputs[0].data.regions[0].region_info.bounding_box;
    const image = document.getElementById('inputImage');
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);
    return {
      leftCol: detectedFace.left_col * imageWidth,
      topRow: detectedFace.top_row * imageHeight,
      rightCol: imageWidth - detectedFace.right_col * imageWidth,
      bottomRow: imageHeight - detectedFace.bottom_row * imageHeight,
    };
  };

  const displayDetectedFaceFrame = (box) => {
    setDetectedFaceBox(box);
  };

  const onPictureSubmit = () => {
    setImageUrl(input);
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then((response) => {
        if (response) {
          fetch('http://localhost:3001/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((res) => res.json())
            .then((count) => {
              setUser({ ...user, entries: count });
            });
        }
        displayDetectedFaceFrame(calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  const onRouteChange = (routePath) => {
    if (routePath === 'register' || routePath === 'signin') {
      setIsSignedIn(false);
    } else if (routePath === 'home') {
      setIsSignedIn(true);
    }
    setRoute(routePath);
  };

  let signForm;

  if (route === 'signin') {
    signForm = <SignIn onRouteChange={onRouteChange} setUser={setUser} />;
  } else if (route === 'register') {
    signForm = <SignUp onRouteChange={onRouteChange} setUser={setUser} />;
  }

  return (
    <div className="App">
      <Particles params={particleOptions} className="particle" />
      <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} />
      {route === 'home' ? (
        <>
          <Logo />
          <Rank name={user.name} entries={user.entries} />
          <ImageInputForm setInput={setInput} onButtonSubmit={onPictureSubmit} />
          <FaceRecognition imageUrl={imageUrl} detectedFace={detectedFaceBox} />
        </>
      ) : (
        signForm
      )}
    </div>
  );
};

export default App;
