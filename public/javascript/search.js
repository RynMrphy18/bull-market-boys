const searchButton = document.querySelector('.search-form');

async function searchFormHandler(event) {
    event.preventDefault();

    const search = document.querySelector('#search-field').value.trim();

    if(search) {
        const response = await fetch('/api/stocks', {
            method: 'post',
            body: JSON.stringify({
                search
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if(response.ok){
            // take the user to the individual stock page for the stock they searched
            // document.location.replace('/dashboard/');
        }else{
            alert(response.statusText);
        }
    }
}

searchButton.addEventListener('submit', searchFormHandler);