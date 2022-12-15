const tokenKey = 'token';
const userKey = 'user';
const creditKey = 'credit';

function saveToken(token) {
  localStorage.setItem('token', token);
}

function getToken() {
  const myToken = getFromStorage('token');
  return myToken;
}
function saveUser(user) {
  localStorage.setItem('user', JSON.stringify(user));
}

const accessToken = getToken();

function updateLocalStorage(url) {
  async function getUserData() {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
    });
    if (response.ok) {
      const data = await response.json();
      const userToSave = {
        name: data.name,
        email: data.email,
        avatar: data.avatar,
        credits: data.credits,
      };
      saveUser(userToSave);
      location.reload();
    } else {
      console.log('There was an error');
    }
  }
  getUserData();
}

function getUserName() {
  const user = localStorage.getItem('user');
  if (user) {
    return JSON.parse(user);
  } else return '';
}

function getFromStorage(localStorageKey) {
  const value = localStorage.getItem(localStorageKey);
  if (value) {
    return value;
  } else {
    return [];
  }
}

function clearStorage() {
  localStorage.clear();
}

function saveCredit(credits) {
  saveToStorage(creditKey, credits);
}
function getCreditAmount() {
  const availableCredit = getFromStorage(creditKey);
  if (availableCredit) {
    return availableCredit;
  } else {
    return null;
  }
}

function getUserAvatar() {
  const user = getFromStorage(user);
  if (user) {
    return user.avatar;
  } else {
    return null;
  }
}

export {
  getToken,
  saveToken,
  saveUser,
  updateLocalStorage,
  getCreditAmount,
  getUserAvatar,
  getUserName,
  clearStorage,
  saveCredit,
};
