import Notiflix from 'notiflix';

const elements = {
  form: document.querySelector('.form'),
  submitBtn: document.querySelector('button'),
  firstDelay: document.querySelector('input[name="delay"]'),
  stepDelay: document.querySelector('input[name="step"]'),
  amount: document.querySelector('input[name="amount"]'),
};

elements.submitBtn.addEventListener('click', handlerSubmit);

function handlerSubmit(evt) {
  evt.preventDefault();
  let delay = Number(elements.firstDelay.value);

  const step = Number(elements.stepDelay.value);
  const amoun = Number(elements.amount.value);
  let position;

  for (let i = 1; i <= amoun; i += 1) {
    createPromise(i, delay);
    delay += step;
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
    })
    .finally(() => elements.form.reset());
}
