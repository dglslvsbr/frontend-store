document.addEventListener("DOMContentLoaded", () => {
  const productData = localStorage.getItem("currentProduct");
  if (!productData) return;

  const currentProduct = JSON.parse(productData);

  const viewProduct = document.querySelector(".view-product");

  if (viewProduct) {
    viewProduct.class = currentProduct.id;
    viewProduct.innerHTML = `
      <p id='product-name'>${currentProduct.name}</p>
      <img src="${currentProduct.imageUrl}" alt="view-product">
      <p id='product-description'>${currentProduct.description}</p><br>
      <p style='font-size: 50px; color: #27ae60; margin-bottom: 10px;' id='product-price'>R$ ${currentProduct.price}</p>`;

    const labelQuantity = document.createElement('label');
    labelQuantity.htmlFor = 'select-quantity'
    labelQuantity.innerHTML = 'Quantity:<br>';

    const quantity = document.createElement('select');
    quantity.id = 'select-quantity';
    quantity.title = 'quantity';
    quantity.innerHTML = `<option name='1'>1</option>
                          <option name='2'>2</option>
                          <option name='3'>3</option>
                          <option name='4'>4</option>
                          <option name='5'>5</option>`
    quantity.style = `margin-top: 5px;
                      width: 300px;
                      height: 40px;
                      border-radius: 8px;
                      outline: none`;

    viewProduct.appendChild(labelQuantity);
    viewProduct.appendChild(quantity);

    const buy = document.createElement('button');
    buy.innerHTML = 'Buy Now';
    buy.type = 'button';
    buy.onclick = () => {
      addProductCart(currentProduct);
      document.location.href = 'payment.html'
    };

    const addToCart = document.createElement('button');
    addToCart.innerHTML = 'Add to cart'
    addToCart.type = 'button';
    addToCart.onclick = () => {
      addProductCart(currentProduct);
      setTimeout(() => {
        document.getElementById('global-cart').style.display = 'flex';
      }, 1);
      renderTheCart();
    };

    viewProduct.appendChild(buy);
    viewProduct.appendChild(addToCart);

    const message = document.createElement('p');
    message.id = 'message';
    viewProduct.appendChild(message);
  }

  const productList = JSON.parse(localStorage.getItem("categoryCache"));

  setTimeout(() => {
      showData(productList);
  }, 100);
});