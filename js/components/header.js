import { clearStorage, getUserName, saveCredit } from '../utils/storage';

function header() {
  const { pathname } = document.location;
  const navBar = document.querySelector('#nav-bar');
  console.log(navBar);
}

export default header;
