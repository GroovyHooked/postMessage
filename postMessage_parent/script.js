const messages = [];
const display = document.querySelectorAll('.display');
console.log({ display });

addEventListener('message', (e) => {
  handleMessage(e);
});

function handleMessage(event) {
  if (event.origin === 'http://127.0.0.1:5500') {
    console.log({ message: event.data.message }, 'comes from 5500');
    messages.push(['iframe1', event.data.message]);
    //console.log(messages);
    window.frames[1].postMessage(
      { message: messages },
      'http://127.0.0.1:5502'
    );
  }
  if (event.origin === 'http://127.0.0.1:5502') {
    console.log({ message: event.data.message }, 'comes from 5502');
    messages.push(['iframe2', event.data.message]);
    //console.log(messages);
    window.frames[0].postMessage(
      { message: messages },
      'http://127.0.0.1:5500'
    );
  }
}
