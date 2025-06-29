let items = [];

function convertUnits(quantity, fromUnit, toUnit) {
  const units = {
    pcs: 1,
    g: 1,
    kg: 1000,
    ml: 1,
    L: 1000
  };
  if (fromUnit === toUnit) return quantity;
  return (quantity * units[fromUnit]) / units[toUnit];
}

function addItem() {
  const name = document.getElementById("item-name").value.trim();
  const qty = parseFloat(document.getElementById("quantity").value);
  const qtyUnit = document.getElementById("qty-unit").value;
  const rate = parseFloat(document.getElementById("price-per-unit").value);
  const rateUnit = document.getElementById("price-unit").value;

  if (!name || isNaN(qty) || isNaN(rate)) {
    alert("Please enter valid item details.");
    return;
  }

  const convertedQty = convertUnits(qty, qtyUnit, rateUnit);
  const total = (convertedQty * rate).toFixed(2);

  items.push({ name, qty, qtyUnit, rate, rateUnit, total });
  displayItems();
  clearInputs();
}

function displayItems() {
  const tbody = document.getElementById("item-table-body");
  tbody.innerHTML = "";

  items.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>${item.qty} ${item.qtyUnit}</td>
      <td>${item.rate} / ${item.rateUnit}</td>
      <td>${item.total}</td>
      <td>
        <button onclick="editItem(${index})">Edit</button>
        <button onclick="deleteItem(${index})">Delete</button>
      </td>
    `;
    tbody.appendChild(row);
  });
}

function clearInputs() {
  document.getElementById("item-name").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("price-per-unit").value = "";
}

function deleteItem(index) {
  if (confirm("Delete this item?")) {
    items.splice(index, 1);
    displayItems();
  }
}

function editItem(index) {
  const item = items[index];
  document.getElementById("item-name").value = item.name;
  document.getElementById("quantity").value = item.qty;
  document.getElementById("qty-unit").value = item.qtyUnit;
  document.getElementById("price-per-unit").value = item.rate;
  document.getElementById("price-unit").value = item.rateUnit;
  items.splice(index, 1);
  displayItems();
}

function previewReceipt() {
  const date = document.getElementById("date").value;
  if (!date) return alert("Please select a date.");
  const receipt = document.getElementById("receipt");

  let html = `<h2>Banerjee Bhandar</h2><p>Date: ${date}</p><table><thead><tr>
    <th>Sl</th><th>Item</th><th>Qty</th><th>Rate</th><th>Total</th></tr></thead><tbody>`;

  let grandTotal = 0;
  items.forEach((item, i) => {
    html += `<tr>
      <td>${i + 1}</td>
      <td>${item.name}</td>
      <td>${item.qty} ${item.qtyUnit}</td>
      <td>${item.rate} / ${item.rateUnit}</td>
      <td>${item.total}</td>
    </tr>`;
    grandTotal += parseFloat(item.total);
  });

  html += `</tbody></table><h3>Total: ₹${grandTotal.toFixed(2)}</h3>`;
  receipt.innerHTML = html;
  receipt.style.display = "block";
}

function printReceipt() {
  if (!document.getElementById("receipt").innerHTML.trim()) {
    alert("Preview first before printing.");
    return;
  }
  window.print();
            }
