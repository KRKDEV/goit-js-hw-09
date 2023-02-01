import { Notify } from 'notiflix/build/notiflix-notify-aio';

const delayInput = document.querySelector('[name="delay"]');
const stepInput = document.querySelector('[name="step"]');
const amountInput = document.querySelector('[name="amount"]');
const submitBtn = document.querySelector('button');

function createPromise(position, delay) {
  return new Promise((fulfill, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        // Fulfill
        fulfill({ position, delay });
      } else {
        // Reject
        reject({ position, delay });
      }
    }, delay);
  });
}

submitBtn.addEventListener('click', event => {
  event.preventDefault();
  let delay = parseInt(delayInput.value);
  for (let i = 1; i <= Number(amountInput.value); i++) {
    createPromise(i, delay)
      .then(({ position, delay }) => {
        Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
    delay = delay + parseInt(stepInput.value);
  }
});
