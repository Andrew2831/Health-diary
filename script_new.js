// Отримання посилань на елементи форми та дива для відображення записів
const healthForm = document.getElementById('healthForm');
const entriesDiv = document.getElementById('entries');
const categoryFilterInput = document.getElementById('categoryFilter');
const filterButton = document.getElementById('filterButton');

let entries = [];

// Загрузка записів з LocalStorage при завантаженні сторінки
function loadEntries() {
  const storedEntries = JSON.parse(localStorage.getItem('healthEntries'));
  if (storedEntries) {
    entries = storedEntries;
    displayEntries(entries);
  }
}

loadEntries();

// Функція для збереження даних в LocalStorage та оновлення відображення записів
function saveEntry(event) {
  event.preventDefault();

  const activity = healthForm.activity.value;
  const food = healthForm.food.value;
  const mood = healthForm.mood.value;
  const category = healthForm.category.value;
  const dateTime = new Date().toLocaleString();

  const entry = {
    activity,
    food,
    mood,
    category,
    dateTime
  };

  entries.push(entry);
  localStorage.setItem('healthEntries', JSON.stringify(entries));

  displayEntries(entries);

  healthForm.reset();
}

healthForm.addEventListener('submit', saveEntry);

// Функція для відображення записів
function displayEntries(entriesToDisplay) {
  entriesDiv.innerHTML = '';

  entriesToDisplay.forEach((entry, index) => {
    const entryDiv = document.createElement('div');
    entryDiv.classList.add('entry');

    const activityPara = document.createElement('p');
    activityPara.innerHTML = `<strong>Фізична активність:</strong> ${entry.activity}`;
    entryDiv.appendChild(activityPara);

    const foodPara = document.createElement('p');
    foodPara.innerHTML = `<strong>Їжа:</strong> ${entry.food}`;
    entryDiv.appendChild(foodPara);

    const moodPara = document.createElement('p');
    moodPara.innerHTML = `<strong>Настрій:</strong> ${entry.mood}`;
    entryDiv.appendChild(moodPara);

    const categoryPara = document.createElement('p');
    categoryPara.innerHTML = `<strong>Категорія:</strong> ${entry.category}`;
    entryDiv.appendChild(categoryPara);

    const dateTimePara = document.createElement('p');
    dateTimePara.innerHTML = `<strong>Дата та час:</strong> ${entry.dateTime}`;
    entryDiv.appendChild(dateTimePara);

    const editButton = document.createElement('button');
    editButton.innerText = 'Редагувати';
    editButton.classList.add('edit-btn');
    editButton.addEventListener('click', () => editEntry(index));
    entryDiv.appendChild(editButton);

    const deleteButton = document.createElement('button');
    deleteButton.innerText = 'Видалити';
    deleteButton.classList.add('delete-btn');
    deleteButton.addEventListener('click', () => deleteEntry(index));
    entryDiv.appendChild(deleteButton);

    entriesDiv.appendChild(entryDiv);
  });
}

// Функція для видалення запису
function deleteEntry(index) {
  entries.splice(index, 1);
  localStorage.setItem('healthEntries', JSON.stringify(entries));
  displayEntries(entries);
}

// Функція для редагування запису
function editEntry(index) {
  const entry = entries[index];
  healthForm.activity.value = entry.activity;
  healthForm.food.value = entry.food;
  healthForm.mood.value = entry.mood;
  healthForm.category.value = entry.category;

  // Видалення редагованого запису з масиву
  entries.splice(index, 1);
  localStorage.setItem('healthEntries', JSON.stringify(entries));
  displayEntries(entries);
}

// Функція для фільтрації записів за категорією
function filterEntries() {
  const category = categoryFilterInput.value.toLowerCase();
  const filteredEntries = entries.filter(entry =>
    entry.category.toLowerCase() === category
  );
  displayEntries(filteredEntries);
}

filterButton.addEventListener('click', filterEntries);
