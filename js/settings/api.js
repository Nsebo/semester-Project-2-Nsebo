import { getUserName } from '../utils/storage';

const { name, email } = getUserName();

const API_BASE_URL = 'https://api.noroff.dev';
const CREATE_USER_URL = API_BASE_URL + '/api/v1/auction/auth/register';
const LOGIN_USER_URL = API_BASE_URL + '/api/v1/auction/auth/login';
const CREATE_LISTING_URL = API_BASE_URL + '/api/v1/auction/listings';
const GET_LISTINGS_BY_ID_URL = API_BASE_URL + `/api/v1/auction/listings/bids`;
const GET_ALL_POSTS_URL = API_BASE_URL + '/api/v1/auction/listings';
const GET_PROFILE_URL = API_BASE_URL + `/api/v1/auction/profiles/${name}`;
const CHANGE_AVATAR_URL = API_BASE_URL + `api/v1/auction/profiles/${name}/media`;
const USER_BIDS_API_URL = API_BASE_URL + `/api/v1/auction/profiles/${name}/bids?_listings=true`;

export {
  API_BASE_URL,
  CREATE_USER_URL,
  LOGIN_USER_URL,
  CREATE_LISTING_URL,
  GET_LISTINGS_BY_ID_URL,
  GET_ALL_POSTS_URL,
  GET_PROFILE_URL,
  CHANGE_AVATAR_URL,
  USER_BIDS_API_URL,
};
