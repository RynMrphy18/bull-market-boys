// this is the front end javascript file to handle the buying and selling of stocks
const tradeForm = document.querySelector('.trade-form');

async function tradeFormHandler(event) {
    event.preventDefault();

    const type = document.querySelector('#type').value.trim();
    const quantity = document.querySelector('#quantity').value.trim();

    // symbol is hardcoded in right now but needs to be variable!
    const symbol = 'APPL';

    // const cost = quantity * price;

    // making sure that the quantity is greater than 0
    if(type && quantity > 0){
        const order = await fetch('/api/holdings/', {
            method: 'post',
            body: JSON.stringify({
                symbol,
                quantity,
                type
            }),
            headers: { 'Content-Type': 'application/json' }
        });
    }
}

tradeForm.addEventListener('submit', tradeFormHandler);