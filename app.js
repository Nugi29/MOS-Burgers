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
                        <hr>
                        ${discountHTML}
                        <h5 class="card-text text-bg-danger rounded-pill badge fs-6">
                            Rs.${discountedPrice.toFixed(2)}
                        </h5>
                        <p class="card-text badge rounded-pill text-bg-light">Exp: ${item.expireDate}</p>
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