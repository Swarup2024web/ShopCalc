let items = [];

function convertUnits(quantity, fromUnit, toUnit) {
    const unitMap = {
        'g': 1,
        'kg': 1000,
        'pcs': 1
    };

    if (fromUnit === toUnit) return quantity;

    return (quantity * unitMap[fromUnit]) / unitMap[toUnit];
}

function addItem() {
    const itemName = document.getElementById("itemName").value.trim();
    const quantity = parseFloat(document.getElementById("quantity").value);
    const qtyUnit = document.getElementById("qtyUnit").value;
    const pricePerUnit = parseFloat(document.getElementById("pricePerUnit").value);
    const priceUnit = document.getElementById("priceUnit").value;

    if (!itemName || isNaN(quantity) || isNaN(pricePerUnit)) {
        alert("Please enter valid item details.");
        return;
    }

    if ((qtyUnit === 'pcs' && priceUnit !== 'pcs') || (qtyUnit !== 'pcs' && priceUnit === 'pcs')) {
        alert("Quantity and Price units must be compatible (e.g., pcs with pcs, g with g/kg).");
        return;
    }

    let convertedQuantity = convertUnits(quantity, qtyUnit, priceUnit);
    let totalPrice = (convertedQuantity * pricePerUnit).toFixed(2);

    const item = {
        name: itemName,
        quantity: quantity,
        qtyUnit: qtyUnit,
        pricePerUnit: pricePerUnit,
        priceUnit: priceUnit,
        total: totalPrice
    };

    items.push(item);
    document.getElementById("itemName").value = '';
    document.getElementById("quantity").value = '';
    document.getElementById("pricePerUnit").value = '';
    renderItems();
}

function renderItems() {
    const tbody = document.querySelector("#itemTable tbody");
    tbody.innerHTML = "";

    items.forEach((item, index) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity} ${item.qtyUnit}</td>
            <td>${item.pricePerUnit} / ${item.priceUnit}</td>
            <td>₹${item.total}</td>
            <td>
                <button class="edit-btn" onclick="editItem(${index})">Edit</button>
                <button class="delete-btn" onclick="deleteItem(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function editItem(index) {
    const item = items[index];
    document.getElementById("itemName").value = item.name;
    document.getElementById("quantity").value = item.quantity;
    document.getElementById("qtyUnit").value = item.qtyUnit;
    document.getElementById("pricePerUnit").value = item.pricePerUnit;
    document.getElementById("priceUnit").value = item.priceUnit;

    items.splice(index, 1);
    renderItems();
}

function deleteItem(index) {
    if (confirm("Are you sure you want to delete this item?")) {
        items.splice(index, 1);
        renderItems();
    }
}

function previewReceipt() {
    const date = document.getElementById("date").value || new Date().toLocaleDateString();
    const shopName = "Banerjee Bhandar";

    let receipt = `🧾 Receipt\nShop: ${shopName}\nDate: ${date}\n\nItems:\n`;

    let grandTotal = 0;

    items.forEach((item, idx) => {
        receipt += `${idx + 1}. ${item.name} - ${item.quantity} ${item.qtyUnit} x ₹${item.pricePerUnit}/${item.priceUnit} = ₹${item.total}\n`;
        grandTotal += parseFloat(item.total);
    });

    receipt += `\nTotal: ₹${grandTotal.toFixed(2)}`;

    document.getElementById("receiptContent").innerText = receipt;
    document.getElementById("receiptPreview").style.display = "block";
}

function printReceipt() {
    previewReceipt();
    setTimeout(() => {
        window.print();
    }, 300);
         }
