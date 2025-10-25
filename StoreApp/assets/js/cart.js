document.addEventListener('click', function (event) {
  const cart = document.getElementById('global-cart');
  const btnCart = document.getElementById('btn-cart');

  if (!cart.contains(event.target) &&
    !btnCart.contains(event.target) &&
    !window.location.pathname.includes('payment.html'))
    cart.style.display = 'none';
});

function addProductCart(currentProduct) {
  currentProduct.quantity = document
    .getElementById('select-quantity').value;

  const cartArray = JSON.parse(localStorage.getItem("shopping-cart")) || [];

  const exist = cartArray.some(p => p.id === currentProduct.id);

  if (!exist) {
    cartArray.push(currentProduct);
    localStorage.setItem("shopping-cart", JSON.stringify(cartArray));
    message("The Product was added in the cart", true);
  } else {
    message("This Product is already in the cart", false);
  }
}

function message(text, exist) {
  const element = document.getElementById('message');
  if (exist) {
    element.innerHTML = text;
    element.style = `font-size: 20px;
                     margin: 30px;
                     color: green;
                     border: 1px solid green;
                     border-radius: 8px;`
  }
  else {
    element.innerHTML = text;
    element.style = `font-size: 20px;
                     margin: 30px;
                     color: red;
                     border: 1px solid red;
                     border-radius: 8px;`
  }
}

function cartVisibility() {
  const menu = document.getElementById('global-cart');

  if (menu.style.display === 'none') {
    menu.style.display = 'flex';
    renderTheCart();
  }

  else 
    menu.style.display = 'none';
}

function renderTheCart() {
  const cartList = document.getElementById('global-cart');

  cartList.innerHTML = '';

  cartList.innerHTML = `<h3 style="color: #fff;
                        font-size: 40px; text-align: center;">Cart</h3>
                        <p id="total-cart" style="color: #27ae60;
                        font-size: 20px; text-align: center;">Total: R$ 0,00</p>`

  if (JSON.parse(localStorage.getItem('shopping-cart')).length > 0){
    cartList.innerHTML += `<input id='complete-purchase'
                           type='button' value='Complete Purchase'
                           onclick="completePayment()">
                           <input id='clear-cart'
                           type='button' value='Clear Cart'
                           onclick="clearCart()">`
  }

  const productListJson = JSON.parse(localStorage.getItem("shopping-cart"));

  for (const product of productListJson) {
    cartList.innerHTML += `<div class='${product.id}'>
                              <p>${product.name}</p>
                              <img src='${product.imageUrl}' alt='product-image'></img>
                              <p id='${product.id}' style='color:#27ae60'><strong>${product.price.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</strong></p>
                              <input class='remove-product' type='button'
                              value='Remove' onclick='removeProductCart(${product.id})'
                              style='margin-bottom: 100px'>
                              <input class='quantity-product' type='number'
                              min='1' max='5' placeholder='Quantity'
                              onkeydown='return false;' value='${product.quantity}'
                              onclick='refreshProductQuantity
                              (this.value,${product.id})'>
                           </div>`
  }
}

function completePayment() {
  if (!document.location.pathname.includes('payment.html'))
    document.location.replace('payment.html')
}

function clearCart(){
  localStorage.removeItem('shopping-cart')
  renderTheCart();
}

setInterval(() => refreshTotalCart(), 100);

function refreshTotalCart() {
  const shoppingCart = JSON.parse(localStorage.getItem('shopping-cart')) || [];
  const totalCartElement = document.getElementById('total-cart');
  if (!totalCartElement) return;

  let sumCart = 0;
  for (const p of shoppingCart)
    sumCart += parseFloat(p.price * p.quantity);

  totalCartElement.innerHTML = `<strong>${sumCart.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</strong>`;
}

function refreshProductQuantity(productQuantity, productId) {
  const shoppingCart = JSON.parse(localStorage.getItem('shopping-cart')) || [];
  if (!shoppingCart) return;

  const productById = shoppingCart.find(p => p.id == productId);
  if (!productById) return;

  const productPrice = document.getElementById(`${productId}`);
  if (!productPrice) return;

  productPrice.innerHTML = `<strong>${(productById.price * productQuantity).toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}</strong>`
  productById.quantity = productQuantity;

  const shoppingCartUpdated = shoppingCart.filter(p => p.id != productId);
  shoppingCartUpdated.push(productById);

  localStorage.setItem('shopping-cart', JSON.stringify(shoppingCartUpdated));

  document.getElementById('select-quantity').value =
    document.getElementsByClassName('quantity-product')[0].value;
}

function removeProductCart(id) {
  const shoppingCart = JSON.parse(localStorage.getItem('shopping-cart'));
  if (!shoppingCart) return;
  const shoppingCartUpdated = shoppingCart.filter(p => p.id != id);
  localStorage.setItem('shopping-cart', JSON.stringify(shoppingCartUpdated));
  setTimeout(() => renderTheCart(), 100)
}