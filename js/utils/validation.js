function validateEmail(email) {
  const regEx = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@(stud.noroff.no|noroff.no)$/;
  console.log(regEx);
  if (email.match(regEx)) {
    return true;
  } else {
    return false;
  }
}

function validatePassword(password, confirmPassword) {
  if (!password) {
    return false;
  }
  if (!confirmPassword) {
    return false;
  }
  if (password !== confirmPassword) {
    return false;
  } else {
    return true;
  }
}

function isValidUrl(string) {
  try {
    new URL(string);
    return true;
  } catch (err) {
    return false;
  }
}

function isImage(url) {
  const imgRegex = /\.(jpg|jpeg|png|webp|avif|gif|svg)$/;
  if (typeof url === 'object') {
    return imgRegex.test(url.value);
  } else {
    return imgRegex.test(url);
  }
}
export { validateEmail, validatePassword, isImage, isValidUrl };
