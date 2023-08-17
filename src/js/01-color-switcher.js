const elements = {
  body: document.querySelector('body'),
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
};

elements.btnStart.addEventListener('click', handlerOnStart);
elements.btnStop.addEventListener('click', handlerOnStop);

let timerId = null;

function handlerOnStart() {
  timerId = setInterval(
    () => (
      (elements.btnStart.disabled = true),
      (elements.body.style.backgroundColor = getRandomHexColor())
    ),
    1000
  );
}
function handlerOnStop() {
  elements.btnStart.disabled = false;
  clearInterval(timerId);
}
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, 0)}`;
}
