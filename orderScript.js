document.addEventListener('DOMContentLoaded', () => {
    displayOrders();
});



function displayOrders() {
    const orderTableBody = document.getElementById('orderTableBody');
    const orders = JSON.parse(sessionStorage.getItem('orders')) || [];

    orderTableBody.innerHTML = '';
    orders.forEach((order, index) => {
        const row = document.createElement('tr');

        const itemsList = Array.isArray(order.items) ? order.items.map(item => {
            const quantity = Number(item.quantity) || 0;
            const price = Number(item.price) || 0;
            return `<li>${item.name || 'Unknown Item'} (x${quantity}) - Rs. ${(price * quantity)}</li>`;
        }).join('') : '<li>No items</li>';

        const discount = Number(order.discount) || 0;
        const totalPrice = Number(order.totalPrice) || 0;

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${order.customerName || 'No Name'}</td>
            <td>${order.contactNo || 'No Contact'}</td>
            <td>
                <ul>
                    ${itemsList}
                </ul>
            </td>
            <td>Rs. ${discount}</td>
            <td>Rs. ${totalPrice}</td>
            <td><button class="btn btn-sm" style="background-color: #ffc400;" onclick="printOrderReport(${index})">Print Order Report</button></td>
        `;
        orderTableBody.appendChild(row);
    });
}

function saveOrdersToSessionStorage(orders) {
    sessionStorage.setItem('orders', JSON.stringify(orders));
}

function addOrder(newOrder) {
    let orders = JSON.parse(sessionStorage.getItem('orders')) || [];
    orders.push(newOrder);
    saveOrdersToSessionStorage(orders);
    displayOrders(); 
}

function printOrderReport(index) {
    const orders = JSON.parse(sessionStorage.getItem("orders") || "[]");
    const order = orders[index];

    if (!order) {
        alert("Order not found!");
        return;
    }

    const { jsPDF } = window.jspdf;
    const doc = new jsPDF("p", "mm", "a4");

    const { customerName, contactNo, items, discount, totalPrice } = order;

    // **HEADER**
    doc.setFillColor(45, 45, 45);
    doc.rect(0, 0, 210, 40, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(255, 255, 255);
    doc.text("MOS BURGERS", 15, 15);
    
    doc.setFontSize(14);
    doc.text("Sales Invoice", 160, 15);

    doc.setFontSize(10);
    doc.text("Invoice Date: " + new Date().toLocaleDateString(), 160, 25);
    doc.text("Invoice Time: " + new Date().toLocaleTimeString(), 160, 30);
    doc.text("Invoice #: " + (index + 1).toString().padStart(4, "0"), 160, 30);

    // **CUSTOMER DETAILS**
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text("Bill To:", 15, 50);
    
    doc.setFontSize(10);
    doc.text(`Customer Name: ${customerName || "N/A"}`, 15, 58);
    doc.text(`Contact No: ${contactNo || "N/A"}`, 15, 65);

    // **ORDER TABLE**
    let startY = 80;
    doc.setFillColor(230, 230, 230);
    doc.rect(10, startY, 190, 10, "F");

    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text("Item", 15, startY + 7);
    doc.text("Qty", 100, startY + 7);
    doc.text("Price", 130, startY + 7);
    doc.text("Total", 170, startY + 7);

    let yPosition = startY + 15;

    items.forEach((item, idx) => {
        const quantity = Number(item.quantity) || 0;
        const price = Number(item.price) || 0;
        const total = quantity * price;

        doc.text(truncateText(item.name, 25), 15, yPosition);
        doc.text(quantity.toString(), 100, yPosition);
        doc.text(`Rs. ${price}`, 130, yPosition);
        doc.text(`Rs. ${total}`, 170, yPosition);

        yPosition += 10;

        if (yPosition > 250) {
            doc.addPage();
            yPosition = 20;
        }
    });

    // **ORDER SUMMARY**
    yPosition += 10;
    doc.setFillColor(240, 240, 240);
    doc.rect(120, yPosition, 80, 30, "F");

    doc.setFontSize(12);
    doc.text("Subtotal:", 125, yPosition + 8);
    doc.text(`Rs. ${totalPrice}`, 165, yPosition + 8);
    doc.text("Discount:", 125, yPosition + 16);
    doc.text(`Rs. ${discount}`, 165, yPosition + 16);

    doc.setFontSize(14);
    doc.setFont("helvetica", "bold");
    doc.text("Total:", 125, yPosition + 26);
    doc.text(`Rs. ${(totalPrice - discount)}`, 165, yPosition + 26);

    // **FOOTER**
    doc.setFontSize(10);
    doc.setFont("helvetica", "italic");
    doc.setTextColor(100, 100, 100);
    doc.text("Thank you for your business!", 105, 280, null, null, "center");
    doc.text("MOS Burgers - Your taste, our passion!", 105, 285, null, null, "center");


    // **SAVE PDF**
    doc.save(`MOS_BURGERS_Invoice_${index + 1}.pdf`);
}

// **Utility Function to Truncate Text**
function truncateText(text, maxLength) {
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
}

