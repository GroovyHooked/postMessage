const buttonIframe1 = document.getElementById('submitiframe1');
const textNode = document.getElementById('message1');
const display = document.querySelector('.display');
const port = document.querySelector('.port');
const messages = [];
let message;

port.innerText = extractOrigin(window.location.href);

textNode.addEventListener('input', (event) => {
  message = event.target.value;
});

buttonIframe1.addEventListener('click', sendMesage);

addEventListener('message', (e) => {
  if (e.data.message === undefined) return;
  messages.push(e.data.message);
  displaymessages(messages);
});

function sendMesage() {
  if (window && window.parent) {
    window.parent.postMessage(
      {
        message: message,
      },
      'http://127.0.0.1:5501'
    );
  }
}

function displaymessages(messages) {
  while (display.firstChild) display.removeChild(display.firstChild);
  messages.forEach((message) => {
    const msg = document.createElement('p');
    msg.innerText = message;
    display.append(msg);
  });
}

function extractOrigin(url) {
  const regex = /\d+\.\d+\.\d+\.\d+\:\d+/g;
  const arr = url.match(regex);
  return arr[0];
}
