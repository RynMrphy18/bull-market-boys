// this is the front end javascript file to handle the buying and selling of stocks
const tradeForm = document.querySelector('.trade-form');

async function tradeFormHandler(event) {
    event.preventDefault();

    const type = document.querySelector('#type').value.trim();
    const quantity = document.querySelector('#quantity').value.trim();
    const symbol = document.querySelector('#symbol').textContent.trim();
    const price = document.querySelector('#price').textContent.trim();

    const cost = parseInt(quantity) * parseFloat(price);

    // making sure that the quantity is greater than 0
    if(type && quantity > 0){
        fetch('/api/holdings/', {
            method: 'post',
            body: JSON.stringify({
                symbol,
                quantity,
                type,
                cost
            }),
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            if(response.ok){
                return document.location.replace('/dashboard/');
            }
            return alert(response.statusText);
        });
    }
}

tradeForm.addEventListener('submit', tradeFormHandler);