const recoveredMessages = JSON.parse(localStorage.getItem('storage'));
const messages = [];

for (let i = 0; i <= Object.keys(recoveredMessages).length; i++) {
  if (recoveredMessages[i] === undefined) continue;
  messages.push(recoveredMessages[i]);
}

addEventListener('message', (e) => {
  handleMessage(e);
});

function handleMessage(event) {
  if (event.origin === 'http://127.0.0.1:5501') {
    console.log({ message: event.data.message }, 'comes from 5501');
    messages.push(['iframe1', event.data.message]);
    sendpostMessages(messages);
  }
  if (event.origin === 'http://127.0.0.1:5502') {
    console.log({ message: event.data.message }, 'comes from 5502');
    messages.push(['iframe2', event.data.message]);
    sendpostMessages(messages);
  }
}

function sendpostMessages(messages) {
  console.log('parent', { messages });
  const ports = ['5501', '5502'];
  for (let i = 0; i < 2; i++) {
    window.frames[i].postMessage(
      { message: messages },
      `http://127.0.0.1:${ports[i]}`
    );
  }
}
