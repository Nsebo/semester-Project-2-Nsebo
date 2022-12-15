import moment from 'moment';
import { getToken } from './utils/storage';
import { data } from 'autoprefixer';

const paramString = window.location.search;
const searchParam = new URLSearchParams(paramString);
const listingId = searchParam.get('listing_id');
console.log('listingId: ', listingId);
const accessToken = getToken();
const listingDetails = document.querySelector('#listing-container');
let now = moment();
let endDate = moment(data.endsAt);
let durationLeft = moment.duration(endDate.diff(now));
let secondsLeft = durationLeft.asSeconds();
let minutesLeft = durationLeft.asMinutes();
let hoursLeft = durationLeft.asHours();
let daysLeft = durationLeft.asDays();

async function getListById() {
  const response = await fetch(`https://api.noroff.dev/api/v1/auction/listings/${listingId}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  if (!accessToken) {
    location.href = '/login.html';
  }
  console.log(response);
  const data = await response.json();
  const title = data.title;
  const id = data.id;
  const desc = data.description;
  const bids = data._count.bids;
  const media = data.media[0];
  const endsAt = data.endsAt;
  const tags = data.tags;

  listingDetails.innerHTML = `
  
<li class="group relative">
                    <a href="/single-listing.html?listings_id=${id.id}">
                        <img  class=" w-full rounded-t-lg h-96 md:h-auto md:w-96 md:rounded md:rounded-l-lg" src="${media}" alt="">
                         </a>
                    <div class="mt-4 flex justify-between">
                        <div>
                            <h3 class="text-sm font-medium text-white">
                                <a href="#">${title}</a>
                            </h3>
                             <p class="text-sm  text-gray-500">Title:${desc}</p>
                             <p class="text-sm  text-white"><ion-icon name="pricetags-sharp"></ion-icon> Tags:${tags}</p>
                             <p class="text-sm text-gray-400"><ion-icon name="alarm-sharp"></ion-icon> ${endsAt}</p>
                                <p class="text-medium  text-white"> <ion-icon name="flag-sharp"></ion-icon> ${bids} </p>
                        </div>
                    </div>  
                      <div class="flex gap-4">
             <button 
             data-id="${id.id}"
             class="delete-post-btn  block bg-red-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-red-500 focus:outline-none focus:bg-red-500 focus:text-black focus:border-gray-500">
             Delete
            </button>
            <a href="/edit-post.html?post_id=${id.id}" class="block bg-yellow-600 text-gray-100 font-bold border border-gray-200 rounded-lg py-3 px-3 leading-tight hover:bg-yellow-500 focus:outline-none focus:bg-yellow-500 focus:text-black focus:border-gray-500">Edit</a>
            </div>
                     </li>
    `;
}
getListById();

const bidBtn = document.querySelector('#bid-btn');
const myBid = document.querySelector('#my-modal');
const biddingForm = document.querySelector('#bidding-form');
const listingBidInput = document.querySelector('#listing-bid-input');

bidBtn.addEventListener('click', () => {
  biddingForm.style.display = 'block';
});

biddingForm.addEventListener('submit', function (event) {
  event.preventDefault();
  console.log('listingBidInput', listingBidInput.value);

  const amountToBid = {
    amount: parseInt(listingBidInput.value),
  };

  async function bidOnList() {
    const response = await fetch(`https://api.noroff.dev/api/v1/auction/listings/${listingId}/bids`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify(amountToBid),
    });
    console.log('bid on list response: ', response);
    if (response.ok) {
      const data = await response.json();
      console.log(data);
      console.log('Bid on a list SUCCEEDED!!  🥳 🤗🤗');
    } else {
      const err = await response.json();
      console.log(err);
      console.log('CREATE LIST FAILED');
    }
    biddingForm.reset();
  }

  bidOnList();
});
