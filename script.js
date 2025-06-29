let items = [];

function addItem() {
    const name = document.getElementById("itemName").value.trim();
    const qty = parseFloat(document.getElementById("itemQty").value);
    const unit = document.getElementById("itemUnit").value;
    const price = parseFloat(document.getElementById("itemPrice").value);
    const priceUnit = document.getElementById("priceUnit").value;

    if (!name || isNaN(qty) || isNaN(price)) {
        alert("Please enter valid item details.");
        return;
    }

    const total = qty * price;
    items.push({ name, qty, unit, price, priceUnit, total });

    document.getElementById("itemName").value = "";
    document.getElementById("itemQty").value = "";
    document.getElementById("itemPrice").value = "";

    renderItems();
}

function renderItems() {
    const tbody = document.querySelector("#itemTable tbody");
    tbody.innerHTML = "";
    let grandTotal = 0;

    items.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.qty} ${item.unit}</td>
            <td>₹${item.price.toFixed(2)} / ${item.priceUnit}</td>
            <td>₹${item.total.toFixed(2)}</td>
            <td>
                <button onclick="editItem(${index})">Edit</button>
                <button onclick="deleteItem(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
        grandTotal += item.total;
    });

    document.getElementById("total").textContent = `₹${grandTotal.toFixed(2)}`;
}

function deleteItem(index) {
    if (confirm("Are you sure you want to delete this item?")) {
        items.splice(index, 1);
        renderItems();
    }
}

function editItem(index) {
    const item = items[index];
    document.getElementById("itemName").value = item.name;
    document.getElementById("itemQty").value = item.qty;
    document.getElementById("itemUnit").value = item.unit;
    document.getElementById("itemPrice").value = item.price;
    document.getElementById("priceUnit").value = item.priceUnit;

    deleteItem(index);
}

function showPreview() {
    const shopName = "Banerjee Bhandar";
    const date = document.getElementById("shopDate").value;

    if (!date) {
        alert("Please select the date.");
        return;
    }

    let previewHTML = `<h2>${shopName}</h2><p><strong>Date:</strong> ${date}</p><hr>`;
    previewHTML += `<table style="width:100%;border-collapse:collapse;" border="1">
        <tr>
            <th>Item</th>
            <th>Qty</th>
            <th>Rate</th>
            <th>Total</th>
        </tr>`;

    let total = 0;
    items.forEach(item => {
        previewHTML += `
        <tr>
            <td>${item.name}</td>
            <td>${item.qty} ${item.unit}</td>
            <td>₹${item.price} / ${item.priceUnit}</td>
            <td>₹${item.total.toFixed(2)}</td>
        </tr>`;
        total += item.total;
    });

    previewHTML += `
        <tr>
            <td colspan="3" style="text-align:right;"><strong>Total:</strong></td>
            <td><strong>₹${total.toFixed(2)}</strong></td>
        </tr>
    </table>`;

    document.getElementById("previewContent").innerHTML = previewHTML;
    document.getElementById("previewModal").style.display = "block";
}

function closePreview() {
    document.getElementById("previewModal").style.display = "none";
}

function printReceipt() {
    showPreview();
    setTimeout(() => {
        const printContent = document.getElementById("previewContent").innerHTML;
        const win = window.open("", "", "width=800,height=600");
        win.document.write("<html><head><title>Print Receipt</title></head><body>");
        win.document.write(printContent);
        win.document.write("</body></html>");
        win.document.close();
        win.print();
    }, 300);
            }
