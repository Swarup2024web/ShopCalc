let items = [];

document.getElementById('item-form').addEventListener('submit', function (e) {
  e.preventDefault();

  const name = document.getElementById('item-name').value.trim();
  const qty = parseFloat(document.getElementById('item-qty').value);
  const price = parseFloat(document.getElementById('item-price').value);
  const qtyUnit = document.getElementById('qty-unit').value;
  const priceUnit = document.getElementById('price-unit').value;

  if (!name || isNaN(qty) || isNaN(price)) return;

  // Validate unit match
  if (qtyUnit !== priceUnit) {
    alert("Quantity unit and Price unit must match!");
    return;
  }

  const total = qty * price;

  items.push({ name, quantity: qty, qtyUnit, price, priceUnit, total });
  this.reset();
  updateItems();
});

function updateItems() {
  const tbody = document.getElementById('items-body');
  tbody.innerHTML = '';
  let grandTotal = 0;

  items.forEach((item, index) => {
    grandTotal += item.total;
    const row = document.createElement('tr');
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.quantity} ${item.qtyUnit}</td>
      <td>${item.price} per ${item.priceUnit}</td>
      <td>${item.total.toFixed(2)}</td>
      <td>
        <button onclick="editItem(${index})">✏️</button>
        <button onclick="deleteItem(${index})">🗑️</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById('grand-total').textContent = grandTotal.toFixed(2);
}

function deleteItem(index) {
  items.splice(index, 1);
  updateItems();
}

function editItem(index) {
  const item = items[index];
  document.getElementById('item-name').value = item.name;
  document.getElementById('item-qty').value = item.quantity;
  document.getElementById('item-price').value = item.price;
  document.getElementById('qty-unit').value = item.qtyUnit;
  document.getElementById('price-unit').value = item.priceUnit;
  items.splice(index, 1);
  updateItems();
}

document.getElementById('preview-btn').addEventListener('click', () => {
  const receiptBody = document.getElementById('receipt-body');
  const receiptTotal = document.getElementById('receipt-total');
  const receiptDate = document.getElementById('receipt-date');
  const date = document.getElementById('shop-date').value;

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
  document.getElementById('receipt').classList.remove('hidden');
});

document.getElementById('print-btn').addEventListener('click', () => {
  window.print();
});
