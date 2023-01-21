const BASE_URL = 'https://pixabay.com/api/';
const API_KEY = '32998540-3a435d540a10188c3329fbaf2';
const PER_PAGE = 40;

export async function fetchImages(name, page) {
    const url = `${BASE_URL}?key=${API_KEY}&q=${name}&page=${page}&per_page=${PER_PAGE}&image_type=photo&orientation=horizontal&safesearch=true&fields=webformatURL,largeImageURL,tags,likes,views,comments,downloads`;
    const response = await fetch(url);
    
    if(!response.ok) {
        throw new Error(response.statusText);
    }

    const data = await response.json();

    return data;
}

