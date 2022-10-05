const buttonIframe1 = document.getElementById('submitiframe1');
const textNode = document.getElementById('message1');
const display = document.querySelector('.display');
const port = document.querySelector('.port');
let myText;
console.log(window.location.href);
textNode.addEventListener('input', (event) => {
  myText = event.target.value;
});
const sendMesage = () => {
  const textNode = document.getElementById('message1');
  if (window && window.parent) {
    window.parent.postMessage(
      {
        message: myText,
      },
      'http://127.0.0.1:5501'
    );
  }
};
buttonIframe1.addEventListener('click', sendMesage);

const messages = [];

addEventListener('message', function (e) {
  if (e.data.message === undefined) return;
  messages.push(e.data.message);
  displaymessages(messages);
});

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
port.innerText = extractOrigin(window.location.href);
