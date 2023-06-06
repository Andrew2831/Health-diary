// Отримання посилань на елементи форми та див для відображення записів
const healthForm = document.getElementById('healthForm');
const activityInput = document.getElementById('activity');
const foodTextarea = document.getElementById('food');
const moodSelect = document.getElementById('mood');
const entriesDiv = document.getElementById('entries');

// Функція для збереження даних в LocalStorage
function saveEntry(event) {
  event.preventDefault(); // Зупинка перезавантаження сторінки

  // Отримання значень з полів вводу
  const activity = activityInput.value;
  const food = foodTextarea.value;
  const mood = moodSelect.value;
  
  // Отримання поточної дати та часу
  const currentDate = new Date();
  const dateTime = currentDate.toLocaleString();

  // Створення об'єкту для запису з датою та часом
  const entry = {
    activity: activity,
    food: food,
    mood: mood,
    dateTime: dateTime
  };

  // Отримання попередньо збережених записів з LocalStorage або створення нового масиву, якщо записів немає
  let entries = JSON.parse(localStorage.getItem('healthEntries')) || [];

  // Додавання нового запису до масиву
  entries.push(entry);

  // Збереження оновленого масиву в LocalStorage
  localStorage.setItem('healthEntries', JSON.stringify(entries));

  // Оновлення відображення записів
  displayEntries(entries);

  // Очищення полів форми
  healthForm.reset();
}

// Функція для відображення записів
function displayEntries(entries) {
  // Очищення вмісту <div>
  entriesDiv.innerHTML = '';

  // Ітерація по записам і створення HTML-коду для кожного запису
  entries.forEach((entry, index) => {
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('entry');
    entryDiv.innerHTML = `
      <h3>Запис ${index + 1}</h3>
      <p><strong>Фізична активність:</strong> ${entry.activity}</p>
      <p><strong>Їжа:</strong> ${entry.food}</p>
      <p><strong>Настрій:</strong> ${entry.mood}</p>
      <p><strong>Дата та час:</strong> ${entry.dateTime}</p>
    `;
    entriesDiv.appendChild(entryDiv);
  });
}

// Отримання раніше збережених записів та їх відображення при завантаженні сторінки
const storedEntries = JSON.parse(localStorage.getItem('healthEntries'));
if (storedEntries) {
  displayEntries(storedEntries);
}

// Додавання обробника події для форми збереження
healthForm.addEventListener('submit', saveEntry);
