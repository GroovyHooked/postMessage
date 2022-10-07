const buttonIframe = document.getElementById('submitiframe');
const textNode = document.getElementById('message');
const display = document.querySelector('.display');
const port = document.querySelector('.port');
let messages;
let message;

port.innerText = extractOrigin(window.location.href);

textNode.addEventListener('input', (event) => {
  message = event.target.value;
});

buttonIframe.addEventListener('click', sendMesage);

addEventListener('message', (e) => {
  if (e.data.message === undefined) return;
  displaymessages(e.data.message);
});

function sendMesage() {
  if (window && window.parent) {
    window.parent.postMessage({ message }, 'http://127.0.0.1:5501');
  }
  textNode.value = '';
  display.scrollTop = display.scrollHeight;
}

function extractOrigin(url) {
  const regex = /\d+\.\d+\.\d+\.\d+\:\d+/g;
  const arr = url.match(regex);
  return arr[0];
}

function displaymessages(messages) {
  while (display.firstChild) display.removeChild(display.firstChild);
  messages.forEach((message) => {
    const msg = document.createElement('p');
    msg.innerText =
      (message[0] === 'iframe1' ? 'me' : message[0]) + ': ' + message[1];
    display.append(msg);
  });
}
