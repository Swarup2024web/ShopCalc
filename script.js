let items = [];

document.getElementById("addItemBtn").addEventListener("click", addItem);
document.getElementById("previewBtn").addEventListener("click", previewReceipt);
document.getElementById("printBtn").addEventListener("click", () => window.print());

function getConversionFactor(qtyUnit, priceUnit) {
    const conversion = {
        g: { kg: 0.001 },
        kg: { g: 1000 },
        ml: { l: 0.001 },
        l: { ml: 1000 }
    };

    if (qtyUnit === priceUnit) return 1;

    return conversion[qtyUnit]?.[priceUnit] || (1 / (conversion[priceUnit]?.[qtyUnit] || 1));
}

function addItem() {
    const name = document.getElementById("itemName").value.trim();
    const qty = parseFloat(document.getElementById("itemQty").value);
    const qtyUnit = document.getElementById("qtyUnit").value;
    const pricePerUnit = parseFloat(document.getElementById("itemPrice").value);
    const priceUnit = document.getElementById("priceUnit").value;

    if (!name || isNaN(qty) || isNaN(pricePerUnit)) {
        alert("Please enter valid item details.");
        return;
    }

    const factor = getConversionFactor(qtyUnit, priceUnit);
    const convertedQty = qty * factor;
    const total = convertedQty * pricePerUnit;

    items.push({ name, qty, qtyUnit, pricePerUnit, priceUnit, total });
    clearInputs();
    updateReceipt();
}

function clearInputs() {
    document.getElementById("itemName").value = "";
    document.getElementById("itemQty").value = "";
    document.getElementById("itemPrice").value = "";
}

function updateReceipt() {
    const tbody = document.querySelector("#itemTable tbody");
    tbody.innerHTML = "";

    let grandTotal = 0;

    items.forEach((item, index) => {
        grandTotal += item.total;

        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.qty} ${item.qtyUnit}</td>
            <td>${item.pricePerUnit} per ${item.priceUnit}</td>
            <td>₹${item.total.toFixed(2)}</td>
            <td>
                <button onclick="editItem(${index})">Edit</button>
                <button onclick="deleteItem(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });

    document.getElementById("totalAmount").textContent = grandTotal.toFixed(2);
}

function deleteItem(index) {
    if (confirm("Delete this item?")) {
        items.splice(index, 1);
        updateReceipt();
    }
}

function editItem(index) {
    const item = items[index];
    document.getElementById("itemName").value = item.name;
    document.getElementById("itemQty").value = item.qty;
    document.getElementById("qtyUnit").value = item.qtyUnit;
    document.getElementById("itemPrice").value = item.pricePerUnit;
    document.getElementById("priceUnit").value = item.priceUnit;

    items.splice(index, 1);
    updateReceipt();
}

function previewReceipt() {
    const shopName = "Banerjee Bhandar";
    const date = document.getElementById("shopDate").value;
    const previewArea = document.getElementById("receiptArea");

    if (!date) {
        alert("Please select a date.");
        return;
    }

    previewArea.querySelector(".receipt-title").textContent = shopName;
    previewArea.querySelector(".receipt-date").textContent = `Date: ${date}`;
    updateReceipt();
                              }
