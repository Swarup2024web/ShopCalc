let items = [];

function addItem() {
    const itemName = document.getElementById("itemName").value.trim();
    const quantity = parseFloat(document.getElementById("quantity").value);
    const quantityUnit = document.getElementById("quantityUnit").value;
    const price = parseFloat(document.getElementById("price").value);
    const priceUnit = document.getElementById("priceUnit").value;

    if (!itemName || isNaN(quantity) || isNaN(price)) {
        alert("Please enter all fields correctly.");
        return;
    }

    // Convert units to base (grams or pcs)
    const convertedQty = convertToGramsOrPcs(quantity, quantityUnit);
    const convertedPricePerGram = convertPriceToPerGram(price, priceUnit);

    // Calculate total
    const total = (convertedQty * convertedPricePerGram).toFixed(2);

    const item = {
        name: itemName,
        quantity: quantity,
        quantityUnit: quantityUnit,
        price: price,
        priceUnit: priceUnit,
        total: total
    };

    items.push(item);
    renderItems();
    clearInputs();
}

function convertToGramsOrPcs(value, unit) {
    if (unit === "kg") return value * 1000;
    return value; // for g or pcs
}

function convertPriceToPerGram(price, unit) {
    if (unit === "kg") return price / 1000;
    return price; // for g or pcs
}

function renderItems() {
    const tbody = document.getElementById("itemList");
    tbody.innerHTML = "";

    let totalAmount = 0;

    items.forEach((item, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `
            <td>${item.name}</td>
            <td>${item.quantity} ${item.quantityUnit}</td>
            <td>₹${item.price} / ${item.priceUnit}</td>
            <td>₹${item.total}</td>
            <td class="action-buttons">
                <button onclick="editItem(${index})">Edit</button>
                <button onclick="deleteItem(${index})">Delete</button>
            </td>
        `;
        tbody.appendChild(tr);
        totalAmount += parseFloat(item.total);
    });

    document.getElementById("totalAmount").innerText = `Total: ₹${totalAmount.toFixed(2)}`;
}

function clearInputs() {
    document.getElementById("itemName").value = "";
    document.getElementById("quantity").value = "";
    document.getElementById("price").value = "";
    document.getElementById("quantityUnit").value = "pcs";
    document.getElementById("priceUnit").value = "pcs";
}

function deleteItem(index) {
    items.splice(index, 1);
    renderItems();
}

function editItem(index) {
    const item = items[index];
    document.getElementById("itemName").value = item.name;
    document.getElementById("quantity").value = item.quantity;
    document.getElementById("quantityUnit").value = item.quantityUnit;
    document.getElementById("price").value = item.price;
    document.getElementById("priceUnit").value = item.priceUnit;

    deleteItem(index);
}

function previewReceipt() {
    const shopName = "Banerjee Bhandar";
    const date = document.getElementById("date").value;
    if (!date) {
        alert("Please select a date.");
        return;
    }

    let previewText = `🧾 ${shopName}\n📅 Date: ${date}\n\n`;
    let total = 0;

    items.forEach(item => {
        previewText += `${item.name} - ${item.quantity} ${item.quantityUnit} @ ₹${item.price}/${item.priceUnit} = ₹${item.total}\n`;
        total += parseFloat(item.total);
    });

    previewText += `\nTotal: ₹${total.toFixed(2)}`;
    alert(previewText);
}

function printReceipt() {
    window.print();
}
