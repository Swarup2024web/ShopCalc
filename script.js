// Global variables
let selectedQtyUnit = 'pcs';
let selectedPriceUnit = 'pcs';
let items = [];

// Update unit button selections
function setupUnitButtons() {
    document.querySelectorAll('.qty-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            selectedQtyUnit = btn.dataset.unit;
            document.querySelectorAll('.qty-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });

    document.querySelectorAll('.price-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            selectedPriceUnit = btn.dataset.unit;
            document.querySelectorAll('.price-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
        });
    });
}

// Add item to the list
document.getElementById('item-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const itemName = document.getElementById('item-name').value.trim();
    const quantity = parseFloat(document.getElementById('item-qty').value);
    const pricePerQty = parseFloat(document.getElementById('item-price').value);

    if (!itemName || isNaN(quantity) || isNaN(pricePerQty)) return;

    const total = quantity * pricePerQty;

    const item = {
        name: itemName,
        quantity: quantity,
        qtyUnit: selectedQtyUnit,
        price: pricePerQty,
        priceUnit: selectedPriceUnit,
        total: total
    };

    items.push(item);
    updateItemList();
    this.reset();
    resetUnits();
});

// Reset unit selection
function resetUnits() {
    selectedQtyUnit = 'pcs';
    selectedPriceUnit = 'pcs';
    document.querySelectorAll('.qty-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.qty-btn[data-unit="pcs"]').classList.add('active');
    document.querySelectorAll('.price-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.price-btn[data-unit="pcs"]').classList.add('active');
}

// Update item list table
function updateItemList() {
    const tbody = document.getElementById('items-body');
    tbody.innerHTML = '';

    let grandTotal = 0;

    items.forEach((item, index) => {
        grandTotal += item.total;
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity} ${item.qtyUnit}</td>
            <td>${item.price} per ${item.priceUnit}</td>
            <td>${item.total.toFixed(2)}</td>
            <td>
                <button onclick="editItem(${index})">Edit</button>
                <button onclick="deleteItem(${index})">Delete</button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    document.getElementById('grand-total').textContent = grandTotal.toFixed(2);
}

// Delete item
function deleteItem(index) {
    items.splice(index, 1);
    updateItemList();
}

// Edit item
function editItem(index) {
    const item = items[index];
    document.getElementById('item-name').value = item.name;
    document.getElementById('item-qty').value = item.quantity;
    document.getElementById('item-price').value = item.price;

    // Set active units
    selectedQtyUnit = item.qtyUnit;
    selectedPriceUnit = item.priceUnit;

    document.querySelectorAll('.qty-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.unit === item.qtyUnit);
    });

    document.querySelectorAll('.price-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.unit === item.priceUnit);
    });

    items.splice(index, 1);
    updateItemList();
}

// Preview receipt
document.getElementById('preview-btn').addEventListener('click', function () {
    const date = document.getElementById('shop-date').value;
    const receipt = document.getElementById('receipt');
    const receiptBody = document.getElementById('receipt-body');
    const receiptTotal = document.getElementById('receipt-total');
    const receiptDate = document.getElementById('receipt-date');

    receiptBody.innerHTML = '';
    let total = 0;

    items.forEach(item => {
        total += item.total;
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity} ${item.qtyUnit}</td>
            <td>${item.price} per ${item.priceUnit}</td>
            <td>${item.total.toFixed(2)}</td>
        `;
        receiptBody.appendChild(row);
    });

    receiptTotal.textContent = total.toFixed(2);
    receiptDate.textContent = date || '(No Date)';
    receipt.classList.remove('hidden');
});

// Print receipt
document.getElementById('print-btn').addEventListener('click', function () {
    window.print();
});

// Initialize
setupUnitButtons();
