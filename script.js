let items = [];
let editingIndex = -1;

function addItem() {
  const item = document.getElementById("item").value.trim();
  const qty = parseFloat(document.getElementById("qty").value);
  const price = parseFloat(document.getElementById("price").value);

  if (!item || isNaN(qty) || isNaN(price)) {
    alert("Please enter valid item, quantity and price.");
    return;
  }

  const total = qty * price;

  if (editingIndex > -1) {
    items[editingIndex] = { item, qty, price, total };
    editingIndex = -1;
  } else {
    items.push({ item, qty, price, total });
  }

  clearForm();
  renderTable();
}

function renderTable() {
  const tbody = document.querySelector("#billTable tbody");
  tbody.innerHTML = "";

  let grandTotal = 0;

  items.forEach((entry, index) => {
    grandTotal += entry.total;

    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${entry.item}</td>
      <td>${entry.qty}</td>
      <td>₹${entry.price.toFixed(2)}</td>
      <td>₹${entry.total.toFixed(2)}</td>
      <td>
        <button class="edit" onclick="editItem(${index})">Edit</button>
        <button class="delete" onclick="deleteItem(${index})">Delete</button>
      </td>
    `;

    tbody.appendChild(tr);
  });

  document.getElementById("grandTotal").innerText = grandTotal.toFixed(2);

  const discount = parseFloat(document.getElementById("discount").value) || 0;
  const finalTotal = grandTotal - (grandTotal * discount / 100);
  document.getElementById("finalTotal").innerText = finalTotal.toFixed(2);
}

function editItem(index) {
  const entry = items[index];
  document.getElementById("item").value = entry.item;
  document.getElementById("qty").value = entry.qty;
  document.getElementById("price").value = entry.price;
  editingIndex = index;
}

function deleteItem(index) {
  if (confirm("Are you sure you want to delete this item?")) {
    items.splice(index, 1);
    renderTable();
  }
}

function applyDiscount() {
  renderTable(); // Discount is handled during render
}

function clearForm() {
  document.getElementById("item").value = "";
  document.getElementById("qty").value = "";
  document.getElementById("price").value = "";
}
