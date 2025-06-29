let grandTotal = 0;

function addItem() {
  const item = document.getElementById("item").value;
  const price = parseFloat(document.getElementById("price").value);
  const qty = parseInt(document.getElementById("qty").value);

  if (!item || isNaN(price) || isNaN(qty)) {
    alert("Please enter valid item name, price, and quantity.");
    return;
  }

  const total = price * qty;
  grandTotal += total;

  const tbody = document.querySelector("#billTable tbody");
  const row = document.createElement("tr");

  row.innerHTML = `
    <td>${item}</td>
    <td>${qty}</td>
    <td>₹${price.toFixed(2)}</td>
    <td>₹${total.toFixed(2)}</td>
  `;

  tbody.appendChild(row);

  document.getElementById("grandTotal").textContent = grandTotal.toFixed(2);
  document.getElementById("finalTotal").textContent = grandTotal.toFixed(2);

  // Clear inputs
  document.getElementById("item").value = "";
  document.getElementById("price").value = "";
  document.getElementById("qty").value = "";
}

function applyDiscount() {
  const discount = parseFloat(document.getElementById("discount").value);

  if (isNaN(discount) || discount < 0 || discount > 100) {
    alert("Enter a valid discount percentage (0–100)");
    return;
  }

  const discountedTotal = grandTotal - (grandTotal * discount / 100);
  document.getElementById("finalTotal").textContent = discountedTotal.toFixed(2);
}
