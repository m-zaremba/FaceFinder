import React from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import PropTypes from 'prop-types';

const NoteBar = ({ setShowNotification }) => {
  return (
    <div className="flex fixed bottom-0 w-100 h2 bg-yellow z-5 fw9 items-center justify-center">
      <span className="ma3">
        Don&apos;t want to create an account? Log in with email: testuser@testmail.com and password:
        testPassword
      </span>
      <IoIosCloseCircleOutline
        className="pointer dim ma0"
        size="1.8em"
        onClick={() => setShowNotification(false)}
      />
    </div>
  );
};

NoteBar.propTypes = {
  setShowNotification: PropTypes.func.isRequired,
};

export default NoteBar;
