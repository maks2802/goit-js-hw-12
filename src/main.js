import { fetchImages } from './js/pixabay-api.js';
import { renderGallery } from './js/render-functions.js';
import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

let lightbox;
let query = '';
let page = 1;
const perPage = 15;

const form = document.querySelector('#search-form');
const loadMoreBtn = document.getElementById('load-more');
const gallery = document.querySelector('.gallery');

form.addEventListener('submit', onSearch);
loadMoreBtn.addEventListener('click', loadMoreImages);

async function onSearch(event) {
  event.preventDefault();
  query = event.target.elements.searchQuery.value.trim();
  page = 1;

  if (!query) {
    iziToast.warning({
      title: "Warning",
      message: "Please enter a search query.",
      position: "topRight",
    });
    return;
  }

  clearGallery();
  loadMoreBtn.style.display = 'none';

  await fetchAndRenderImages();
}

async function fetchAndRenderImages() {
  showLoadingIndicator();

  try {
    const { hits, totalHits } = await fetchImages(query, page, perPage);
    if (hits.length === 0) {
      iziToast.error({
        title: "Error",
        message: "Sorry, no images match your search query. Please try again.",
        position: "topRight",
      });
      return;
    }

    renderGallery(hits);
    initLightbox();

    if (page > 1) {
      scrollPage();
    }

    if (page * perPage < totalHits) {
      loadMoreBtn.style.display = 'block';
    } else {
      iziToast.info({
        title: "Info",
        message: "We're sorry, but you've reached the end of search results.",
        position: "topRight",
      });
      loadMoreBtn.style.display = 'none';
    }
  } catch (error) {
    iziToast.error({
      title: "Error",
      message: "Something went wrong. Please try again later.",
      position: "topRight",
    });
    console.error(error);
  } finally {
    hideLoadingIndicator();
  }
}

async function loadMoreImages() {
  page += 1;
  await fetchAndRenderImages();
}

function clearGallery() {
  gallery.innerHTML = '';
}

function initLightbox() {
  if (lightbox) lightbox.destroy();
  lightbox = new SimpleLightbox('.gallery-item', { captionsData: 'alt', captionDelay: 250 });
}

function scrollPage() {
  const { height: cardHeight } = gallery.firstElementChild.getBoundingClientRect();
  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

function showLoadingIndicator() {
  const indicator = document.getElementById('loading-indicator');
  indicator.style.display = 'block';
  loadMoreBtn.style.display = 'none';
}

function hideLoadingIndicator() {
  const indicator = document.getElementById('loading-indicator');
  indicator.style.display = 'none';
  loadMoreBtn.style.display = 'block';
}