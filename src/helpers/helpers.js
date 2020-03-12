/* eslint-disable no-useless-escape */
const validEmailRegex = RegExp(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/);

export const isNameCorrect = (name, setNameError) => {
  if (name.length <= 1) {
    setNameError('Name must be longer than 1 character');
    return false;
  }
  return true;
};

export const isEmailCorrect = (email, setEmailError) => {
  if (email === '' || !validEmailRegex.test(email)) {
    if (email === '') {
      setEmailError('Email cannot be empty');
    } else {
      setEmailError('Wrong email format');
    }
    return false;
  }
  return true;
};

export const isPasswordCorrect = (password, setPasswordError) => {
  if (password === '') {
    setPasswordError('Password cannot be empty');
    return false;
  }
  return true;
};
