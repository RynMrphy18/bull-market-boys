const searchButton = document.querySelector('.search-form');

async function searchFormHandler(event) {
    event.preventDefault();

    const search = document.querySelector('#search-field').value.trim();

    validate(search);

    if(validate(search)) {
        document.location.replace(`/search/${search}`);
    }else{
        alert('Please enter a valid stock symbol!');
    }

    function validate(search){
        // loop through the characters in the string
        for(let i=0; i<search.length; i++){
            let char = search.charAt(i);
            // test is character is within a-z
            if(/^[a-zA-Z]+$/.test(char))
                return false;
            }
        return true;
    }
}

searchButton.addEventListener('submit', searchFormHandler);