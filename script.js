const itemName = document.getElementById('itemName');
const itemQty = document.getElementById('itemQty');
const itemUnit = document.getElementById('itemUnit');
const itemPrice = document.getElementById('itemPrice');
const itemTable = document.getElementById('itemTable').getElementsByTagName('tbody')[0];
const totalDisplay = document.getElementById('total');
const previewModal = document.getElementById('previewModal');
const previewContent = document.getElementById('previewContent');

let items = [];
let editIndex = -1;

function addItem() {
    const name = itemName.value.trim();
    const qty = parseFloat(itemQty.value);
    const unit = itemUnit.value;
    const price = parseFloat(itemPrice.value);

    if (!name || isNaN(qty) || isNaN(price)) {
        alert("Please fill all fields correctly.");
        return;
    }

    const total = qty * price;
    const item = { name, qty, unit, price, total };

    if (editIndex === -1) {
        items.push(item);
    } else {
        items[editIndex] = item;
        editIndex = -1;
    }

    resetForm();
    renderItems();
}

function resetForm() {
    itemName.value = '';
    itemQty.value = '';
    itemUnit.value = 'pcs';
    itemPrice.value = '';
    document.querySelector('.inputs button').textContent = "Add Item";
}

function renderItems() {
    itemTable.innerHTML = '';
    let grandTotal = 0;

    items.forEach((item, index) => {
        const row = itemTable.insertRow();
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.qty} ${item.unit}</td>
            <td>₹${item.price.toFixed(2)} / ${item.unit}</td>
            <td>₹${item.total.toFixed(2)}</td>
            <td>
                <button class="edit" onclick="editItem(${index})">Edit</button>
                <button class="delete" onclick="deleteItem(${index})">Delete</button>
            </td>
        `;
        grandTotal += item.total;
    });

    totalDisplay.textContent = `₹${grandTotal.toFixed(2)}`;
}

function editItem(index) {
    const item = items[index];
    itemName.value = item.name;
    itemQty.value = item.qty;
    itemUnit.value = item.unit;
    itemPrice.value = item.price;
    editIndex = index;
    document.querySelector('.inputs button').textContent = "Update Item";
}

function deleteItem(index) {
    items.splice(index, 1);
    renderItems();
}

function printReceipt() {
    const printWindow = window.open('', '', 'width=800,height=600');
    printWindow.document.write('<html><head><title>Receipt</title>');
    printWindow.document.write('<style>body{font-family:Arial; padding:20px;} table{width:100%; border-collapse:collapse;} th,td{border:1px solid #ccc; padding:8px; text-align:center;} th{background:#eee;}</style>');
    printWindow.document.write('</head><body>');
    printWindow.document.write('<h2 style="text-align:center;">Banerjee Bhandar</h2>');
    printWindow.document.write(`<p>Date: ${new Date().toLocaleDateString()}</p>`);
    printWindow.document.write('<table><tr><th>Item</th><th>Qty</th><th>Price/Unit</th><th>Total</th></tr>');

    let grandTotal = 0;
    items.forEach(item => {
        printWindow.document.write(
            `<tr><td>${item.name}</td><td>${item.qty} ${item.unit}</td><td>₹${item.price.toFixed(2)} / ${item.unit}</td><td>₹${item.total.toFixed(2)}</td></tr>`
        );
        grandTotal += item.total;
    });

    printWindow.document.write(`<tr><td colspan="3"><strong>Grand Total</strong></td><td><strong>₹${grandTotal.toFixed(2)}</strong></td></tr>`);
    printWindow.document.write('</table></body></html>');
    printWindow.document.close();
    printWindow.print();
}

function showPreview() {
    let content = `<h3>Banerjee Bhandar</h3>`;
    content += `<p>Date: ${new Date().toLocaleDateString()}</p>`;
    content += `<table style="width:100%; border-collapse:collapse; font-size:14px;">`;
    content += `<tr><th>Item</th><th>Qty</th><th>Price/Unit</th><th>Total</th></tr>`;
    let grandTotal = 0;
    items.forEach(item => {
        content += `<tr><td>${item.name}</td><td>${item.qty} ${item.unit}</td><td>₹${item.price.toFixed(2)} / ${item.unit}</td><td>₹${item.total.toFixed(2)}</td></tr>`;
        grandTotal += item.total;
    });
    content += `<tr><td colspan="3"><strong>Total</strong></td><td><strong>₹${grandTotal.toFixed(2)}</strong></td></tr>`;
    content += `</table>`;

    previewContent.innerHTML = content;
    previewModal.style.display = 'flex';
}

function closePreview() {
    previewModal.style.display = 'none';
      }
