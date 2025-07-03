let items = [];

function addItem() {
  const name = document.getElementById("item-name").value.trim();
  const qty = parseFloat(document.getElementById("quantity").value);
  const qtyUnit = document.getElementById("qty-unit").value;
  const pricePerUnit = parseFloat(document.getElementById("price-per-unit").value);
  const priceUnit = document.getElementById("price-unit").value;

  if (!name || isNaN(qty) || isNaN(pricePerUnit)) {
    alert("Please fill in all fields correctly.");
    return;
  }

  if (qtyUnit !== priceUnit) {
    alert("Units must match for quantity and price.");
    return;
  }

  const total = qty * pricePerUnit;

  const newItem = {
    name,
    qty,
    qtyUnit,
    pricePerUnit,
    total
  };

  items.push(newItem);
  updateTable();
  clearInputs();
}

function clearInputs() {
  document.getElementById("item-name").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("price-per-unit").value = "";
}

function updateTable() {
  const tbody = document.getElementById("item-table-body");
  tbody.innerHTML = "";

  items.forEach((item, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${index + 1}</td>
      <td>${item.name}</td>
      <td>${item.qty} ${item.qtyUnit}</td>
      <td>₹${item.pricePerUnit.toFixed(2)} /${item.qtyUnit}</td>
      <td>₹${item.total.toFixed(2)}</td>
      <td><button onclick="removeItem(${index})">Delete</button></td>
    `;

    tbody.appendChild(row);
  });
}

function removeItem(index) {
  items.splice(index, 1);
  updateTable();
}

function previewReceipt() {
  const receiptArea = document.getElementById("receipt");
  const date = document.getElementById("date").value;
  if (!date) {
    alert("Please select a date.");
    return;
  }

  if (items.length === 0) {
    receiptArea.innerHTML = "<p>No items to display.</p>";
    return;
  }

  let receiptText = `🧾 Banerjee Bhandar Receipt\n📅 Date: ${date}\n\n`;
  receiptText += "--------------------------------------------------\n";
  receiptText += "No.  Item         Qty      Rate        Total\n";
  receiptText += "--------------------------------------------------\n";

  let grandTotal = 0;

  items.forEach((item, index) => {
    const itemName = item.name.padEnd(12, ' ');
    const qty = `${item.qty} ${item.qtyUnit}`.padEnd(9, ' ');
    const rate = `₹${item.pricePerUnit}/${item.qtyUnit}`.padEnd(12, ' ');
    const total = `₹${item.total.toFixed(2)}`;
    receiptText += `${String(index + 1).padEnd(4)} ${itemName}${qty}${rate}${total}\n`;
    grandTotal += item.total;
  });

  receiptText += "--------------------------------------------------\n";
  receiptText += `🧮 Grand Total: ₹${grandTotal.toFixed(2)}\n`;
  receiptText += "--------------------------------------------------\n";

  receiptArea.textContent = receiptText;
}

function printReceipt() {
  window.print();
      }
