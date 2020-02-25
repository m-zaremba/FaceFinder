import React, { useState } from 'react';
import Clarifai from 'clarifai';
import Particles from 'react-particles-js';
import './App.css';
import Navigation from './components/navigation/Navigation';
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
      value: 120,
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
    },
  },
};

const App = () => {
  const [input, setInput] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [detectedFaceBox, setDetectedFaceBox] = useState({});

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

  const onButtonSubmit = () => {
    setImageUrl(input);
    app.models
      .predict(Clarifai.FACE_DETECT_MODEL, input)
      .then((response) => displayDetectedFaceFrame(calculateFaceLocation(response)))
      .catch((err) => {
        // there was an error
      });
  };

  return (
    <div className="App">
      <Particles params={particleOptions} className="particle" />
      <Navigation />
      <Logo />
      <Rank />
      <ImageInputForm setInput={setInput} onButtonSubmit={onButtonSubmit} />
      <FaceRecognition imageUrl={imageUrl} detectedFace={detectedFaceBox} />
    </div>
  );
};

export default App;
