// Global variables
let selectedQtyUnit = 'pcs';
let selectedPriceUnit = 'pcs';
let items = [];

// Setup unit buttons
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

// Add item
document.getElementById('item-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('item-name').value.trim();
    const qty = parseFloat(document.getElementById('item-qty').value);
    const price = parseFloat(document.getElementById('item-price').value);

    if (!name || isNaN(qty) || isNaN(price)) return;

    const total = qty * price;

    const item = {
        name: name,
        quantity: qty,
        qtyUnit: selectedQtyUnit,
        price: price,
        priceUnit: selectedPriceUnit,
        total: total
    };

    items.push(item);
    updateItemList();
    this.reset();
    resetUnitSelection();
});

// Reset unit selection
function resetUnitSelection() {
    selectedQtyUnit = 'pcs';
    selectedPriceUnit = 'pcs';

    document.querySelectorAll('.qty-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.qty-btn[data-unit="pcs"]').classList.add('active');

    document.querySelectorAll('.price-btn').forEach(b => b.classList.remove('active'));
    document.querySelector('.price-btn[data-unit="pcs"]').classList.add('active');
}

// Update item table
function updateItemList() {
    const tbody = document.getElementById('items-body');
    tbody.innerHTML = '';
    let total = 0;

    items.forEach((item, index) => {
        total += item.total;
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

    document.getElementById('grand-total').textContent = total.toFixed(2);
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

    selectedQtyUnit = item.qtyUnit;
    selectedPriceUnit = item.priceUnit;

    document.querySelectorAll('.qty-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.unit === selectedQtyUnit);
    });

    document.querySelectorAll('.price-btn').forEach(b => {
        b.classList.toggle('active', b.dataset.unit === selectedPriceUnit);
    });

    items.splice(index, 1);
    updateItemList();
}

// Preview receipt
document.getElementById('preview-btn').addEventListener('click', () => {
    const date = document.getElementById('shop-date').value;
    const receipt = document.getElementById('receipt');
    const body = document.getElementById('receipt-body');
    const totalField = document.getElementById('receipt-total');
    const dateField = document.getElementById('receipt-date');

    body.innerHTML = '';
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
        body.appendChild(row);
    });

    totalField.textContent = total.toFixed(2);
    dateField.textContent = date || '(No Date)';
    receipt.classList.remove('hidden');
});

// Print receipt
document.getElementById('print-btn').addEventListener('click', () => {
    window.print();
});

// Initialize unit buttons
setupUnitButtons();
