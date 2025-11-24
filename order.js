import { db } from "./config.js";
import { ref, push } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

let items = [];
let total = 0;

// รอให้หน้าโหลดก่อน
document.addEventListener("DOMContentLoaded", () => {

    document.getElementById("addBtn").addEventListener("click", addItem);
    document.getElementById("saveBtn").addEventListener("click", saveOrder);

});

function addItem() {
    const name = document.getElementById("productName").value;
    const qty = parseInt(document.getElementById("qty").value);
    const priceBuy = parseFloat(document.getElementById("priceBuy").value) || 0;
    const priceSell = parseFloat(document.getElementById("priceSell").value);

    if (!name || !qty || !priceSell) {
        alert("กรุณากรอกข้อมูลสินค้าให้ครบ");
        return;
    }

    const itemTotal = qty * priceSell;

    items.push({
        name,
        qty,
        priceBuy,
        priceSell,
        itemTotal
    });

    renderItems();
    clearInputs();
}

function renderItems() {
    const list = document.getElementById("itemList");
    list.innerHTML = "";
    total = 0;

    items.forEach((item) => {
        total += item.itemTotal;

        const li = document.createElement("li");
        li.className = "list-group-item d-flex justify-content-between align-items-center";
        li.innerHTML = `
            ${item.name} (${item.qty} ชิ้น)
            <span>${item.itemTotal.toLocaleString()} บาท</span>
        `;
        list.appendChild(li);
    });

    document.getElementById("totalPrice").textContent = total.toLocaleString();
}

function clearInputs() {
    document.getElementById("productName").value = "";
    document.getElementById("qty").value = "";
    document.getElementById("priceBuy").value = "";
    document.getElementById("priceSell").value = "";
}

async function saveOrder() {
    if (items.length === 0) {
        alert("ยังไม่มีรายการสินค้า");
        return;
    }

    const orderDate = document.getElementById("orderDate").value;
    const shippingDate = document.getElementById("shippingDate").value;
    const fromShop = document.getElementById("fromShop").value;
    const customerName = document.getElementById("customerName").value;

    const orderData = {
        orderDate,
        shippingDate,
        fromShop,
        customerName,
        items,
        totalPrice: total,
        createdAt: Date.now()
    };

    await push(ref(db, "orders"), orderData);

    alert("✅ บันทึกออเดอร์เรียบร้อยแล้ว!");

    items = [];
    renderItems();
}
