import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const datetimePicker = flatpickr('#datetime-picker', {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    handleDateSelection(selectedDates[0]);
  },
});

const startButton = document.querySelector('[data-start]');
const daysElement = document.querySelector('[data-days]');
const hoursElement = document.querySelector('[data-hours]');
const minutesElement = document.querySelector('[data-minutes]');
const secondsElement = document.querySelector('[data-seconds]');

let countdownInterval;

function formatTwoDigitNumber(number) {
  return number.toString().padStart(2, '0');
}

function convertMs(ms) {
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function handleDateSelection(selectedDate) {
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    window.alert('Please choose a date in the future');
    startButton.disabled = true;

    datetimePicker.clear();
  } else {
    startButton.disabled = false;
  }
}

datetimePicker.config.onChange.push((selectedDates, dateStr) => {
  const selectedDate = selectedDates[0];
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    startButton.disabled = true;
  } else {
    startButton.disabled = false;
  }
});

function startCountdown() {
  const selectedDate = datetimePicker.selectedDates[0];
  const currentDate = new Date();

  const timeDifference = selectedDate - currentDate;

  if (timeDifference < 0) {
    clearInterval(countdownInterval);
    resetTimer();
    return;
  }

  const { days, hours, minutes, seconds } = convertMs(timeDifference);

  daysElement.textContent = addLeadingZero(days);
  hoursElement.textContent = addLeadingZero(hours);
  minutesElement.textContent = addLeadingZero(minutes);
  secondsElement.textContent = addLeadingZero(seconds);
}

function resetTimer() {
  clearInterval(countdownInterval);
  startButton.disabled = true;
  daysElement.textContent = '00';
  hoursElement.textContent = '00';
  minutesElement.textContent = '00';
  secondsElement.textContent = '00';
}

startButton.addEventListener('click', () => {
  const selectedDate = datetimePicker.selectedDates[0];
  const currentDate = new Date();

  if (selectedDate <= currentDate) {
    window.alert('Please choose a date in the future');
    datetimePicker.clear();
    startButton.disabled = true;
    return;
  }

  startCountdown();
  startButton.disabled = true;

  countdownInterval = setInterval(startCountdown, 1000);
});

const goBackLink = document.querySelector('p a');
goBackLink.addEventListener('click', () => {
  resetTimer();
  datetimePicker.clear();
});
