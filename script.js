document.addEventListener("DOMContentLoaded", function () {

  let water = 100;
  let food = 100;
  let energy = 100;
  let alive = true;

  // поиск нужных элементов
  const waterEl = document.querySelector("#water .count");
  const foodEl = document.querySelector("#food .count");
  const energyEl = document.querySelector("#energy .count");

  const drinkBtn = document.querySelector("#drink");
  const eatBtn = document.querySelector("#eat");
  const restBtn = document.querySelector("#rest");

  const alertEl = document.querySelector(".alert");
  alertEl.style.display = "none"; // прячем сообщение в начале

  // функция для обновления экрана
  function updateUI() {
    // новые значения
    waterEl.textContent = water;
    foodEl.textContent = food;
    energyEl.textContent = energy;

    // красим текст в красный если мало
    if (water <= 30) {
      waterEl.style.color = "red";
    } else {
      waterEl.style.color = "black";
    }

    if (food <= 30) {
      foodEl.style.color = "red";
    } else {
      foodEl.style.color = "black";
    }

    if (energy <= 30) {
      energyEl.style.color = "red";
    } else {
      energyEl.style.color = "black";
    }
  }

  // проверка жизни мурзика
  function checkDeath() {
    if (water <= 0 || food <= 0 || energy <= 0) {
      alive = false;

      // предупреждение
      alertEl.style.display = "block";

      // блое кнопок
      drinkBtn.disabled = true;
      eatBtn.disabled = true;
      restBtn.disabled = true;

      // остановка игры
      clearInterval(timer);

      setTimeout(function () {
        let restart = confirm("Кот умер! Начать заново?");
        if (restart) {
          location.reload();
        }
      }, 500);
    }
  }


  function drinkAction() {
    if (!alive) return;
    water = water + 15;
    if (water > 100) {
      water = 100;
    }
    updateUI();
  }

  function eatAction() {
    if (!alive) return;
    food = food + 12;
    if (food > 100) {
      food = 100;
    }
    updateUI();
  }

  function restAction() {
    if (!alive) return;
    energy = energy + 18;
    if (energy > 100) {
      energy = 100;
    }
    updateUI();
  }

  // привязка функции к кнопкам
  drinkBtn.addEventListener("click", drinkAction);
  eatBtn.addEventListener("click", eatAction);
  restBtn.addEventListener("click", restAction);

  // трата ресурсов
  const timer = setInterval(function () {

    if (!alive) return;

    water = water - 8;
    food = food - 7;
    energy = energy - 6;

    if (water < 0) {
      water = 0;
    }
    if (food < 0) {
      food = 0;
    }
    if (energy < 0) {
      energy = 0;
    }

    updateUI();
    checkDeath();
  }, 1000);

  // первый вызов при запуске
  updateUI();
});
