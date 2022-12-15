import { LOGIN_USER_URL } from './settings/api';
import { validateEmail } from './utils/validation';
import { saveToken, saveUser } from './utils/storage';

const loginForm = document.querySelector('#login-form');
const email = document.querySelector('#email');

const emailErrorMessage = document.querySelector('#emailErrorMessage');
const emailErrorNotValid = document.querySelector('#emailErrorNotValid');

const password = document.querySelector('#password');
const passwordErrorMessage = document.querySelector('#passwordErrorMessage');

const formErrorMessage = document.querySelector('#form-error-message');

if (loginForm) {
  loginForm.addEventListener('submit', function (event) {
    event.preventDefault();

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
    if (password.value.trim().length >= 8) {
      passwordErrorMessage.classList.add('hidden');
      isPassword = true;
    } else {
      passwordErrorMessage.classList.remove('hidden');
    }

    let isFormValid = isEmail && isValidEmail && isPassword;

    if (isFormValid) {
      const userData = {
        email: email.value,
        password: password.value,
      };
      console.log(userData);

      // API CALL
      console.log(LOGIN_USER_URL);

      (async function loginUser() {
        const response = await fetch(LOGIN_USER_URL, {
          method: 'POST',
          headers: {
            'content-Type': 'application/json',
          },
          body: JSON.stringify(userData),
        });
        if (response.ok) {
          const data = await response.json();
          saveToken(data.accessToken);
          const userToSave = {
            name: data.name,
            email: data.email,
          };
          saveUser(userToSave);
          location.href = '../index.html';
        } else {
          const err = await response.json();
          const message = `Error: ${err.message}`;
          throw new Error(message);
        }
      })().catch((error) => {
        formErrorMessage.innerHTML = `something went wrong ${error}`;
      });
    } else {
      console.log('validate failed');
    }
  });
}
