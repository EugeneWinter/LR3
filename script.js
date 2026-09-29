document.getElementById('getWeather').addEventListener('click', function () {
    const cityInput = document.getElementById('city').value.trim();
    const resultDiv = document.getElementById('result');

    if (!cityInput) {
        resultDiv.innerHTML =
            '<p class="error-text">Пожалуйста, введите город</p>';
        return;
    }

    const apiKey = '41f87544d13412ffbd676b9eaee7e8a3';

    const weatherUrl =
        `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(cityInput)}&appid=${apiKey}&units=metric&lang=ru`;

    fetch(weatherUrl)
        .then(response => response.json())
        .then(data => {
            if (data.cod === 200 || data.cod === '200') {
                const temperature = data.main.temp;
                const timezoneOffset = data.timezone;

                renderWeather(data.name, temperature, timezoneOffset);
            } else {
                resultDiv.innerHTML =
                    '<p class="error-text">Город не найден</p>';
            }
        })
        .catch(error => {
            console.error('Ошибка получения данных:', error);

            resultDiv.innerHTML =
                '<p class="error-text">Произошла ошибка при получении данных</p>';
        });
});

function renderWeather(cityName, temperature, timezoneOffsetSec) {
    const nowUtc =
        new Date().getTime() +
        (new Date().getTimezoneOffset() * 60000);

    const localCityDate =
        new Date(nowUtc + (timezoneOffsetSec * 1000));

    const timeString = localCityDate.toLocaleTimeString('ru-RU', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    });

    const dateString = localCityDate.toLocaleDateString('ru-RU', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });

    document.getElementById('result').innerHTML = `
        Температура в ${cityName}: ${Math.round(temperature)}°C<br>
        Текущее время: ${timeString}<br>
        Текущая дата: ${dateString}
    `;
}