// تحميل الهيدر
fetch('header.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('header').innerHTML = data;
  })
  .catch(err => console.error('Failed to load header:', err));

// تحميل الفوتر
fetch('footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer').innerHTML = data;

    // تحديث السنة في الفوتر بعد تحميله
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
      yearElement.textContent = new Date().getFullYear();
    }
  })
  .catch(err => console.error('Failed to load footer:', err));
