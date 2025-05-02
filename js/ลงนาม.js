let blessings = JSON.parse(localStorage.getItem('blessings')) || [];

function displayBlessingList() {
  const reportList = document.getElementById('report-list');
  reportList.innerHTML = ''; // ล้างรายชื่อก่อนแสดงใหม่

  // ถ้ายังไม่มีผู้ลงนาม
  if (blessings.length === 0) {
    const message = document.createElement('li');
    message.textContent = 'ยังไม่มีผู้ลงนาม';
    reportList.appendChild(message);
    return;
  }

  blessings.forEach((entry, index) => {
    const li = document.createElement('li');
    li.textContent = `${entry.name} - ${entry.message}`;

    // ปุ่มลบ
    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete-button';
    deleteButton.textContent = 'ลบ';
    deleteButton.onclick = () => {
      if (confirm(`คุณต้องการลบชื่อ ${entry.name} หรือไม่?`)) {
        deleteBlessing(index);
      }
    };

    li.appendChild(deleteButton);
    reportList.appendChild(li);
  });
}

function deleteBlessing(index) {
  blessings.splice(index, 1);
  localStorage.setItem('blessings', JSON.stringify(blessings));
  displayBlessingList();  // อัพเดทการแสดงผล
}

// เรียกใช้งานฟังก์ชันเมื่อโหลดหน้ารายชื่อ
displayBlessingList();