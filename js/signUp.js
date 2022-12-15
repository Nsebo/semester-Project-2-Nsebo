import { API_BASE_URL, CREATE_USER_URL } from './settings/api';
import { validateEmail, validatePassword } from './utils/validation';

const signupForm = document.querySelector('#signup-form');
const userName = document.querySelector('#userName');
const userNameError = document.querySelector('#userNameError');

const email = document.querySelector('#email');
const emailErrorMessage = document.querySelector('#emailErrorMessage');
const emailErrorNotValid = document.querySelector('#emailErrorNotValid');

const password = document.querySelector('#password');
const passwordErrorMessage = document.querySelector('#passwordErrorMessage');

const confirmPassword = document.querySelector('#confirm-password');
const confirmPasswordError = document.querySelector('#confirmPasswordError');
const confirmPasswordErrorNotMatching = document.querySelector('#confirmPasswordErrorNotMatching');
const avatar = document.querySelector('#avatar');

const avatarError = 'Avatar must contain image filename ending (.jpg .gif .png etc)';
console.log(avatarError);
const formErrorMessage = document.querySelector('#form-error-message');

signupForm.addEventListener('submit', function (event) {
  event.preventDefault();

  let isUserName = false;
  console.log('User typed username:', userName.value);
  if (userName.value.trim().length > 0) {
    userNameError.classList.add('hidden');
    isUserName = true;
  } else {
    userNameError.classList.remove('hidden');
  }

  let isEmail = false;
  if (email.value.trim().length > 0) {
    emailErrorMessage.classList.add('hidden');
    isEmail = true;
  } else {
    emailErrorMessage.classList.remove('hidden');
  }

  let isValidEmail = false;
  if (email.value.trim().length && validateEmail(email.value) === true) {
    emailErrorNotValid.classList.add('hidden');
    isValidEmail = true;
  } else if (email.value.trim().length && validateEmail(email.value) !== true) {
    emailErrorNotValid.classList.remove('hidden');
  }

  let isPassword = false;
  console.log('User typed password:', password.value);
  if (password.value.trim().length >= 8) {
    passwordErrorMessage.classList.add('hidden');
    isPassword = true;
  } else {
    passwordErrorMessage.classList.remove('hidden');
  }

  let isConfirmPassword = false;
  console.log('User typed confirmed password:', confirmPassword.value);
  if (confirmPassword.value.trim().length >= 8) {
    confirmPasswordError.classList.add('hidden');
    isConfirmPassword = true;
  } else {
    confirmPasswordError.classList.remove('hidden');
  }

  let isValidPasswordMatch = false;
  isValidPasswordMatch = validatePassword(password.value, confirmPassword.value);

  let isFormValid = isUserName && isEmail && isValidEmail && isPassword && isConfirmPassword;

  if (isFormValid) {
    console.log('validate success');

    const userData = {
      name: userName.value,
      email: email.value,
      password: password.value,
      avatar: avatar.value,
    };
    console.log('Per was here');
    console.log(userData);

    (async function createUser() {
      const response = await fetch(`${CREATE_USER_URL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });
      if (response.ok) {
        console.log('user registration OK');
        const data = await response.json();
        location.href = '../login.html';
      } else {
        const err = await response.json();
        const message = `Error: ${err.errors[0].message}`;
        console.log(err.errors[0].message);
        throw new Error(message);
      }
    })().catch((err) => {
      formErrorMessage.innerHTML = `${err.message}`;
      console.log(JSON.stringify(userData));
    });
  } else {
    console.log('validation failed');
  }
});
