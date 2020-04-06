import React from 'react';
import './ImageInputForm.css';
import PropTypes from 'prop-types';

const ImageInputForm = ({ setInput, onButtonSubmit }) => {
  return (
    <div className="wrapper self-center">
      <p className="f3 pa2">Let me frame you one more time...</p>
      <div className="form center pa4 br3 shadow-5">
        <input
          type="text"
          className="f4 pa2 w-70 center br-left"
          onChange={(event) => setInput(event.target.value)}
          placeholder="paste image url here"
        />
        <button
          type="button"
          className="w30 grow f4 link ph3 pv2 dib white bg-light-purple br-right"
          onClick={() => onButtonSubmit()}
        >
          Detect
        </button>
      </div>
    </div>
  );
};

ImageInputForm.propTypes = {
  setInput: PropTypes.func.isRequired,
  onButtonSubmit: PropTypes.func.isRequired,
};

export default ImageInputForm;
