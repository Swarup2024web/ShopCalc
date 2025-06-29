const items = [];
const unitMap = {
  g: 1,
  kg: 1000,
  ml: 1,
  litre: 1000,
  pcs: 1
};

function addItem() {
  const itemName = document.getElementById("itemName").value.trim();
  const quantity = parseFloat(document.getElementById("quantity").value);
  const quantityUnit = document.getElementById("quantityUnit").value;
  const price = parseFloat(document.getElementById("price").value);
  const priceUnit = document.getElementById("priceUnit").value;

  if (!itemName || isNaN(quantity) || isNaN(price)) {
    alert("Please enter valid item name, quantity, and price.");
    return;
  }

  // Convert price to match quantity unit
  let adjustedPrice = price;
  if (quantityUnit !== priceUnit) {
    if (unitMap[quantityUnit] && unitMap[priceUnit]) {
      adjustedPrice = price * (unitMap[quantityUnit] / unitMap[priceUnit]);
    } else {
      alert("Incompatible units!");
      return;
    }
  }

  const total = (adjustedPrice * quantity).toFixed(2);

  const item = {
    name: itemName,
    quantity,
    quantityUnit,
    price: price,
    priceUnit,
    total
  };

  items.push(item);
  renderTable();
  clearInputs();
}

function renderTable() {
  const tbody = document.getElementById("itemTableBody");
  tbody.innerHTML = "";

  let grandTotal = 0;

  items.forEach((item, index) => {
    grandTotal += parseFloat(item.total);

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>${item.quantity} ${item.quantityUnit}</td>
      <td>${item.price} /${item.priceUnit}</td>
      <td>₹${item.total}</td>
      <td>
        <button class="action-btn edit-btn" onclick="editItem(${index})">Edit</button>
        <button class="action-btn delete-btn" onclick="deleteItem(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });

  document.getElementById("totalAmount").innerText = `Total: ₹${grandTotal.toFixed(2)}`;
}

function clearInputs() {
  document.getElementById("itemName").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("price").value = "";
}

function deleteItem(index) {
  items.splice(index, 1);
  renderTable();
}

function editItem(index) {
  const item = items[index];
  document.getElementById("itemName").value = item.name;
  document.getElementById("quantity").value = item.quantity;
  document.getElementById("quantityUnit").value = item.quantityUnit;
  document.getElementById("price").value = item.price;
  document.getElementById("priceUnit").value = item.priceUnit;
  items.splice(index, 1);
  renderTable();
}

function previewReceipt() {
  window.print();
}

function printReceipt() {
  window.print();
      }
