let items = [];
let editIndex = -1;

function addItem() {
  const item = document.getElementById("item").value.trim();
  const qty = parseFloat(document.getElementById("qty").value);
  const price = parseFloat(document.getElementById("price").value);

  if (!item || isNaN(qty) || isNaN(price)) {
    alert("Please enter valid item name, quantity and price.");
    return;
  }

  const total = qty * price;

  if (editIndex >= 0) {
    items[editIndex] = { item, qty, price, total };
    editIndex = -1;
  } else {
    items.push({ item, qty, price, total });
  }

  clearForm();
  renderTable();
}

function clearForm() {
  document.getElementById("item").value = "";
  document.getElementById("qty").value = "";
  document.getElementById("price").value = "";
}

function renderTable() {
  const tbody = document.querySelector("#billTable tbody");
  tbody.innerHTML = "";

  items.forEach((entry, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${entry.item}</td>
      <td>${entry.qty}</td>
      <td>₹${entry.price.toFixed(2)}</td>
      <td>₹${entry.total.toFixed(2)}</td>
      <td>
        <button class="edit" onclick="editItem(${index})">Edit</button>
        <button class="delete" onclick="deleteItem(${index})">Delete</button>
      </td>
    `;

    tbody.appendChild(row);
  });

  updateTotals();
}

function updateTotals() {
  const grandTotal = items.reduce((sum, entry) => sum + entry.total, 0);
  const discount = parseFloat(document.getElementById("discount").value) || 0;
  const finalTotal = grandTotal - (grandTotal * discount / 100);

  document.getElementById("grandTotal").textContent = grandTotal.toFixed(2);
  document.getElementById("finalTotal").textContent = finalTotal.toFixed(2);
}

function applyDiscount() {
  updateTotals();
}

function deleteItem(index) {
  if (confirm("Are you sure you want to delete this item?")) {
    items.splice(index, 1);
    renderTable();
  }
}

function editItem(index) {
  const item = items[index];
  document.getElementById("item").value = item.item;
  document.getElementById("qty").value = item.qty;
  document.getElementById("price").value = item.price;
  editIndex = index;
}
