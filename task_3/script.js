const geolocationInfo = document.querySelector('.geolocation__info');
const button = document.querySelector('.btn');

button.addEventListener('click', () => {
    screenSize();
    getGeoLocation();
})

function screenSize(){
    const deviceScreen = document.querySelector('.device');
    const windowInnerScreen = document.querySelector('.window_inner');
    const windowScreen = document.querySelector('.window');
    const body = document.querySelector('body');
    
    deviceScreen.innerHTML = `<strong>${window.screen.width} x ${window.screen.height}</strong>`;
    windowInnerScreen.innerHTML = `<strong>${window.innerWidth} x ${window.innerHeight}</strong>`;
    windowScreen.innerHTML = `<strong>${body.clientWidth} x ${body.clientHeight}</strong>`;
};

function getGeoLocation() {
    if (!navigator.geolocation) {
        geolocationInfo.innerHTML = '<strong>Geolocation не поддерживается вашим браузером</strong>';        
    } else {
        geolocationInfo.innerText = 'Определение местоположения…';
        navigator.geolocation.getCurrentPosition(success, error); 
    }
}

const success = (position) => {
    const { coords } = position;
    const longitude = Math.round(coords.longitude * 100) / 100;
    const latitude = Math.round(coords.latitude * 100) / 100;
    geolocationInfo.innerHTML = `<strong>Долгота: ${longitude.toLocaleString()}; Широта: ${latitude.toLocaleString()}</strong>`;
}

const error = () => {
    geolocationInfo.innerHTML = '<strong>Информация о местоположении недоступна</strong>';
}