import React from 'react';
import PropTypes from 'prop-types';

const Rank = ({ name, entries }) => {
  return (
    <div className="wrapper self-center">
      <div className="white f3">{name} the number of pictures you analyzed is...</div>
      <div className="white f1">{entries}</div>
    </div>
  );
};

Rank.propTypes = {
  name: PropTypes.string.isRequired,
  entries: PropTypes.string.isRequired,
};

export default Rank;
