import Notiflix from 'notiflix';

const form = document.querySelector("form");
form.addEventListener("submit", startForm );

function startForm (event) {
  event.preventDefault();
  let delay = Number(document.querySelector('[name="delay"]').value);
  const step = Number(document.querySelector('[name="step"]').value);
  const amount = Number(document.querySelector('[name="amount"]').value);

  for (let i = 1; i <= amount; i += 1) {
    createPromise (i, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
      });
      delay += step;
  };
    form.reset();
};

function createPromise(position, delay) {
  return new Promise ((resolve, reject) => {
    setTimeout (() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delay});
      } else {
        reject({position, delay});
      }
    }, delay);
  });
}