let items = [];

function convertUnit(value, from, to) {
  const conversions = {
    'g': { 'kg': value / 1000, 'g': value, 'pcs': value },
    'kg': { 'g': value * 1000, 'kg': value, 'pcs': value },
    'pcs': { 'pcs': value, 'g': value, 'kg': value }
  };
  return conversions[from][to] || value;
}

function addItem() {
  const itemName = document.getElementById("itemName").value.trim();
  const quantity = parseFloat(document.getElementById("quantity").value);
  const quantityUnit = document.getElementById("quantityUnit").value;
  const price = parseFloat(document.getElementById("price").value);
  const priceUnit = document.getElementById("priceUnit").value;

  if (!itemName || isNaN(quantity) || isNaN(price)) {
    alert("Please fill all fields correctly.");
    return;
  }

  const convertedQty = convertUnit(quantity, quantityUnit, priceUnit);
  const total = (convertedQty * price).toFixed(2);

  items.push({ itemName, quantity, quantityUnit, price, priceUnit, total });
  renderTable();
  clearForm();
}

function renderTable() {
  const itemList = document.getElementById("itemList");
  itemList.innerHTML = "";
  let grandTotal = 0;

  items.forEach((item, index) => {
    grandTotal += parseFloat(item.total);

    const row = `<tr>
      <td>${item.itemName}</td>
      <td>${item.quantity} ${item.quantityUnit}</td>
      <td>₹${item.price}/${item.priceUnit}</td>
      <td>₹${item.total}</td>
      <td><button onclick="deleteItem(${index})">🗑️</button></td>
    </tr>`;
    itemList.innerHTML += row;
  });

  document.getElementById("totalDisplay").innerText = `Total: ₹${grandTotal.toFixed(2)}`;
}

function deleteItem(index) {
  items.splice(index, 1);
  renderTable();
}

function clearForm() {
  document.getElementById("itemName").value = "";
  document.getElementById("quantity").value = "";
  document.getElementById("price").value = "";
}

function showPreview() {
  const previewDiv = document.getElementById("receiptPreview");
  const content = document.getElementById("previewContent");
  content.innerHTML = "";

  if (items.length === 0) {
    alert("No items to preview.");
    return;
  }

  let html = `<p><strong>Shop:</strong> Banerjee Bhandar</p>`;
  html += `<p><strong>Date:</strong> ${document.getElementById("date").value || "Not specified"}</p>`;
  html += "<ul>";
  items.forEach((item, index) => {
    html += `<li>${index + 1}. ${item.itemName} - ${item.quantity}${item.quantityUnit} @ ₹${item.price}/${item.priceUnit} = ₹${item.total}</li>`;
  });
  html += "</ul>";

  const total = items.reduce((sum, item) => sum + parseFloat(item.total), 0);
  html += `<p><strong>Total:</strong> ₹${total.toFixed(2)}</p>`;

  content.innerHTML = html;
  previewDiv.classList.remove("hidden");
}

function printReceipt() {
  window.print();
      }
