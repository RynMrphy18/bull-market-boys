// this is the front end javascript file to handle the buying and selling of stocks
const tradeForm = document.querySelector('.trade-form');

async function tradeFormHandler(event) {
    event.preventDefault();

    const type = document.querySelector('#type').value.trim();
    const quantity = document.querySelector('#quantity').value.trim();
    // const symbol = document.querySelector('').value.trim();
    // const cost = quantity * price;

    if(type && quantity != 0){
        if(type === 'buy'){
            // fetch the users money
            const response = await fetch('', {
                method: 'post',
                body: JSON.stringify({
                    symbol,
                    cost,
                    username,
                    password
                }),
                headers: { 'Content-Type': 'application/json' }
            });
            // if the user money is greater than cost
                // holding.create()
            // else
                // alert('You do not have the funds required to make this purchase.');
        }
    }
}

tradeForm.addEventListener('submit', tradeFormHandler);