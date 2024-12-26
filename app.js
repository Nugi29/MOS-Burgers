// ========Store menu data=========

function displayMenuItems(category = 'all') {
    const storeCards = document.getElementById('store');
    storeCards.innerHTML = ''; // Clear previous cards

    const filteredItems = category === 'all'
        ? storeData.menuItems
        : storeData.menuItems.filter(item => item.category.toLowerCase() === category.toLowerCase());

    filteredItems.forEach(item => {
        const discountedPrice = item.price * (1 - item.discount / 100);

        let discountHTML = '';
        if (item.discount > 0) {
            discountHTML = `<p class="card-text" style="display: inline;"><strike>Rs.${item.price}</strike></p>`;

        }

        const cardHTML = `
        <div class="col col-md-4 col-lg-3">
            <div class="card">
                <div class="card-body">
                    <h4 class="card-title fs-4">${item.name}</h4>
                    <p class="card-category badge nav-pills text-bg-info ">${item.category}</p>
                    <hr>
                    ${discountHTML}
                    <h5 class="card-text text-bg-danger rounded-pill badge fs-6">
                        Rs.${discountedPrice.toFixed(2)}
                    </h5>
                    <p class="card-text badge rounded-pill text-bg-light">Exp: ${item.expireDate}</p>
                    <a class="card-text badge rounded-pill text-bg-warning nav-link "href="#" >
                        Stock: ${item.quantity}
                    </a>
                </div>
            </div>
        </div>
    `;

        storeCards.innerHTML += cardHTML;
    });
}
displayMenuItems('all');

document.getElementById('btnAddNewItem').addEventListener('click', function () {
    const newItemForm = document.getElementById('newItem');
    const bsModal = new bootstrap.Modal(newItemForm);
    bsModal.show();

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];

    document.getElementById('itemCode').value = '';
    document.getElementById('itemName').value = '';
    document.getElementById('itemPrice').value = '';
    document.getElementById('itemDiscount').value = 0.00;
    document.getElementById('itemQuantity').value = 0;
    document.getElementById('itemExpireDate').value = formattedDate;
    document.getElementById('itemCategory').value = Burgers;


    document.getElementById('btnsaveItem').addEventListener('click', function () {

        let Ncode = document.getElementById('itemCode').value;
        let Nname = document.getElementById('itemName').value;
        let Nprice = document.getElementById('itemPrice').value;
        let Ndiscount = document.getElementById('itemDiscount').value;
        let Nquantity = document.getElementById('itemQuantity').value;
        let NexpireDate = document.getElementById('itemExpireDate').value;
        let Ncategory = document.getElementById('itemCategory').value;

        var newItem = {
            code: Ncode,
            name: Nname,
            price: Nprice,
            discount: Ndiscount,
            quantity: Nquantity,
            expireDate: NexpireDate,
            category: Ncategory
        };

        storeData.menuItems.push(newItem);
        displayMenuItems('all');
        bsModal.hide();

    });

    document.getElementById('btnCancel').addEventListener('click', function () {
        bsModal.hide();
    });


});

// ============Order tab================
// Cart data
let cart = [];

// Function to render products
function renderProducts(filter = '') {
    const productsContainer = document.getElementById('productsGrid');
    productsContainer.innerHTML = ''; // Clear existing content

    const filteredProducts = filter 
        ? storeData.menuItems.filter(item => 
            item.category.toLowerCase() === filter.toLowerCase() || 
            item.name.toLowerCase().includes(filter.toLowerCase()))
        : storeData.menuItems;

    filteredProducts.forEach(product => {
        const discountedPrice = product.price - (product.price * product.discount / 100);
        const productHTML = `
            <div class="col-md-4">
                <div class="card mb-3">
                    <div class="card-body">
                        <h5 class="card-title">${product.name}</h5>
                        <p class="card-text">Category: ${product.category}</p>
                        <p class="card-text">Price: Rs. ${discountedPrice.toFixed(2)} 
                            ${product.discount > 0 ? `<span class="text-muted"><s>Rs. ${product.price.toFixed(2)}</s></span>` : ''}
                        </p>
                        <p class="card-text">In Stock: ${product.quantity}</p>
                        <button class="btn btn-primary" onclick="addToCart('${product.code}')">
                            Add to Cart
                        </button>
                    </div>
                </div>
            </div>`;
        productsContainer.innerHTML += productHTML;
    });
}

// Function to add product to the cart
function addToCart(productCode) {
    const product = storeData.menuItems.find(item => item.code === productCode);

    if (!product || product.quantity <= 0) {
        alert('This product is out of stock!');
        return;
    }

    const cartItem = cart.find(item => item.code === productCode);

    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ code: product.code, name: product.name, price: product.price, quantity: 1 });
    }

    product.quantity--;
    renderProducts(); // Update the product grid
    renderCart(); // Update the cart display
}

// Function to render cart
function renderCart() {
    const cartContainer = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    cartContainer.innerHTML = ''; // Clear existing content

    let total = 0;

    cart.forEach(item => {
        const subtotal = item.price * item.quantity;
        total += subtotal;

        const cartItemHTML = `
            <div>
                ${item.name} - Rs. ${item.price.toFixed(2)} x ${item.quantity} = Rs. ${subtotal.toFixed(2)}
                <button class="btn btn-sm btn-danger" onclick="removeFromCart('${item.code}')">Remove</button>
            </div>`;
        cartContainer.innerHTML += cartItemHTML;
    });

    cartSummary.innerHTML = `Total: Rs. ${total.toFixed(2)}`;
}

// Function to remove item from cart
function removeFromCart(productCode) {
    const cartItemIndex = cart.findIndex(item => item.code === productCode);

    if (cartItemIndex !== -1) {
        const cartItem = cart[cartItemIndex];
        const product = storeData.menuItems.find(item => item.code === productCode);

        product.quantity += cartItem.quantity; // Restore stock
        cart.splice(cartItemIndex, 1); // Remove item from cart
    }

    renderProducts(); // Update the product grid
    renderCart(); // Update the cart display
}

// Initial render
renderProducts();
renderCart();