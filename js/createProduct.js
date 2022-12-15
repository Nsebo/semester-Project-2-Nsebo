import { CREATE_LISTING_URL } from './settings/api';
import { getToken } from './utils/storage';

const createListingForm = document.querySelector('#create-listing-form');

const listingTitle = document.querySelector('#listingTitle');
const listDescription = document.querySelector('#listDescription');
const listTagOne = document.querySelector('#listTagOne');
const listTagTwo = document.querySelector('#listTagTwo');
const listTagThree = document.querySelector('#listTagThree');
const listImgOne = document.querySelector('#listImgOne');
const listImgTwo = document.querySelector('#listImgTwo');
const listImgThree = document.querySelector('#listImgThree');
const listingEndDate = document.querySelector('#listingEndDate');
const accessToken = getToken();

createListingForm.addEventListener('submit', function (event) {
  event.preventDefault();

  const listingTags = [listTagOne.value, listTagTwo.value, listTagThree.value];
  const listingImages = [listImgOne.value, listImgTwo.value, listImgThree.value];

  const listingData = {
    title: listingTitle.value.trim(),
    description: listDescription.value.trim(),
    tags: listingTags,
    media: listingImages.length > 0 ? listingImages : null,
    endsAt: listingEndDate.value,
  };
  console.log('listingData:', listingData);

  async function createListing() {
    const response = await fetch(CREATE_LISTING_URL, {
      method: 'POST',
      headers: {
        'content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(listingData),
    });
    console.log('list creation response:', response);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      console.log('CREATE LIST SUCCEEDED!!  🥳 🤗🤗');
      location.href = '/index.html';
    } else {
      const error = await response.json();
      console.log(error);
      console.log('list creation failed!!');
    }
    createListingForm.reset();
  }
  createListing();
});
