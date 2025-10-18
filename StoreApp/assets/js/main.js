const currentCategoryId = "currentCategory";
const categoryCache = "categoryCache";

function currentProductCategory(categoryId) {
    localStorage.setItem(currentCategoryId, categoryId);
    window.location.replace('main.html');
}

window.addEventListener('DOMContentLoaded', () => {
    const currentCategory = parseInt(localStorage.getItem(currentCategoryId));

    switch (currentCategory) {
        case 0:
            getAllProducts();
            break;
        case 1:
            getProductsByCategory(1, 1, 10);
            break;
        case 2:
            getProductsByCategory(2, 1, 10);
            break;
        case 3:
            getProductsByCategory(3, 1, 10);
            break;
        case 4:
            getProductsByCategory(4, 1, 10);
            break;
        default:
            getAllProducts();
    }
});

async function getProductsByCategory(categoryId, pageNumber, pageSize) {
    document.getElementById('products-list').innerHTML = '';
    const cacheResponse = await getOrSetCache("CategoryCache/"+categoryId,
         API_URL + `Product/GetAllProductsByCategory/${categoryId}?pageNumber=${pageNumber}&pageSize=${pageSize}`);
    showData(cacheResponse);
}

async function getAllProducts() {
    document.getElementById('products-list').innerHTML = '';
    const cacheResponse = await getOrSetCache(categoryCache,
         API_URL + 'Product/GetAllPaginated?pageNumber=1&pageSize=20');
    showData(cacheResponse);
}

function showData(list) {
    const container = document.getElementById('products-list');

    for (const product of list.data) {
        const card = document.createElement('div');
        card.id = `${product.id}`
        card.className = 'product-card';
        card.innerHTML = `<h3>${product.name}</h3>
                          <img src='${product.imageUrl}' alt='${product.name}'>
                          <p class='product-price'>R$ ${product.price}</p>`;

        const viewProduct = document.createElement('button');
        viewProduct.innerHTML = 'View';
        viewProduct.type = 'button';
        viewProduct.onclick = () => {
            localStorage.setItem("currentProduct", JSON.stringify(product));
            window.location.replace('product.html')
        }
        card.appendChild(viewProduct);

        container.appendChild(card);
    }
}

function logout() {
    localStorage.clear();
    window.location.href = 'index.html';
}