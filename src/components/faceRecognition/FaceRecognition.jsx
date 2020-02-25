import React from 'react';
import PropTypes from 'prop-types';
import './FaceRecognition.css';

const FaceRecognition = ({ imageUrl, detectedFace }) => {
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
          <div
            className="bounding-box"
            style={{
              top: detectedFace.topRow,
              right: detectedFace.rightCol,
              bottom: detectedFace.bottomRow,
              left: detectedFace.leftCol,
            }}
          >
            {' '}
          </div>
        </>
      ) : null}
    </div>
  );
};

FaceRecognition.propTypes = {
  imageUrl: PropTypes.string.isRequired,
  detectedFace: PropTypes.objectOf(PropTypes.number).isRequired,
};

export default FaceRecognition;
