const searchButton = document.querySelector('.search-form');

async function searchFormHandler(event) {
    event.preventDefault();

    const search = document.querySelector('#search-field').value.trim();

    if(search) {
        document.location.replace(`/search/${search}`);
    }else{
        alert('Please enter a stock symbol before searching!');
    }
}

searchButton.addEventListener('submit', searchFormHandler);