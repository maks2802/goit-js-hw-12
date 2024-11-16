export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');
  const markup = images.map(image => createCardMarkup(image)).join('');
  gallery.insertAdjacentHTML('beforeend', markup);
}

function createCardMarkup({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) {
  return `
    <a class="gallery-item" href="${largeImageURL}">
      <div class="gallery-card">
        <img src="${webformatURL}" alt="${tags}" loading="lazy" class="gallery-image"/>
        <div class="gallery-info">
          <p class="gallery-info-item"><span class="gallery-info-bold">Likes</span> <br />${likes}</p>
          <p class="gallery-info-item"><span class="gallery-info-bold">Views</span> <br />${views}</p>
          <p class="gallery-info-item"><span class="gallery-info-bold">Comments</span> <br />${comments}</p>
          <p class="gallery-info-item"><span class="gallery-info-bold">Downloads</span> <br />${downloads}</p>
        </div>
      </div>
    </a>
  `;
}