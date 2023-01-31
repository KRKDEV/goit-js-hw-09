const body = document.querySelector('body');
const startButton = document.querySelector('[data-start]');
const stopButton = document.querySelector('[data-stop]');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

let timer = null;
startButton.addEventListener('click', () => {
  startButton.disabled = true;
  stopButton.disabled = false;
  body.style.backgroundColor = `${getRandomHexColor()}`;
  timer = setInterval(() => {
    let randomColor = getRandomHexColor();
    body.style.backgroundColor = `${randomColor}`;
  }, 1000);
});

stopButton.addEventListener('click', () => {
  stopButton.disabled = true;
  startButton.disabled = false;
  clearInterval(timer);
});
