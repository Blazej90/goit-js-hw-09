// Pobranie przycisków
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

// Dodanie obsługi zdarzeń dla przycisków
startButton.addEventListener('click', startColorChanging);
stopButton.addEventListener('click', stopColorChanging);

// Funkcja generująca losowy kolor
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let intervalId; // Zmienna przechowująca identyfikator interwału

// Funkcja uruchamiająca zmianę koloru co sekundę
function startColorChanging() {
  // Dezaktywacja przycisku "start"
  startButton.disabled = true;

  // Uruchomienie interwału zmiany koloru co sekundę
  intervalId = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

// Funkcja zatrzymująca zmianę koloru
function stopColorChanging() {
  // Aktywacja przycisku "start"
  startButton.disabled = false;

  // Zatrzymanie interwału
  clearInterval(intervalId);
}
