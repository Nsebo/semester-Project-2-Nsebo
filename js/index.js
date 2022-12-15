import moment from 'moment';
import { GET_ALL_POSTS_URL } from './settings/api';
import { getToken } from './utils/storage';

const now = moment(new Date());
console.log('now:', now);

const postsContainer = document.querySelector('#posts-container');
console.log('postsContainer :', postsContainer);
const generalError = document.querySelector('#general-error');
console.log(generalError);
const accessToken = getToken();

(async function getAllPosts() {
  const response = await fetch(GET_ALL_POSTS_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log('response: ', response);
  if (response.ok) {
    const posts = await response.json();

    const newPost = posts.splice(0, 8);
    console.log('my posts:', newPost);
    const listOfHtmlPosts = newPost
      .map((items) => {
        console.log('my posts:', items);
        const postTitle = items.title;
        const postDescription = items.description;
        const postMedia = items.media[0];
        const postEndsAt = items.endsAt;
        const postTags = items.tags;
        const bids = items._count.bids;

        return `
            <li  class="group relative">
                    <div class="min-h-80 aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                   <a href="single-listing.html?listing_id=${items.id}">
                        <img   class="h-full w-full object-cover object-center lg:h-full lg:w-full" src="${postMedia}" alt="">
                         </a>
                   
                    </div>
                    <div class="mt-4 flex justify-between">
                        <div>
                            <h3 class="text-sm font-medium text-black">
                                <a href="#">${postTitle}</a>
                            </h3>
                            <p class="text-sm  text-gray-500">${postDescription}</p>
                            <p class="text-sm  text-gray-500"> ${postTags}</p>
                            <p class="text-sm text-gray-400"><ion-icon name="alarm-sharp"></ion-icon>  ${postEndsAt}</p>
                             <p class="text-medium  text-white"> <ion-icon name="flag-sharp"></ion-icon> ${bids}</p>
                        </div>
                    </div>
                </li>
           `;
      })
      .join('');
    postsContainer.insertAdjacentHTML('beforeend', listOfHtmlPosts);
    console.log('listOfHtmlPosts: ', listOfHtmlPosts);
  } else {
    const err = await response.json();
    throw new Error(err);
  }
})().catch((err) => {
  console.log(err);
  console.log('get 8 posts');
});

// set the default active slide to the first one
let slideIndex = 1;
showSlide(slideIndex);

// change slide with the prev/next button

document.getElementById('moveSlidePlus').addEventListener('click', function () {
  showSlide((slideIndex += 1));
});
document.getElementById('moveSlideMinus').addEventListener('click', function () {
  showSlide((slideIndex += -1));
});

// change slide with the dots
function currentSlide(n) {
  showSlide((slideIndex = n));
}

function showSlide(n) {
  let i;
  const slides = document.getElementsByClassName('slide');
  const dots = document.getElementsByClassName('dot');

  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }

  // hide all slides
  for (i = 0; i < slides.length; i++) {
    slides[i].classList.add('hidden');
  }

  // remove active status from all dots
  for (i = 0; i < dots.length; i++) {
    dots[i].classList.remove('bg-cyan-500');
    dots[i].classList.add('bg-slate-500');
  }

  // show the active slide
  slides[slideIndex - 1].classList.remove('hidden');

  // highlight the active dot
  dots[slideIndex - 1].classList.remove('bg-slate-500');
  dots[slideIndex - 1].classList.add('bg-cyan-500');
}
