
import { db } from './config.js';
import { ref, onValue } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const table = document.getElementById('orderTable');

onValue(ref(db, 'orders'), (snapshot) => {
    table.innerHTML = '';
    snapshot.forEach((child) => {
        const data = child.val();

        const row = document.createElement('tr');
        row.innerHTML = `
      <td>${data.orderDate}</td>
      <td>${data.customerName}</td>
      <td>${data.totalPrice} บาท</td>
      <td><button onclick="viewDetail('${child.key}')">ดู</button></td>
    `;
        table.appendChild(row);
    });
});

window.viewDetail = function (id) {
    alert("ระบบตัวอย่าง \nสามารถทำหน้าแสดงรายละเอียดเพิ่มได้");
};
