const itemList = [];

document.getElementById("addItem").addEventListener("click", () => {
    const item = document.getElementById("item").value.trim();
    const quantity = parseFloat(document.getElementById("quantity").value);
    const qtyUnit = document.getElementById("qtyUnit").value;
    const price = parseFloat(document.getElementById("price").value);
    const priceUnit = document.getElementById("priceUnit").value;

    if (!item || isNaN(quantity) || isNaN(price)) {
        alert("Please enter valid item name, quantity and price.");
        return;
    }

    // Validate and convert units
    let unitCompatible = true;
    let convertedQty = quantity;
    let convertedPrice = price;

    if (qtyUnit === "g" && priceUnit === "kg") {
        convertedPrice = price / 1000; // ₹ per g
    } else if (qtyUnit === "kg" && priceUnit === "g") {
        convertedQty = quantity * 1000; // grams
    } else if (qtyUnit !== priceUnit) {
        alert("Incompatible units selected (e.g., pcs with kg/g not allowed).");
        unitCompatible = false;
    }

    if (!unitCompatible) return;

    const total = (convertedQty * convertedPrice).toFixed(2);

    const itemObj = {
        item,
        quantity,
        qtyUnit,
        price,
        priceUnit,
        total
    };

    itemList.push(itemObj);
    updateTable();
    clearInputs();
});

function updateTable() {
    const tbody = document.querySelector("#itemTable tbody");
    tbody.innerHTML = "";

    itemList.forEach((item, index) => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>${item.item}</td>
            <td>${item.quantity} ${item.qtyUnit}</td>
            <td>₹${item.price} per ${item.priceUnit}</td>
            <td>₹${item.total}</td>
            <td>
                <button onclick="editItem(${index})">Edit</button>
                <button onclick="deleteItem(${index})">Delete</button>
            </td>
        `;

        tbody.appendChild(row);
    });

    const totalAmount = itemList.reduce((sum, item) => sum + parseFloat(item.total), 0).toFixed(2);
    document.getElementById("totalAmount").textContent = `Total: ₹${totalAmount}`;
}

function clearInputs() {
    document.getElementById("item").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("price").value = "";
}

function deleteItem(index) {
    itemList.splice(index, 1);
    updateTable();
}

function editItem(index) {
    const item = itemList[index];

    document.getElementById("item").value = item.item;
    document.getElementById("quantity").value = item.quantity;
    document.getElementById("qtyUnit").value = item.qtyUnit;
    document.getElementById("price").value = item.price;
    document.getElementById("priceUnit").value = item.priceUnit;

    deleteItem(index);
}

document.getElementById("printReceipt").addEventListener("click", () => {
    window.print();
});

document.getElementById("previewReceipt").addEventListener("click", () => {
    alert("Preview is available only through print preview (Ctrl + P).");
});
