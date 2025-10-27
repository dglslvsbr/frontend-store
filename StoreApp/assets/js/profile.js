document.addEventListener('DOMContentLoaded', async () => {
    if (!token) return;

    if (!decodedToken) return;

    const client = await fetchClient(decodedToken.email);

    if (!client) return;

    const element = document.getElementById('client-data');

    const clientInfo = document.createElement('div');
    clientInfo.className = 'info';
    clientInfo.innerHTML = `
    <h1 style='margin-bottom: 20px'>Client</h1>
    <p><strong>First name:</strong> ${client.data.firstName}</p>
    <p><strong>Last name:</strong> ${client.data.lastName}</p>
    <p><strong>Email:</strong> ${client.data.email}</p>
    <p><strong>Phone:</strong> ${client.data.phone}</p>`;

    const addressInfo = document.createElement('div');
    addressInfo.className = 'info';
    addressInfo.innerHTML = `
    <h1 style='margin-bottom: 20px'>Address</h1>
    <p><strong>Street:</strong> ${client.data.address.street}</p>
    <p><strong>Number:</strong> ${client.data.address.number}</p>
    <p><strong>District:</strong> ${client.data.address.district}</p>
    <p><strong>City:</strong> ${client.data.address.city}</p>
    <p><strong>State:</strong> ${client.data.address.state}</p>`;

    const cardInfo = document.createElement('div');
    cardInfo.className = 'info';
    cardInfo.innerHTML = `
    <h1 style='margin-bottom: 20px'>Credit Card - Generated automatically</h1>
    <p><strong>Number:</strong> ${client.data.creditCard.number}</p>
    <p><strong>Expiration:</strong> ${convertData(client.data.creditCard.expiration)}</p>
    <p><strong>CVV:</strong> ${client.data.creditCard.cvv}</p>
    <p><strong>Used limit: </strong>${(client.data.creditCard.usedLimit).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>
    <p><strong>Max limit: </strong>${(client.data.creditCard.maxLimit).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</p>`;
    
    element.appendChild(clientInfo);
    element.appendChild(addressInfo);
    element.appendChild(cardInfo);
});