const wsUri = "wss://echo.websocket.org/";
const mapUrl = 'https://www.openstreetmap.org/';

const output = document.querySelector(".output");
const btnSend = document.querySelector('.caht__btn');
const btnGeolocation = document.querySelector('.caht__geolocation');

const message = document.querySelector('.message')

let websocket;
let direction = '';

window.onload = function() {
    websocket = new WebSocket(wsUri);
    websocket.onopen =  function(event) {
        // writeToScreen("CONNECTED", 'in');
    };
    websocket.onclose = function(event) {
        // writeToScreen("DISCONNECTED", 'in');
    };
    websocket.onmessage = function(event) {
        let data = event.data;
        if (data !== mapUrl) {
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
  messageText !== '' ? writeToScreen(messageText, 'out', false) : '';
  websocket.send(messageText);
});

btnGeolocation.addEventListener('click', () => {
    // console.log(mapUrl);
    // mapUrl.pathname = "/\#map=16/55.7906/49.2486";
    // console.log(mapUrl);
    writeToScreen(
        `<a class="chat__link" href="${mapUrl}" target="_blank" rel="noopener noreferrer">
            <strong>Гео-локация</strong>
        </a>`, 
        'out'
    );
    websocket.send(mapUrl);
})