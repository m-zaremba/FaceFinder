/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import PropTypes from 'prop-types';

const SignUp = ({ onRouteChange, setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const submitSignUp = () => {
    fetch('http://localhost:3001/signup', {
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    }).then((response) =>
      response.json().then((user) => {
        if (user.id) {
          setUser(user);
          onRouteChange('home');
        }
      }),
    );
  };

  return (
    <article className="br3 ba b--black-10 mv4 w-100 w-50-m w-30-l mw6 center wrapper shadow-5">
      <main className="pa4 black-80">
        <div className="measure">
          <fieldset id="sign_up" className="ba b--transparent ph0 mh0">
            <legend className="f2 fw6 ph0 mh0">Sign up</legend>
            <div className="mt3">
              <label className="db fw6 lh-copy f6" htmlFor="name">
                Name
              </label>
              <input
                className="pa2 input-reset ba b--black-10 bg-transparent hover-bg-black-10 hover-white w-100"
                type="text"
                name="name"
                id="name"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
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
              value="Sign up"
              onClick={() => submitSignUp()}
            />
          </div>
        </div>
      </main>
    </article>
  );
};
SignUp.propTypes = {
  onRouteChange: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired,
};

export default SignUp;
