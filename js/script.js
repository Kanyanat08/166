let blessings = JSON.parse(localStorage.getItem('blessings')) || [];

function submitBlessing(event) {
  event.preventDefault();
  const name = event.target.name.value.trim();
  const message = event.target.message.value.trim();

  if (name && message) {
    const newEntry = { name, message };
    blessings.push(newEntry);
    localStorage.setItem('blessings', JSON.stringify(blessings));

    alert(`ขอบคุณคุณ ${name} ที่ร่วมถวายพระพร`);
    event.target.reset();
  } else {
    alert('กรุณากรอกชื่อและข้อความก่อนลงนาม');
  }
}

function deleteBlessing(index) {
  const confirmDelete = confirm(`ต้องการลบชื่อ ${blessings[index].name} หรือไม่?`);
  if (confirmDelete) {
    blessings.splice(index, 1);
    localStorage.setItem('blessings', JSON.stringify(blessings));
    updateBlessingList();
  }
}

function showBlessingReport() {
  if (blessings.length === 0) {
    alert('ยังไม่มีผู้ลงนาม');
    return;
  }

  let reportHTML = `<h2>รายชื่อผู้ลงนามถวายพระพร</h2><ol>`;
  blessings.forEach((entry, index) => {
    reportHTML += `<li>${entry.name} - ${entry.message}</li>`;
  });
  reportHTML += `</ol>`;

  const reportWindow = window.open('', '_blank');
  reportWindow.document.write(`
    <html>
      <head>
        <title>รายงานรายชื่อผู้ลงนาม</title>
        <meta charset="UTF-8">
        <style>
          body { font-family: 'Sarabun', sans-serif; padding: 20px; }
          h2 { color: #b89010; }
          ol { padding-left: 20px; }
          li { margin-bottom: 10px; }
        </style>
      </head>
      <body>${reportHTML}</body>
    </html>
  `);
  reportWindow.document.close();
}