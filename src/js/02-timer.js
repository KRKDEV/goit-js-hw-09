import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const startBtn = document.querySelector('[data-start]');
const dataDays = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');

let todaysDate = new Date();
let selectedDate = new Date();

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0].getTime() <= todaysDate.getTime()) {
      //   window.alert('Please choose a date in the future');
      Notify.warning('Please choose a date in the future');
      startBtn.disabled = true;
    } else {
      startBtn.disabled = false;
      selectedDate = selectedDates[0];
    }
  },
};
flatpickr('#datetime-picker', options);

function addLeadingZero(value) {
  return value.padStart(2, '0');
}
function convertMs(ms) {
  todaysDate = new Date();

  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  dataDays.innerHTML = addLeadingZero(String(days));
  dataHours.innerHTML = addLeadingZero(String(hours));
  dataMinutes.innerHTML = addLeadingZero(String(minutes));
  dataSeconds.innerHTML = addLeadingZero(String(seconds));
}

let timerId = null;

startBtn.addEventListener('click', () => {
  startBtn.disabled = true;
  timerId = setInterval(() => {
    let difference = selectedDate.getTime() - todaysDate.getTime();
    if (difference > 0) {
      convertMs(difference);
    } else {
      clearInterval(timerId);
      Notify.success('Timer has hit 0!');
    }
  }, 1000);
});
