document.addEventListener('DOMContentLoaded', async () => {
    if (!decodedToken) return;

    const client = await fetchClient(decodedToken.email);

    if (!client) return;

    const cpf = document.getElementById('txt-cpf');
    cpf.value = client.data.cpf;
    const number = document.getElementById('txt-card-number');
    number.value = client.data.creditCard.number;
    const expiration = document.getElementById('txt-card-expiration');
    expiration.value = convertData(client.data.creditCard.expiration);
    const cvv = document.getElementById('txt-card-cvv');
    cvv.value = client.data.creditCard.cvv;

    const formPayment = document.getElementById('form-payment');

    const message = document.createElement('p');
    message.id = 'message';

    formPayment.appendChild(message);
});

window.onload = () =>
    document.getElementById("form-payment")
        .addEventListener("submit", (e) => e.preventDefault());

function getShoppingCart() {
    const shoppingCartArray = JSON.parse(localStorage.getItem('shopping-cart'));

    if (shoppingCartArray.length == 0) return;

    const productList = [];
    for (var product of shoppingCartArray)
        productList.push(
            {
                productId: product.id,
                quantity: product.quantity
            });
    return productList;
}

function getPaymentData() {
    const formData = new FormData(document.getElementById('form-payment'));

    if (!formData) return;
    
    const data = {
        cpf: formData.get('cpf'),
        number: formData.get('number'),
        expiration: convertDataISO8601(formData.get('expiration')),
        cvv: formData.get('cvv'),
        installments: parseInt(formData.get('installments'), 10)
    }
    return data;
}

async function processPayment() {
    const productList = getShoppingCart();

    if (!productList || productList.length === 0) {
        document.location.replace('main.html');
        return;
    }

    const paymentData = getPaymentData();

    const payload = {
        clientId: decodedToken.sub,
        productList: productList,
        paymentData: paymentData
    };

    try {
        const response = await fetch(API_URL + 'Order/Create', {
            method: 'POST',
            headers: {
                'Authorization': 'Bearer ' + token,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        let data;
        if (response.headers.get('content-type').includes('application/json') || '')
            data = await response.json();
        else 
            data = await response.text();

        if (response.ok) {
            localStorage.removeItem("shopping-cart");
            document.location.replace('order.html');
        }
        else {
            const element = document.getElementById('message');
            element.style = `margin: 20px;
                             padding: 5px;
                             color: red;
                             border: 1px solid red;
                             border-radius: 8px;`
            element.innerHTML = data;
        }
    } catch (error) {
        console.log(error);
    }
}

function cancelPurchase() {
    localStorage.removeItem('shopping-cart')
    document.location.replace('main.html');
}