const status = document.querySelector('.status');
const button = document.querySelector('.btn');

button.addEventListener('click', () => {
    getGeoLocation();
})

function getGeoLocation() {
    if (!navigator.geolocation) {
        status.innerHTML = '<strong>Geolocation не поддерживается вашим браузером</strong>';        
    } else {
        status.innerHTML = '<strong>Определение местоположения…</strong>';
        navigator.geolocation.getCurrentPosition(success, error);
        status.innerHTML = '';
    }
}

const success = (position) => {
    const { coords } = position;
    url = setUrl(coords);
    getApiData(url);
}

const error = () => {
    status.innerHTML = '<strong>Информация о местоположении недоступна</strong>';
}

function setUrl(coords) {
    const url = new URL('/timezone', 'https://api.ipgeolocation.io');
    const apiKey = 'b8beb70492cd4a70bb21d11d4c7cd040';
    url.searchParams.set('apiKey', apiKey);
    url.searchParams.set('lat', coords.latitude);
    url.searchParams.set('long', coords.longitude);
    return url;
}

async function getApiData(url) {
    await fetch(url)
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const timezone = document.querySelector('.timezone');
            const dateTime = document.querySelector('.date_time');
            const date = new Date(data.date).toLocaleDateString();
            timezone.innerHTML = `<strong>${data.timezone}</strong>`;
            dateTime.innerHTML = `<strong>${date} ${data.time_24}</strong>`;
        })
        .catch(() => console.log('Ошибка'));
}
