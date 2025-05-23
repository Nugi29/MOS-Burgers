// Initialize global variables
let customers = JSON.parse(localStorage.getItem('customers')) || [];
let items = [];
let cart = [];
let orders = [];

// Load items from JSON file or localStorage
function loadItemsFromJSON() {
    return new Promise((resolve, reject) => {
        if (localStorage.getItem('items')) {
            items = JSON.parse(localStorage.getItem('items'));
            resolve(items);
        } else {
            fetch('menu-data.json')
                .then(response => response.json())
                .then(data => {
                    items = data;
                    localStorage.setItem('items', JSON.stringify(items));
                    resolve(items);
                })
                .catch(error => {
                    console.error('Error loading items:', error);
                    reject(error);
                });
        }
    });
}

// Load orders from sessionStorage
function loadOrders() {
    try {
        orders = JSON.parse(sessionStorage.getItem('orders')) || [];
    } catch (error) {
        console.error('Error loading orders:', error);
        orders = [];
    }
}

// Save orders to sessionStorage
function saveOrders() {
    sessionStorage.setItem('orders', JSON.stringify(orders));
}

// Populate customer dropdown
function populateCustomerDropdown() {
    const customerSelect = document.getElementById('existingCustomer');
    customerSelect.innerHTML = '<option value="">-- Select a customer --</option>';
    customers.forEach((customer, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.textContent = `${customer.name} (${customer.phone})`;
        customerSelect.appendChild(option);
    });
}

// Fill customer information on selection
function fillCustomerInfo() {
    const selectedIndex = document.getElementById('existingCustomer').value;
    if (selectedIndex !== "") {
        const customer = customers[selectedIndex];
        document.getElementById('customerName').value = customer.name;
        document.getElementById('contactNo').value = customer.phone;
    } else {
        document.getElementById('customerName').value = '';
        document.getElementById('contactNo').value = '';
    }
}

// Render menu items dynamically
function renderMenu(filterItems) {
    const menuContent = document.getElementById('menuGrid');
    menuContent.innerHTML = '';
    filterItems.forEach((item, index) => {
        const card = document.createElement('div');
        card.classList.add('col-md-4', 'col-sm-6', 'mb-3');
        card.innerHTML = `
        <div class="card border-secondary mb-3" style="max-width: 18rem;">
            <div class="card-header fw-bold">${item.category}</div>
            <div class="card-body text-secondary text-center">
                <h5 class="card-title text-primary fw-bold fs-4">${item.name}</h5>
                <p class="card-text text-warning fw-bold fs-5">Rs.${item.price.toFixed(2)}</p>
                <p class="text-muted small">Stock: ${item.quantity} | Exp: ${item.expireDate}</p>
                <button class="btn btn-outline-success w-100 mt-3" onclick="addToCart(${index})">
                    <i class="bi bi-cart-plus"></i> Add to Cart
                </button>
            </div>
        </div>
        `;
        menuContent.appendChild(card);
    });
}

// Filter menu by category
function filterCategory(category) {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.classList.toggle('active', btn.textContent === category);
    });

    if (category === 'All' || category === '') {
        renderMenu(items);
    } else {
        renderMenu(items.filter(item => item.category === category));
    }
}

// Add item to cart
function addToCart(index) {
    const item = items[index];
    const cartItem = cart.find(cartItem => cartItem.code === item.code);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...item, quantity: 1 });
    }
    renderCart();
}

// Update cart count
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    const totalItems = cart.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
    cartCount.textContent = totalItems;
}

// Calculate raw total price (no discount)
function calculateRawTotal() {
    return cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
}

// Calculate total price with discount
function calculateTotal() {
    const rawTotal = calculateRawTotal();
    const discount = parseFloat(document.getElementById('discount').value) || 0;
    return Math.max(0, rawTotal - discount);
}

// Update displayed totals
function updateTotals() {
    const rawTotal = calculateRawTotal();
    const discountedTotal = calculateTotal();
    
    document.getElementById('totalPrice').textContent = rawTotal.toFixed(2);
    document.getElementById('totalWithDiscount').textContent = discountedTotal.toFixed(2);
}

// Render cart items
function renderCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    
    cart.forEach((cartItem, index) => {
        const cartItemElem = document.createElement('div');
        cartItemElem.classList.add('cart-item');
        cartItemElem.innerHTML = `
            <div>
                <span>${cartItem.name} - Rs.${cartItem.price.toFixed(2)}</span>
                <input type="number" class="form-control d-inline-block w-25 ms-2" value="${cartItem.quantity}" min="1" onchange="updateQuantity(${index}, this.value)">
                <button class="btn btn-danger ms-2" onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
        cartItems.appendChild(cartItemElem);
    });
    
    updateTotals();
    updateCartCount();
}

// Update cart item quantity
function updateQuantity(index, quantity) {
    cart[index].quantity = Math.max(1, parseInt(quantity));
    renderCart();
}

// Remove item from cart
function removeFromCart(index) {
    cart.splice(index, 1);
    renderCart();
}

// Place an order
function placeOrder() {
    const customerName = document.getElementById('customerName').value.trim();
    const contactNo = document.getElementById('contactNo').value.trim();

    if (!customerName || !contactNo) {
        alert('Please enter customer information');
        return;
    }

    let existingCustomer = customers.find(customer => customer.name === customerName && customer.phone === contactNo);
    if (!existingCustomer) {
        const newCustomer = { name: customerName, phone: contactNo };
        customers.push(newCustomer);
        localStorage.setItem('customers', JSON.stringify(customers));
        populateCustomerDropdown();
        alert('New customer added to customer list!');
    }

    const order = {
        customerName,
        contactNo,
        items: cart.map(cartItem => ({
            name: cartItem.name,
            price: cartItem.price,
            quantity: cartItem.quantity
        })),
        discount: parseFloat(document.getElementById('discount').value) || 0,
        totalPrice: calculateTotal()
    };

    orders.push(order);
    saveOrders();

    alert('Order placed successfully!');

    cart = [];
    document.getElementById('customerName').value = '';
    document.getElementById('contactNo').value = '';
    document.getElementById('discount').value = '0';
    renderCart();
}

// Event listeners for search and filter
function handleSearch() {
    const searchValue = document.getElementById('searchItems').value.toLowerCase();
    const filteredItems = items.filter(item => 
        item.name.toLowerCase().includes(searchValue)
    );
    renderMenu(filteredItems);
}

function handleFilter() {
    const categoryValue = document.getElementById('categoryFilter').value;
    const filteredItems = categoryValue
        ? items.filter(item => item.category === categoryValue)
        : items;
    renderMenu(filteredItems);
}

function updateMenu() {
    const searchValue = document.getElementById('searchItems').value.toLowerCase();
    const categoryValue = document.getElementById('categoryFilter').value;

    const filteredItems = items.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(searchValue);
        const matchesCategory = !categoryValue || item.category === categoryValue;
        return matchesSearch && matchesCategory;
    });

    renderMenu(filteredItems);
}

// Initialize page on load
window.onload = function () {
    loadItemsFromJSON().then(() => {
        filterCategory('All');
        loadOrders();
        renderCart();
        populateCustomerDropdown();
    });
    document.getElementById('placeOrder').addEventListener('click', placeOrder);
    document.getElementById('searchItems').addEventListener('input', handleSearch);
    document.getElementById('categoryFilter').addEventListener('change', handleFilter);
    document.getElementById('searchItems').addEventListener('input', updateMenu);
    document.getElementById('categoryFilter').addEventListener('change', updateMenu);
    document.getElementById('existingCustomer').addEventListener('change', fillCustomerInfo);
    document.getElementById('discount').addEventListener('input', updateTotals);
};