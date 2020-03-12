/* eslint-disable no-useless-escape */
/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Loader from '../loader/Loader';
import { isPasswordCorrect, isEmailCorrect, isNameCorrect } from '../../helpers/helpers';

const SignUp = ({ onRouteChange, setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningUp, setIsSigningUp] = useState(false);
  const [nameError, setNameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [signupErrorMessage, setSignupErrorMessage] = useState('');

  const clearSignupErrors = () => {
    if (email !== '' && isEmailCorrect(email, setEmailError)) {
      setEmailError('');
    }
    if (name !== '' && isNameCorrect(name, setNameError)) {
      setNameError('');
    }
    if (password !== '') {
      setPasswordError('');
    }
  };

  const isSignupFormCorrect = () => {
    const nameCorrect = isNameCorrect(name, setNameError);
    const emailCorrect = isEmailCorrect(email, setEmailError);
    const passwordCorrect = isPasswordCorrect(password, setPasswordError);

    if (emailCorrect && passwordCorrect && nameCorrect) {
      return true;
    }
    return false;
  };

  const submitSignUp = () => {
    if (isSignupFormCorrect()) {
      setIsSigningUp(true);
      fetch('https://radiant-retreat-49082.herokuapp.com/signup', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      }).then((response) => {
        if (!response.ok) {
          setIsSigningUp(false);
          setSignupErrorMessage(`An account with email ${email} already exists.`);
        } else {
          response.json().then((user) => {
            if (user.id) {
              setIsSigningUp(false);
              setUser(user);
              onRouteChange('home');
            }
          });
        }
      });
    }
    clearSignupErrors();
    setSignupErrorMessage('');
  };

  return (
    <>
      {isSigningUp && <Loader isLoading={isSigningUp} />}
      <article className="br3 ba b--black-10 mv4 w-90 w-50-m w-30-l mw6 center wrapper shadow-5 background-mist">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Sign up</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="name">
                  Name
                </label>
                <input
                  className={`pa2 input-reset ba ${
                    nameError ? 'b--dark-red' : 'b--black-40'
                  } bg-transparent hover-bg-black-10 hover-white w-100`}
                  type="text"
                  name="name"
                  id="name"
                  onChange={(e) => setName(e.target.value)}
                />
                {nameError.length > 0 && <p className="dark-red">{nameError}</p>}
              </div>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className={`pa2 input-reset ba ${
                    signupErrorMessage || emailError ? 'b--dark-red' : 'b--black-40'
                  } bg-transparent hover-bg-black-10 hover-white w-100`}
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError.length > 0 && <p className="dark-red">{emailError}</p>}
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className={`b pa2 input-reset ba ${
                    passwordError ? 'b--dark-red' : 'b--black-40'
                  } bg-transparent hover-bg-black-10 hover-white w-100`}
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError.length > 0 && <p className="dark-red">{passwordError}</p>}
              </div>
            </fieldset>
            {signupErrorMessage && <p className="pa3 dark-red fw9">{signupErrorMessage}</p>}
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black-40 bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign up"
                onClick={() => submitSignUp()}
              />
            </div>
          </div>
        </main>
      </article>
    </>
  );
};
SignUp.propTypes = {
  onRouteChange: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default SignUp;
