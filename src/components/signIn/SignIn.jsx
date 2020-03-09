/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Loader from '../loader/Loader';

const SignIn = ({ onRouteChange, setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSigningIn, setIsSigningIn] = useState(false);

  const submitSignIn = () => {
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
      .then((user) => {
        if (user.id) {
          setIsSigningIn(false);
          setUser(user);
          onRouteChange('home');
        }
      });
  };

  return (
    <>
      {isSigningIn && <Loader isLoading={isSigningIn} />}
      <article className="br3 ba b--black-10 mv4 w-90 w-50-m w-30-l mw6 center wrapper shadow-5">
        <main className="pa4 black-80">
          <div className="measure">
            <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
              <legend className="f2 fw6 ph0 mh0">Sign In</legend>
              <div className="mt3">
                <label className="db fw6 lh-copy f6" htmlFor="email-address">
                  Email
                </label>
                <input
                  className="pa2 input-reset ba b--black-10 bg-transparent hover-bg-black-10 hover-white w-100"
                  type="email"
                  name="email-address"
                  id="email-address"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mv3">
                <label className="db fw6 lh-copy f6" htmlFor="password">
                  Password
                </label>
                <input
                  className="b pa2 input-reset ba b--black-10 bg-transparent hover-bg-black-10 hover-white w-100"
                  type="password"
                  name="password"
                  id="password"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </fieldset>
            <div className="">
              <input
                className="b ph3 pv2 input-reset ba b--black-10 bg-transparent grow pointer f6 dib"
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
