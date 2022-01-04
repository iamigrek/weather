const searchBtn = document.querySelector('.search__btn');

searchBtn.addEventListener('click', search);
document.addEventListener('DOMContentLoaded', search);

//Функция для поиска нужного города
function search(e) {
  e.preventDefault();
  const searchInput = document.querySelector('.search__input').value.trim();
  //В случае пустоты, показывает Киев
  let city = searchInput === '' ? 'Kiev' : searchInput;

  //Вызов функции для получения данных
  load(city);
}

//Функция для получения данных
function load(city) {
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=9c5d8334698fd25d33f2a2dd3bb6b2ce`;

  fetch(url)
    .then(function (response, resolve) {
      return response.json();
    })
    .then(function (data) {
      //Статус запроса
      const code = data['cod'];

      //Проверка на результат
      if (code != 404) {
        document.querySelector('.card__wrapper').style.opacity = 1;
        document.querySelector('.card__status').style.display = 'none';

        const weather = data['weather'][0]['icon'];
        const temp = data['main']['temp'];
        const wind = data['wind']['speed'];
        const humidity = data['main']['humidity'];
        const pressure = data['main']['pressure'];
        const city = data['name'];
        const country = data['sys']['country'];

        new SetWeather(
          weather,
          temp,
          wind,
          humidity,
          pressure,
          city,
          country
        ).apply();
      } else {
        document.querySelector('.card__wrapper').style.opacity = 0;
        document.querySelector('.card__status').style.display = 'block';
      }
    });
}

//Отрисовка данных
class SetWeather {
  constructor(
    weather,
    temp = '-',
    wind = '-',
    humidity = '-',
    pressure = '-',
    city = 'Undefined',
    country = ' '
  ) {
    this.weather = weather;
    this.temp = temp;
    this.wind = wind;
    this.humidity = humidity;
    this.pressure = pressure;
    this.city = city;
    this.country = country;
  }
  apply() {
    //Установка изображения состояния неба
    document
      .querySelector('.card__img')
      .setAttribute('src', `./img/${this.weather}.svg`);

    //Установка температуры
    document.querySelector('.card__temp-value').innerHTML = `${Math.floor(
      this.temp - 273.15
    )} <sup class="card__temp-value--deg">° C</sup>`;

    //Установка скорости ветра
    document.querySelector('.wind-value').textContent = `${this.wind} m/s`;

    //Установка влажности
    document.querySelector(
      '.humidity-value'
    ).textContent = `${this.humidity} %`;

    //Установка давления
    document.querySelector(
      '.pressure-value'
    ).textContent = `${this.pressure} mm`;

    //Установка местоположения
    document.querySelector(
      '.card__city'
    ).innerHTML = `${this.city}, <span class="country">${this.country}</span>`;
  }
}
