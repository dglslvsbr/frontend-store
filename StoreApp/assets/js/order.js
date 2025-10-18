document.addEventListener('DOMContentLoaded', async () => {
    if (!token) return;

    if (!decodedToken) return;

    const client = await fetchClient(decodedToken.email);

    if (!client) return;

    const element = document.getElementById('order-list');

    client.data.order.forEach(order => {
        order.orderItem.forEach(orderItem => {
            const orderDiv = document.createElement('div');
            orderDiv.id = `${order.id}`
            orderDiv.className = 'order';
            orderDiv.innerHTML = `
            <p><strong>Order ID:</strong> ${order.id}</p>
            <img src='${orderItem.product.imageUrl}' alt='${orderItem.product.name}'></img>
            <p><strong>Date:</strong> ${convertData(order.creatAt)}</p>
            <p><strong>State:</strong> ${orderState(order.currentState)}</p>
            <p><strong>Installments:</strong> ${order.installments}x</p>
            <p><strong>Name:</strong> ${orderItem.product.name}</p>
            <p><strong>Price:</strong> R$ ${orderItem.product.price}</p>
            <p><strong>Quantity:</strong> ${orderItem.quantity}</p>`;
            element.appendChild(orderDiv);
        })
    });
});

function orderState(number) {
    switch (number) {
        case 0: return 'Processing';
        case 1: return 'Shipped';
        case 2: return 'Delivered';
        case 3: return 'Canceled';
    }
}