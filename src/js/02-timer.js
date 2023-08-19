import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const elements = {
  input: document.querySelector('#datetime-picker'),
  btnStart: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

elements.btnStart.disabled = true;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (options.defaultDate > selectedDates[0]) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else elements.btnStart.disabled = false;
    elements.btnStart.addEventListener('click', handlerOnClick);
    function handlerOnClick() {
      let timerDataInterval = setInterval(() => {
        const difTime = selectedDates[0] - new Date();
        const timeLeft = convertMs(difTime);
        elements.days.textContent = addLeadingZero(timeLeft.days);
        elements.hours.textContent = addLeadingZero(timeLeft.hours);
        elements.minutes.textContent = addLeadingZero(timeLeft.minutes);
        elements.seconds.textContent = addLeadingZero(timeLeft.seconds);
        if (new Date() >= selectedDates[0]) {
          clearInterval(timerDataInterval);
          elements.btnStart.disabled = true;
          elements.days.textContent = '00';
          elements.hours.textContent = '00';
          elements.minutes.textContent = '00';
          elements.seconds.textContent = '00';
          Notiflix.Notify.success('Timer reached the end.');
        }
      }, 1000);
    }
  },
};

flatpickr(elements.input, options);

function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
