import moment from 'moment';
import { getToken } from './utils/storage';

const now = moment(new Date());
console.log('now:', now);
const accessToken = getToken();
const postsContainer = document.querySelector('#posts-container');
console.log('postsContainer :', postsContainer);
const generalError = document.querySelector('#general-error');
console.log(generalError);

(async function getSellersPosts() {
  const response = await fetch(`https://api.noroff.dev/api/v1/auction/profiles/nsebo/listings`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log('response: ', response);
  if (response.ok) {
    const posts = await response.json();
    console.log('posts:', posts);
    if (!posts.length) {
      generalError.innerHTML = 'Sorry, there are currently no listings';
    } else {
      const listOfHtmlPosts = posts
        .map((myPost) => {
          console.log('posts:', myPost);
          const postTitle = myPost.title;
          const postDescription = myPost.description;
          const postMedia = myPost.media;
          const postEndsAt = myPost.endsAt;
          const postTags = myPost.tags;

          return `
            <li  class="group relative">
                    <div class="min-h-80 aspect-w-1 aspect-h-1 w-76 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                   <a href="single-listing.html?listing_id=${myPost.id}">
                        <img  class="h-full w-full object-cover object-center lg:h-full lg:w-full" src="${postMedia}">
                         </a>
                    </div>
                    <div class="mt-4 flex justify-between">
                        <div>
                            <h3 class="text-sm font-medium text-white">
                                <a href="#">${postTitle}</a>
                            </h3>
                            <p class="text-sm  text-gray-500">${postDescription}</p>
                            <p class="text-sm  text-gray-500"> ${postTags}</p>
                             <p class="text-sm text-gray-400"><ion-icon name="alarm-sharp"></ion-icon> ${postEndsAt}</p>
                        </div>
                    </div>
                </li>
       
           `;
        })
        .join('');
      postsContainer.insertAdjacentHTML('beforeend', listOfHtmlPosts);
    }
  } else {
    const err = await response.json();
    throw new Error(err);
  }
})().catch((err) => {
  console.log(err);
  console.log('get my post');
});
