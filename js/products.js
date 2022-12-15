import { GET_ALL_POSTS_URL } from './settings/api';
import { getToken } from './utils/storage';

const postsContainer = document.querySelector('#posts-container');
console.log('postsContainer :', postsContainer);
const generalError = document.querySelector('#general-error');
console.log(generalError);
const accessToken = getToken();

async function getAllPosts(searchParams) {
  const response = await fetch(GET_ALL_POSTS_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  });
  console.log('response: ', response);
  if (response.ok) {
    let posts = await response.json();
    let searchPosts = [];
    let listOfHtmlPosts;
    if (searchParams) {
      console.log('searchParam:', searchParams);
      searchPosts = posts.filter(
        (x) =>
          x.description?.toLowerCase().includes(searchParams.toLowerCase()) ||
          x.title?.toLowerCase().includes(searchParams.toLowerCase())
      );
      posts = [];
      posts = searchPosts;
      console.log('my posts:', posts);
      const data = displayPosts(searchPosts);
      postsContainer.insertAdjacentHTML('beforeend', data);
      console.log('listOfHtmlPosts: ', data);
      return;
    } else {
      const data = displayPosts(posts);
      postsContainer.insertAdjacentHTML('beforeend', data);
      console.log('listOfHtmlPosts: ', posts);
    }

    return;
  } else {
    const err = await response.json();
    throw new Error(err);
  }
}

document.getElementById('sort-products').addEventListener('change', function () {
  var sorting = document.getElementById('sort-products').value;
  console.log(sorting);
  console.log('getAllPosts:', getAllPosts);
});

function displayPosts(arr) {
  if (arr && arr.length > 0) {
    return arr
      .map((post) => {
        const postTitle = post.title;
        const postDescription = post.description;
        const postMedia = post.media[0];
        const postEndsAt = post.endsAt;
        const postTags = post.tags;
        const bids = post._count.bids;

        return `
                <li  class="group relative">
                        <div class="min-h-80 aspect-w-1 aspect-h-1 w-76 overflow-hidden rounded-md bg-gray-200 group-hover:opacity-75 lg:aspect-none lg:h-80">
                       <a href="single-listing.html?listing_id=${post.id}">
                            <img   class="h-full w-full object-cover object-center lg:h-full lg:w-full" src="${postMedia}" alt="">
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
                                <p class="text-medium  text-white"> <ion-icon name="flag-sharp"></ion-icon> ${bids} </p>
                            </div>
                        </div>
                  <a href="single-listing.html?listing_id=${post.id}" class="justify-center capitalize inline-flex items-center rounded-md border border-transparent bg-black px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-black focus:outline-none focus:ring-2 focus:ring-black focus:ring-offset-2">
        BID</a>
                    </li>
               `;
      })
      .join('');
  }
  return null;
}

window.onload = function (event) {
  var searchParam = document.getElementById('search').value;
  getAllPosts(searchParam).catch((err) => {
    console.log(err);
    console.log('get all post');
  });
};

document.getElementById('searchBtn').addEventListener('click', function () {
  var searchParam = document.getElementById('search').value;
  displayPosts([]);
  console.log('searchParam:', searchParam);
  if (searchParam) {
    document.getElementById('posts-container').innerHTML = '';

    getAllPosts(searchParam);
  } else {
    getAllPosts();
  }
});
