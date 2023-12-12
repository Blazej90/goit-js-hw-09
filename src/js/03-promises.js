function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}

// Obsługa formularza
document.addEventListener('DOMContentLoaded', () => {
  const form = document.querySelector('.form');

  form.addEventListener('submit', async event => {
    event.preventDefault();

    const formData = new FormData(form);
    const firstDelay = parseInt(formData.get('delay'), 10);
    const step = parseInt(formData.get('step'), 10);
    const amount = parseInt(formData.get('amount'), 10);

    for (let i = 0; i < amount; i++) {
      const position = i + 1;
      const currentDelay = firstDelay + i * step;

      try {
        const result = await createPromise(position, currentDelay);
        console.log(
          `✅ Fulfilled promise ${result.position} in ${result.delay}ms`
        );
      } catch (error) {
        console.log(
          `❌ Rejected promise ${error.position} in ${error.delay}ms`
        );
      }
    }
  });
});
