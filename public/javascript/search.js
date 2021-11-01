const searchButton = document.querySelector('.search-form');

async function searchFormHandler(event) {
    event.preventDefault();

    const search = document.querySelector('#search-field').value.trim();

    if(search) {
        document.location.replace(`/api/stocks/${search}`);
    }
}

searchButton.addEventListener('submit', searchFormHandler);