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