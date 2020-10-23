import moment from 'moment';

class UI {
  constructor() {
    this.body = document.querySelector('body');
    this.form = document.querySelector('form');
    this.formButton = document.querySelector('form .button');
    this.formInput = document.querySelector('form .input');
    this.resultCard = document.querySelector('#result');
    this.loadingSpinner = document.querySelector('#loadingSpinner');
    this.errorBlock = document.querySelector('#errorBlock');

    this.result = {
      units: document.getElementsByName('units'),
      cityName: document.querySelector('#result .cityName'),
      date: document.querySelector('#result .date'),
      weather: document.querySelector('#result .weather'),
      image: document.querySelector('#result .weatherIcon .icon'),
      tempetaures: document.querySelector('#result .infos .tempetaures'),
      cloudiness: document.querySelector('#result .infos .cloudiness'),
      humidity: document.querySelector('#result .infos .humidity'),
      pressure: document.querySelector('#result .infos .pressure'),
      wind: document.querySelector('#result .infos .wind'),
      sunrise: document.querySelector('#result .infos .sunrise'),
      sunset: document.querySelector('#result .infos .sunset'),
    };

    this.conditions = [
      {
        name: 'Thunderstorm',
        value: 'https://images.unsplash.com/photo-1498144846853-60ca2d43853b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      },
      {
        name: 'Drizzle',
        value: 'https://images.unsplash.com/photo-1541919329513-35f7af297129?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      },
      {
        name: 'Rain',
        value: 'https://images.unsplash.com/photo-1508556919487-845f191e5742?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=634&q=80',
      },
      {
        name: 'Snow',
        value: 'https://images.unsplash.com/photo-1517299321609-52687d1bc55a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      },
      {
        name: 'Mist',
        value: 'https://images.unsplash.com/photo-1525033261987-3b0f13f14479?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80',
      },
      {
        name: 'Clear',
        value: 'https://images.unsplash.com/photo-1567787782997-319ae6cf2edc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=684&q=80',
      },
      {
        name: 'Clouds',
        value: 'https://images.unsplash.com/photo-1498496294664-d9372eb521f3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80',
      },

    ];
  }

  toggleLoading() {
    this.formButton.classList.toggle('is-loading');
    this.loadingSpinner.classList.toggle('is-hidden');
    this.formButton.toggleAttribute('disabled');
    this.formInput.toggleAttribute('disabled');
    if (!this.errorBlock.classList.contains('is-hidden')) { this.toggleError(); }
    if (!this.resultCard.classList.contains('is-hidden')) { this.toggleResult(); }
  }

  toggleError() {
    this.errorBlock.classList.toggle('is-hidden');
  }

  setInputValue(value) {
    this.formInput.value = value;
  }

  getInputValue() {
    return this.formInput.value;
  }

  renderResult(data) {
    this.result.cityName.innerHTML = data.name;
    this.result.date.innerHTML = `${moment.unix(data.dt).format('dddd')}, ${moment.unix(data.dt).format('LL')}`;
    this.result.weather.innerHTML = data.weather[0].description;
    this.result.image.setAttribute('src', `http://openweathermap.org/img/wn/${data.weather[0].icon}@4x.png`);
    this.result.tempetaures.innerHTML = `${parseInt(data.main.temp, 10)}°`;
    this.result.cloudiness.innerHTML = `${data.clouds.all} %`;
    this.result.humidity.innerHTML = `${data.main.humidity} %`;
    this.result.pressure.innerHTML = `${data.main.pressure} hPa`;
    this.result.wind.innerHTML = `${parseInt(data.wind.speed * 3.6, 10)} km/hour`;
    const sunrise = moment.unix(data.sys.sunrise).format('LT');
    const sunset = moment.unix(data.sys.sunset).format('LT');
    this.result.sunrise.innerHTML = `${sunrise}`;
    this.result.sunset.innerHTML = `${sunset}`;
    this.toggleResult();
    this.updateBackground(data.weather[0].main);
  }

  toggleResult() {
    this.resultCard.classList.toggle('is-hidden');
  }

  updateBackground(weather) {
    const element = this.conditions.find(element => element.name === weather);
    let image = 'https://images.unsplash.com/photo-1534794048419-48e110dca88e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1248&q=80';
    if (element) {
      image = element.value;
    }
    this.resultCard.setAttribute('style', `background-image: url(${image})`);
  }
}

export default UI;