document.addEventListener('click', function (event) {
  const cart = document.getElementById('global-cart');
  const btnCart = document.getElementById('btn-cart');

  if (!cart.contains(event.target) &&
    !btnCart.contains(event.target))
    cart.style.display = 'none';
});

function addProductCart(currentProduct) {
  currentProduct.quantity = document.getElementById('select-quantity').value;
  let cartArray;

  try {
    cartArray = JSON.parse(localStorage.getItem("shopping-cart"));
    if (!Array.isArray(cartArray)) {
      cartArray = [];
    }
  } catch (e) {
    cartArray = [];
  }

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
    element.style = `margin: 30px;
                     color: green;
                     border: 1px solid green;
                     border-radius: 8px;`
  }
  else {
    element.innerHTML = text;
    element.style = `margin: 30px;
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
                        <p id="total-cart" style="color: #fff;
                        font-size: 20px; text-align: center;">Total: R$ 0,00</p>`

  const productListJson = JSON.parse(localStorage.getItem("shopping-cart"));

  for (const product of productListJson) {
    cartList.innerHTML += `<div class='${product.id}'>
                              <p>${product.name}</p>
                              <img src='${product.imageUrl}' alt='product-image'></img>
                              <p>R$ ${product.price}</p>
                              <input class='remove-product' type='button'
                              value='Remove' onclick='removeProductCart(${product.id})'
                              style='margin-bottom: 100px'>
                              <input class='quantity-product' type='number'
                              min='1' max='5' placeholder='Quantity'
                              onkeydown='return false;' value='${product.quantity}'
                              onchange='refreshProductQuantity
                              (this.value,${product.id})'>
                           </div>`
  }
  sumProductsInTheCart(productListJson);
}

function refreshProductQuantity(productQuantity, productId) {
  const shoppingCart = JSON.parse(localStorage.getItem('shopping-cart'));
  if (!shoppingCart) return;

  const productById = shoppingCart.find(p => p.id == productId);
  if (!productById) return;

  productById.quantity = productQuantity;

  const shoppingCartUpdated = shoppingCart.filter(p => p.id != productId);
  shoppingCartUpdated.push(productById);

  localStorage.setItem('shopping-cart', JSON.stringify(shoppingCartUpdated));

  document.getElementById('select-quantity').value =
  document.getElementsByClassName('quantity-product')[0].value;
}

function removeProductCart(id){
  const shoppingCart = JSON.parse(localStorage.getItem('shopping-cart'));
  if (!shoppingCart) return;
  const shoppingCartUpdated = shoppingCart.filter(p => p.id != id);
  localStorage.setItem('shopping-cart', JSON.stringify(shoppingCartUpdated));
  setTimeout(() => renderTheCart(), 100)
}

function sumProductsInTheCart(productList) {
  if (!productList)
    return;

  let sum = 0.0;
  for (const product of productList)
    sum += product.price

  const totalCart = document.getElementById('total-cart');
  totalCart.style.color = 'green'
  totalCart.innerHTML = `Total: R$ ${sum}`;
}