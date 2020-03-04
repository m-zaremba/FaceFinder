import React from 'react';
import PropTypes from 'prop-types';

const Navigation = ({ onRouteChange, isSignedIn, clearState }) => {
  return isSignedIn ? (
    <nav className="wrapper self-end">
      <input
        type="button"
        value="Sign out"
        onClick={() => clearState() || onRouteChange('signin')}
        onKeyDown={() => clearState() || onRouteChange('signin')}
        className="user_control_button f3 dim link back underline pa3 pointer"
      />
    </nav>
  ) : (
    <nav className="wrapper self-end">
      <input
        type="button"
        value="Sign in"
        onClick={() => onRouteChange('signin')}
        onKeyDown={() => onRouteChange('signin')}
        className="user_control_button f3 dim link back underline pa3 pointer"
      />
      <input
        type="button"
        value="Sign up"
        onClick={() => onRouteChange('register')}
        onKeyDown={() => onRouteChange('register')}
        className="user_control_button f3 dim link back underline pa3 pointer"
      />
    </nav>
  );
};

Navigation.propTypes = {
  onRouteChange: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool.isRequired,
  clearState: PropTypes.func.isRequired,
};

export default Navigation;
