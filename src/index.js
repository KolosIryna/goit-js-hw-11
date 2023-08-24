import { imgParams } from './js/pixabay';
import Notiflix from 'notiflix';
// Описаний в документації
import SimpleLightbox from 'simplelightbox';
// Додатковий імпорт стилів
import 'simplelightbox/dist/simple-lightbox.min.css';

const form = document.querySelector('.search-form');
const btnSubmit = document.querySelector('button');
const gallery = document.querySelector('.gallery');
const buttonLoadMore = document.querySelector('.load-more');

let totalImg = 0;
let page = 1;
const perPage = 40;

const lightbox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});
//Шаблон розмітки картки одного зображення для галереї
function cardMarking(arr) {
  return arr
    .map(
      ({
        webformatURL,
        largeImageURL,
        tags,
        likes,
        views,
        comments,
        downloads,
      }) => {
        return `<div class="photo-card">
        <a href="${largeImageURL}">
          <img src="${webformatURL}" alt="${tags}" loading="lazy" width="360px"/>
        </a>
        <div class="info">
          <p class="info-item">
          <b>Likes: ${likes}</b>
          </p>
          <p class="info-item">
            <b>Views: ${views}</b>
          </p>
          <p class="info-item">
            <b>Comments: ${comments}</b>
          </p>
          <p class="info-item">
            <b>Downloads: ${downloads}</b>
          </p>
          </div>
        </div>`;
      }
    )
    .join(' ');
}

function onError() {
  Notiflix.Report.failure(
    'Opss',
    'Sorry, there are no images matching your search query. Please try again.'
  );
}

function isLastPage() {
  return totalImg === page;
}

function checkLastPage() {
  if (isLastPage()) {
    buttonLoadMore.classList.add('is-hidden');
    Notiflix.Notify.warning(
      "We're sorry, but you've reached the end of search results."
    );
  }
}

async function loadImages() {
  try {
    const searchValue = form.elements.searchQuery.value;
    const data = await imgParams(searchValue, page);

    if (data.hits.length === 0) {
      onError();
      return;
    }

    const markup = cardMarking(data.hits);
    gallery.insertAdjacentHTML('beforeend', markup);

    lightbox.refresh();

    totalImg = data.totalHits;
    page += 1;

    checkLastPage();
  } catch (error) {
    console.error('Error loading images:', error);
  }
}

form.addEventListener('submit', event => {
  event.preventDefault();
  gallery.innerHTML = '';
  page = 1;
  loadImages();
  buttonLoadMore.classList.add('is-hidden');
});

buttonLoadMore.addEventListener('click', loadImages);
