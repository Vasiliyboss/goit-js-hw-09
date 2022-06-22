import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
const inputTimer = document.querySelector('#datetime-picker');
const btn = document.querySelector('button[data-start]');
const daysForTimer = document.querySelector('[data-days]');
const hoursForTimer = document.querySelector('[data-hours]');
const minutesForTimer = document.querySelector('[data-minutes]');
const secondsFortimer = document.querySelector('[data-seconds]');

btn.setAttribute('disabled', 'disabled');

btn.addEventListener('click', () => { timer.start(); });
let turgetDate = null;
let deltaTime = null;
let intervalId = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < options.defaultDate) {
      Notiflix.Notify.failure("Please choose a date in the future");
      return;
    }
    
      turgetDate = selectedDates[0];
      btn.removeAttribute('disabled');
    
  },
};
flatpickr(inputTimer, options);

const timer = {
  isActive: false,

  start() {
    if (this.isActive) { 
      return
    }
    this.isActive = true;
    
    intervalId = setInterval(() => {
      deltaTime = turgetDate - Date.now();
      // const timeComponents = convertMs(deltaTime);
      updateClockFace(deltaTime);
      
    }, 1000)
  }
};

function updateClockFace(deltaTime) { 
  daysForTimer.textContent = convertMs(deltaTime).days;
  hoursForTimer.textContent = convertMs(deltaTime).hours;
  minutesForTimer.textContent = convertMs(deltaTime).minutes;
  secondsFortimer.textContent = convertMs(deltaTime).seconds;
}

function addLeadingZero(value) { 
  return String(value).padStart(2, '0');
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero( Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}


