addEventListener('message', function (e) {
  handleMessage(e);
});

function handleMessage(event) {
  if (event.origin === 'http://127.0.0.1:5500') {
    window.frames[1].postMessage(
      { message: event.data.message },
      'http://127.0.0.1:5502'
    );
  }
  if (event.origin === 'http://127.0.0.1:5502') {
    window.frames[0].postMessage(
      { message: event.data.message },
      'http://127.0.0.1:5500'
    );
  }
}
