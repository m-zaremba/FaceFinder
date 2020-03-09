import React, { useState } from 'react';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/navigation/Navigation';
import SignIn from './components/signIn/SignIn';
import SignUp from './components/signUp/SignUp';
import Logo from './components/logo/Logo';
import Rank from './components/rank/Rank';
import NoteBar from './components/notification/NoteBar';
import ImageInputForm from './components/imageInputForm/ImageInputForm';
import FaceRecognition from './components/faceRecognition/FaceRecognition';

const particleOptions = {
  particles: {
    number: {
      value: 80,
    },
    size: {
      value: 1,
    },
  },
  interactivity: {
    events: {
      onhover: {
        enable: true,
        mode: 'grab',
      },
      onclick: {
        enable: true,
        mode: 'push',
      },
    },
    resize: true,
    modes: {
      grab: {
        distance: 350,
        // eslint-disable-next-line @typescript-eslint/camelcase
        line_linked: {
          opacity: 1,
        },
      },
    },
  },
};

const App = () => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [detectedFaceBox, setDetectedFaceBox] = useState([]);
  const [route, setRoute] = useState('signin');
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [showNotification, setShowNotification] = useState(true);
  const [user, setUser] = useState({
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: '',
  });

  const calculateFaceLocation = (data) => {
    const image = document.getElementById('inputImage');
    const imageWidth = Number(image.width);
    const imageHeight = Number(image.height);
    const detectedFaces = data.outputs[0].data.regions.map((region) => {
      return region.region_info.bounding_box;
    });
    const faceDimensions = detectedFaces.map((face) => {
      return {
        leftCol: face.left_col * imageWidth,
        topRow: face.top_row * imageHeight,
        rightCol: imageWidth - face.right_col * imageWidth,
        bottomRow: imageHeight - face.bottom_row * imageHeight,
      };
    });

    return faceDimensions;
  };

  const displayDetectedFaceFrame = (box) => {
    setDetectedFaceBox(box);
  };

  const onPictureSubmit = () => {
    setImageUrl(input);
    fetch('https://radiant-retreat-49082.herokuapp.com/imageUrl', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        input,
      }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response) {
          fetch('https://radiant-retreat-49082.herokuapp.com/image', {
            method: 'put',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              id: user.id,
            }),
          })
            .then((res) => res.json())
            .then((count) => {
              setUser({ ...user, entries: count });
            })
            .catch((err) => console.log(err));
        }
        displayDetectedFaceFrame(calculateFaceLocation(response));
      })
      .catch((err) => console.log(err));
  };

  const clearState = () => {
    setInput('');
    setImageUrl('');
    setDetectedFaceBox({});
    setRoute('signin');
    setIsSignedIn(false);
    setUser({
      id: '',
      name: '',
      email: '',
      entries: 0,
      joined: '',
    });
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
      {showNotification && route === 'signin' && (
        <NoteBar setShowNotification={setShowNotification} />
      )}
      <div className="app-wrapper">
        <Particles params={particleOptions} className="particle" />
        <Navigation onRouteChange={onRouteChange} isSignedIn={isSignedIn} clearState={clearState} />
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
    </div>
  );
};

export default App;
