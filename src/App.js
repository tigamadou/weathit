import UI from './Ui';

class App {
  constructor(OPENWEATHERAPIKEY, IPINFOAPIKEY) {
    this.OPENWEATHERAPIKEY = OPENWEATHERAPIKEY;
    this.IPINFOAPIKEY = IPINFOAPIKEY;
    this.isLoading = false;
    this.units = 'imperial';
    this.UI = new UI();
  }

  async init() {
    const that = this;
    this.toggleLoading();
    await fetch('https://ipinfo.io/?token=ac80e2fd7ebd42', { mode: 'cors' })
      .then((response) => response.json()).then((response) => {
        that.toggleLoading();
        that.user = response;
        that.UI.setInputValue(that.user.city);
        that.getWeather();
      }).catch(() => false);
  }

  toggleLoading() {
    this.isLoading = !this.isLoading;
    this.UI.toggleLoading(this.isLoading);
  }

  async getWeather() {
    this.toggleLoading();
    const that = this;
    await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${this.user.city}&appid=${this.OPENWEATHERAPIKEY}&units=${this.units}`, { mode: 'cors' })
      .then((response) => response.json())
      .then((response) => {
        that.toggleLoading();
        that.parseResponse(response);
      })
      .catch(() => {
        this.toggleError();
        return false;
      });
  }

  parseResponse(response) {
    if (response.cod !== 200) { this.toggleError(); return; }

    this.UI.renderResult(response);
  }

  submit() {
    const value = this.UI.getInputValue();
    if (value.trim() === '' && typeof value === 'undefined') {
      return false;
    }
    this.user.city = value;

    this.getWeather();
    return true;
  }

  toggleError() {
    this.UI.toggleError();
  }

  setUnits(units) {
    this.units = units;
  }
}

export default App;