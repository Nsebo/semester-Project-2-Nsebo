import '../style.css';
import { clearStorage } from './utils/storage';
import header from './components/header';

header();

const btn = document.querySelector('button.sidebar-open');
const menu = document.querySelector('.menu-responsive');
const buttonOpen = document.querySelector('.btn-open');
const buttonClose = document.querySelector('.btn-close');

btn.addEventListener('click', () => {
  menu.classList.toggle('hidden');
  formSearch.classList.toggle('hidden', true);
  buttonOpen.classList.toggle('hidden'), buttonClose.classList.toggle('hidden');
});

const buttonMenu = document.querySelector('button.search-menu');
const formSearch = document.querySelector('.search-form');

buttonMenu.addEventListener('click', () => {
  formSearch.classList.toggle('hidden');
});

var menuTwo = document.getElementById('menuTwo');
document.getElementById('toggleId').onclick = function () {
  toggleMenu();
};

function toggleMenu() {
  console.log('toggleMenu called');
  if (menuTwo.classList.contains('hidden')) {
    menuTwo.classList.remove('hidden');
  } else {
    menuTwo.classList.add('hidden');
  }
}

window.onclick = function (event) {
  var dropdownWrapper = document.getElementById('dropdown-wrapper');
  if (!dropdownWrapper.contains(event.target) && !menuTwo.classList.contains('hidden')) {
    menuTwo.classList.add('hidden');
  }
};

const logOutBtn = document.querySelector('#logOut');
if (logOutBtn) {
  logOutBtn.addEventListener('click', function () {
    console.log('I am clicked');
    clearStorage();
    window.location.replace('/login.html');
  });
}
