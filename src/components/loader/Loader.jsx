import React from 'react';
import HashLoader from 'react-spinners/HashLoader';
import PropTypes from 'prop-types';

const Loader = ({ isLoading }) => {
  return (
    <div className="absolute top-0 right-0 bottom-0 left-0 flex content-center items-center z-5 backshadow">
      <HashLoader size={100} color="#0097c1" loading={isLoading} />
    </div>
  );
};

Loader.propTypes = {
  isLoading: PropTypes.bool.isRequired,
};

export default Loader;
