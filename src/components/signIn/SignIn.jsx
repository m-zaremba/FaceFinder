/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Loader from '../loader/Loader';
import { isEmailCorrect, isPasswordCorrect } from '../../helpers/helpers';

const SignIn = ({ onRouteChange, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [signinErrorMessage, setSigninErrorMessage] = useState('');

  const clearSigninErrors = () => {
    if (email !== '' && isEmailCorrect(email, setEmailError)) {
      setEmailError('');
    }
    if (password !== '') {
      setPasswordError('');
    }
  };

  const isSigninFormCorrect = () => {
    const emailCorrect = isEmailCorrect(email, setEmailError);
    const passwordCorrect = isPasswordCorrect(password, setPasswordError);

    if (emailCorrect && passwordCorrect) {
      return true;
    }
    return false;
  };

  const submitSignIn = () => {
    if (isSigninFormCorrect()) {
      setIsSigningIn(true);
      fetch('https://radiant-retreat-49082.herokuapp.com/signin', {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((response) => response.json())
        .then((response) => {
          if (response === 'Wrong password') {
            setIsSigningIn(false);
            setSigninErrorMessage(response);
          } else if (response === 'User not found') {
            setIsSigningIn(false);
            setSigninErrorMessage(response);
          } else {
            const user = response;
            if (user.id) {
              setIsSigningIn(false);
              setUser(user);
              onRouteChange('home');
            }
          }
        });
    }
    clearSigninErrors();
    setSigninErrorMessage('');
  };

  return (
    <>
      {isSigningIn && <Loader isLoading={isSigningIn} />}
      <article className="br3 ba b--black-10 mv4 w-90 w-50-m w-30-l mw6 center wrapper shadow-5 background-mist">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className={`pa2 input-reset ba ${
                    emailError ? 'b--dark-red' : 'b--black-40'
                  } bg-transparent hover-bg-black-10 hover-white w-100`}
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <p className="dark-red">{emailError}</p>}
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className={`pa2 input-reset ba ${
                    passwordError ? 'b--dark-red' : 'b--black-40'
                  } bg-transparent hover-bg-black-10 hover-white w-100`}
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <p className="dark-red">{passwordError}</p>}
              </div>
              {signinErrorMessage && <p className="dark-red pa3 fw9">{signinErrorMessage}</p>}
            </fieldset>
            <div>
              <input
                className="b ph3 pv2 input-reset ba b--black-40 bg-transparent grow pointer f6 dib"
                type="submit"
                value="Sign in"
                onClick={() => submitSignIn()}
              />
            </div>
            <div className="lh-copy mt3">
              <p>No account?</p>
              <input
                type="button"
                value="Sign up"
                href="#0"
                className="f6 link dim black user_control_button pointer"
                onClick={() => onRouteChange('register')}
              />
            </div>
          </div>
        </main>
      </article>
    </>
  );
};

SignIn.propTypes = {
  onRouteChange: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default SignIn;
