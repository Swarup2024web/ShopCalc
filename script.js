// Store item list
let items = [];

function convertUnits(quantity, fromUnit, toUnit) {
    const unitFactors = {
        pcs: 1,
        g: 1,
        kg: 1000,
        ml: 1,
        L: 1000
    };

    if (fromUnit === toUnit) return quantity;

    return (quantity * unitFactors[fromUnit]) / unitFactors[toUnit];
}

function addItem() {
    const itemName = document.getElementById("item-name").value.trim();
    const quantity = parseFloat(document.getElementById("quantity").value);
    const qtyUnit = document.getElementById("qty-unit").value;
    const pricePerUnit = parseFloat(document.getElementById("price-per-unit").value);
    const priceUnit = document.getElementById("price-unit").value;

    if (!itemName || isNaN(quantity) || isNaN(pricePerUnit)) {
        alert("Please fill all fields correctly.");
        return;
    }

    // Convert quantity to match price unit
    const convertedQty = convertUnits(quantity, qtyUnit, priceUnit);
    const total = (convertedQty * pricePerUnit).toFixed(2);

    const item = {
        name: itemName,
        quantity,
        qtyUnit,
        pricePerUnit,
        priceUnit,
        total
    };

    items.push(item);
    displayItems();
    clearForm();
}

function displayItems() {
    const tableBody = document.getElementById("item-table-body");
    tableBody.innerHTML = "";

    items.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${item.name}</td>
            <td>${item.quantity} ${item.qtyUnit}</td>
            <td>${item.pricePerUnit} / ${item.priceUnit}</td>
            <td>${item.total}</td>
            <td>
                <button onclick="editItem(${index})">Edit</button>
                <button onclick="deleteItem(${index})">Delete</button>
            </td>
        `;

        tableBody.appendChild(row);
    });
}

function clearForm() {
    document.getElementById("item-name").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("price-per-unit").value = "";
    document.getElementById("qty-unit").value = "pcs";
    document.getElementById("price-unit").value = "pcs";
}

function deleteItem(index) {
    if (confirm("Are you sure you want to delete this item?")) {
        items.splice(index, 1);
        displayItems();
    }
}

function editItem(index) {
    const item = items[index];

    document.getElementById("item-name").value = item.name;
    document.getElementById("quantity").value = item.quantity;
    document.getElementById("price-per-unit").value = item.pricePerUnit;
    document.getElementById("qty-unit").value = item.qtyUnit;
    document.getElementById("price-unit").value = item.priceUnit;

    items.splice(index, 1);
    displayItems();
}

function previewReceipt() {
    const receiptDiv = document.getElementById("receipt");
    const date = document.getElementById("date").value;
    const shopName = "Banerjee Bhandar";

    if (!date) {
        alert("Please select a date.");
        return;
    }

    let html = `<h2>${shopName}</h2>`;
    html += `<p>Date: ${date}</p>`;
    html += `<table><thead><tr>
        <th>Sl No.</th>
        <th>Item</th>
        <th>Qty</th>
        <th>Price/unit</th>
        <th>Total</th>
    </tr></thead><tbody>`;

    let grandTotal = 0;

    items.forEach((item, i) => {
        html += `<tr>
            <td>${i + 1}</td>
            <td>${item.name}</td>
            <td>${item.quantity} ${item.qtyUnit}</td>
            <td>${item.pricePerUnit} / ${item.priceUnit}</td>
            <td>${item.total}</td>
        </tr>`;
        grandTotal += parseFloat(item.total);
    });

    html += `</tbody></table>`;
    html += `<h3>Total: ₹${grandTotal.toFixed(2)}</h3>`;

    receiptDiv.innerHTML = html;
    receiptDiv.style.display = "block";
}

function printReceipt() {
    const receiptDiv = document.getElementById("receipt");
    if (receiptDiv.innerHTML.trim() === "") {
        alert("Please preview the receipt before printing.");
        return;
    }
    window.print();
}
