fetch('https://enteneller.icu:3000/get_tiktok_data') // URL вашего API
.then((response) => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
})
.then((data) => {
  console.log('Data:', data); // Здесь выводим данные на консоль
})
.catch((error) => {
  console.error('Error:', error);
});
