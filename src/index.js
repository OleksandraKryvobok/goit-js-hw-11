import './css/styles.css';
import { fetchImages } from './fetchImages';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
    searchForm: document.querySelector('#search-form'),
    gallery: document.querySelector('.gallery'),
    loadMoreBtn: document.querySelector('.load-more'),
};

let searchQuery = null;
let page = 1;

refs.searchForm.addEventListener('submit', onSearchFormSubmit);
refs.loadMoreBtn.addEventListener('click', onLoadMoreBtnClick);

function onSearchFormSubmit(e) {
    e.preventDefault();

    refs.gallery.innerHTML = '';
    page = 1;
    searchQuery = e.target.elements.searchQuery.value;

    getDataOfSearch(); 
}

function onLoadMoreBtnClick() {
    page += 1;
    getDataOfSearch();
}

async function getDataOfSearch() {
    try{
        const images = await fetchImages(searchQuery, page);

        createMarkup(images.hits);

        const btnHidden = images.hits.length !== 0 ? 
            refs.loadMoreBtn.classList.remove('is-hidden') : 
            refs.loadMoreBtn.classList.add('is-hidden');

        if(images.hits.length === images.totalHits && images.hits.length !== 0) {
            Notify.success("We're sorry, but you've reached the end of search results.");
            refs.loadMoreBtn.classList.add('is-hidden');
        }        
    } catch(error) {
        createError();
    }
}

function createMarkup(imgs) {
    if(imgs.length === 0) {
        Notify.failure('Sorry, there are no images matching your search query. Please try again.');
    } else {
        const cardMarkup = imgs.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
        <div class="photo-card">
            <a class="photo-link" href="${largeImageURL}">
                <img class="photo" src="${webformatURL}" alt="${tags}"  height="240" loading="lazy" />
            </a>
            <div class="info">
                <p class="info-item">
                    <b>Likes</b> ${likes}
                </p>

                <p class="info-item">
                    <b>Views</b> ${views}
                </p>

                <p class="info-item">
                    <b>Comments</b> ${comments}
                </p>

                <p class="info-item">
                    <b>Downloads</b> ${downloads}
                </p>
            </div>
        </div>
        `).join('');

        refs.gallery.insertAdjacentHTML('beforeend', cardMarkup);
    }
}

function createError() {
    console.log('ERROR');
}

