const wsUri = "wss://echo.websocket.org/";
const output = document.querySelector(".output");
const btnSend = document.querySelector('.caht__btn');
const btnGeolocation = document.querySelector('.caht__geolocation');
const message = document.querySelector('.message')
const mute = document.getElementById('mute');

let websocket;

// document.addEventListener('DOMContentLoaded', async function(event) {
window.onload = function () {
    mute.className = 'on';
    mute.innerHTML = '<div class="loader"></div>';

    websocket = new WebSocket(wsUri);
    websocket.onopen =  function(event) {
        // writeToScreen("CONNECTED", 'in');
        btnSend.style.visibility = 'visible';
        btnGeolocation.style.visibility = 'visible';
        mute.className = '';
        mute.innerHTML = '';
    };
    websocket.onclose = function(event) {
        // writeToScreen("DISCONNECTED", 'in');
        btnSend.style.visibility = 'hidden';
        btnGeolocation.style.visibility = 'hidden';
    };
    websocket.onmessage = function(event) {
        let data = JSON.parse(event.data);
        if (!data.hasOwnProperty('geolocation')) {
            writeToScreen(data, 'in');
        }
        
    };
    websocket.onerror = function(event) {
        writeToScreen(
            '<span style="color: red;">ERROR:</span> ' + event.data,
            'in'
        );
    };
};

window.onbeforeunload = function() {
    websocket.close();
    websocket = null;
};

function writeToScreen(message, direction) {
    let pre = document.createElement("p");
    pre.style.wordWrap = "break-word";
    pre.innerHTML = message;
    pre.className = direction === 'out' ? 'outgoing' : 'incoming';
    output.appendChild(pre);
}

btnSend.addEventListener('click', () => {
  let messageText = message.value;
  if (messageText !== '') {
    writeToScreen(messageText, 'out');
    websocket.send(JSON.stringify(messageText));
  } else {
      return;
  } 
});

btnGeolocation.addEventListener('click', () => {
    const mapUrl = new URL('https://www.openstreetmap.org');
    mapUrl.hash = "#map=16/55.7906/49.2486";
    writeToScreen(
        `<a class="chat__link" href="${mapUrl}" target="_blank" rel="noopener noreferrer">
            <strong>Гео-локация</strong>
        </a>`, 
        'out'
    );
    websocket.send(JSON.stringify({geolocation: mapUrl}));
})