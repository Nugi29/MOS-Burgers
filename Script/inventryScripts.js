// Wait for the DOM to be fully loaded before accessing elements
let items = [];
document.addEventListener('DOMContentLoaded', function () {
    let editingIndex = -1;

    // Get DOM elements
    const itemForm = document.getElementById('itemForm');
    const submitBtn = document.getElementById('submitBtn');
    const codeInput = document.getElementById('code');
    const nameInput = document.getElementById('name');
    const categoryInput = document.getElementById('category');
    const priceInput = document.getElementById('price');
    const discountInput = document.getElementById('discount');
    const quantityInput = document.getElementById('quantity');
    const expireDateInput = document.getElementById('expireDate');
    const searchInput = document.getElementById('searchInput');
    const totalItemsSpan = document.getElementById('totalItems');

    // Initialize the page
    loadItemsFromLocalStorage();
    if (!items.length) {
        loadItemsFromJSON();
    }

    // Event listeners
    if (itemForm) {
        itemForm.addEventListener('submit', handleFormSubmit);
    }

    if (searchInput) {
        searchInput.addEventListener('keyup', searchItem);
    }

    // Functions
    function handleFormSubmit(e) {
        e.preventDefault();

        const code = codeInput.value.trim();
        const name = nameInput.value.trim();
        const category = categoryInput.value.trim();
        const price = parseFloat(priceInput.value.trim());
        const discount = parseInt(discountInput.value.trim() || "0");
        const quantity = parseInt(quantityInput.value.trim());
        const expireDate = expireDateInput.value.trim();

        if (code === '' || name === '' || category === '' || isNaN(price) || isNaN(quantity)) {
            alert('Please fill in all required fields');
            return;
        }

        const newItem = {
            code,
            name,
            category,
            price,
            discount,
            quantity,
            expireDate
        };

        if (editingIndex === -1) {
            addItem(newItem);
        } else {
            updateItem(editingIndex, newItem);
            submitBtn.innerHTML = '<i class="fas fa-save me-2"></i>Add Item';
            editingIndex = -1;
        }

        itemForm.reset();
    }

    function loadItemsFromJSON() {
        fetch('menu-data.json')
            .then(response => response.json())
            .then(data => {
                if (!localStorage.getItem('items')) {
                    items = data;
                    refreshTable();
                    saveItemsToLocalStorage();
                    updateTotalItems();
                }
            })
            .catch(error => console.error('Error loading items:', error));
    }

    function addItem(item) {
        items.push(item);
        addItemToTable(item, items.length - 1);
        saveItemsToLocalStorage();
        updateTotalItems();
    }

    function updateItem(index, updatedItem) {
        items[index] = updatedItem;
        updateItemInTable(index, updatedItem);
        saveItemsToLocalStorage();
    }

    function addItemToTable(item, index) {
        const tableBody = document.querySelector('#itemTable tbody');
        if (!tableBody) return;

        const row = document.createElement('tr');

        // Format price with thousand separators
        const formattedPrice = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(item.price);

        row.innerHTML = `
                <td>${item.code}</td>
                <td>${item.name}</td>
                <td>${item.category}</td>
                <td class="text-end">Rs. ${formattedPrice}</td>
                <td class="text-center">${item.quantity}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-primary me-1 edit-btn" data-index="${index}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger delete-btn" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;

        // Add event listeners to the buttons
        const editBtn = row.querySelector('.edit-btn');
        if (editBtn) {
            editBtn.addEventListener('click', function () {
                editItem(index);
            });
        }

        const deleteBtn = row.querySelector('.delete-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function () {
                deleteItem(index);
            });
        }

        tableBody.appendChild(row);
    }

    function updateItemInTable(index, updatedItem) {
        const tableBody = document.querySelector('#itemTable tbody');
        if (!tableBody || !tableBody.children[index]) return;

        const row = tableBody.children[index];

        // Format price with thousand separators
        const formattedPrice = new Intl.NumberFormat('en-US', {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        }).format(updatedItem.price);

        row.innerHTML = `
                <td>${updatedItem.code}</td>
                <td>${updatedItem.name}</td>
                <td>${updatedItem.category}</td>
                <td class="text-end">Rs. ${formattedPrice}</td>
                <td class="text-center">${updatedItem.quantity}</td>
                <td class="text-center">
                    <button class="btn btn-sm btn-outline-primary me-1 edit-btn" data-index="${index}">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-outline-danger delete-btn" data-index="${index}">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            `;

        // Add event listeners to the buttons
        const editBtn = row.querySelector('.edit-btn');
        if (editBtn) {
            editBtn.addEventListener('click', function () {
                editItem(index);
            });
        }

        const deleteBtn = row.querySelector('.delete-btn');
        if (deleteBtn) {
            deleteBtn.addEventListener('click', function () {
                deleteItem(index);
            });
        }
    }

    function editItem(index) {
        const item = items[index];
        codeInput.value = item.code;
        nameInput.value = item.name;
        categoryInput.value = item.category;
        priceInput.value = item.price;
        discountInput.value = item.discount;
        quantityInput.value = item.quantity;
        expireDateInput.value = item.expireDate;

        submitBtn.innerHTML = '<i class="fas fa-edit me-2"></i>Update Item';
        editingIndex = index;

    }

    function deleteItem(index) {
        if (confirm('Are you sure you want to delete this item?')) {
            items.splice(index, 1);
            refreshTable();
            saveItemsToLocalStorage();
            updateTotalItems();
        }
    }

    function refreshTable() {
        const tableBody = document.querySelector('#itemTable tbody');
        if (!tableBody) return;

        tableBody.innerHTML = '';
        items.forEach((item, index) => addItemToTable(item, index));
    }

    function saveItemsToLocalStorage() {
        localStorage.setItem('items', JSON.stringify(items));
    }

    function loadItemsFromLocalStorage() {
        const storedItems = localStorage.getItem('items');
        if (storedItems) {
            items = JSON.parse(storedItems);
            refreshTable();
            updateTotalItems();
        }
    }

    function searchItem() {
        const searchValue = searchInput.value.toLowerCase();
        const tableRows = document.querySelectorAll('#itemTable tbody tr');

        tableRows.forEach(row => {
            const code = row.cells[0].innerText.toLowerCase();
            const name = row.cells[1].innerText.toLowerCase();
            const category = row.cells[2].innerText.toLowerCase();

            if (code.includes(searchValue) || name.includes(searchValue) || category.includes(searchValue)) {
                row.style.display = '';
            } else {
                row.style.display = 'none';
            }
        });
    }

    function updateTotalItems() {
        if (totalItemsSpan) {
            totalItemsSpan.textContent = items.length;
        }
    }

    // Make functions accessible globally for button onclick events
    window.editItem = editItem;
    window.deleteItem = deleteItem;
    window.searchItem = searchItem;
});

// Function to update the menu item count
function menuItemCount() {
    document.getElementById('menuItemCount').innerHTML = items.length;
    console.log(items.length);
}

