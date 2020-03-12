import React from 'react';
import PropTypes from 'prop-types';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, detectedFace }) => {
  const faceBox = detectedFace.map((face) => {
    return (
      <div
        className="bounding-box"
        key={face.rightCol + face.topRow}
        style={{
          top: face.topRow,
          right: face.rightCol,
          bottom: face.bottomRow,
          left: face.leftCol,
        }}
      >
        {' '}
      </div>
    );
  });

  return (
    <div className="center wrapper ma2">
      {imageUrl ? (
        <>
          <img
            id="inputImage"
            src={imageUrl}
            alt="subbmited to analysis"
            width="500"
            height="auto"
          />
          {faceBox}
        </>
      ) : null}
    </div>
  );
};

FaceRecognition.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  detectedFace: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default FaceRecognition;
