const messages = [];
let count = 0;

addEventListener('message', (e) => {
  handleMessage(e);
});

function handleMessage(event) {
  if (event.origin === 'http://127.0.0.1:5501') {
    console.log({ message: event.data.message }, 'comes from 5501');
    messages.push(['iframe1', event.data.message]);
    sendpostMessages(storeAndExtractMessages, messages);
  }
  if (event.origin === 'http://127.0.0.1:5502') {
    console.log({ message: event.data.message }, 'comes from 5502');
    messages.push(['iframe2', event.data.message]);
    sendpostMessages(storeAndExtractMessages, messages);
  }
}

function sendpostMessages(callback, messages) {
  const ports = ['5501', '5502'];
  for (let i = 0; i < 2; i++) {
    window.frames[i].postMessage(
      { message: callback(messages) },
      `http://127.0.0.1:${ports[i]}`
    );
  }
}

function storeAndExtractMessages(messages) {
  localStorage.setItem('storage', JSON.stringify(messages));
  const storage = JSON.parse(localStorage.getItem('storage'));
  return storage;
}
