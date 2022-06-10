const btnStart = document.querySelector('button[data-start]');
const btnStop = document.querySelector('button[data-stop]');
let timerId = null;
function changeColorBackground() {
    btnStop.removeAttribute('disabled');
    btnStart.setAttribute('disabled', true);
    timerId = setInterval(() => {
        document.body.style.backgroundColor = getRandomHexColor();
    }, 1000);
    
function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
}
btnStop.addEventListener('click', () => {
    btnStart.removeAttribute('disabled');
    btnStop.setAttribute('disabled', true);
    clearInterval(timerId);
    console.log("hello");
});
btnStart.addEventListener('click', changeColorBackground);
btnStop.setAttribute('disabled', true);