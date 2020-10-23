import './assets/styles/style.scss';
import APP from './App';

import 'bulma';

const OPENWEATHERAPIKEY = '25e20d8a63f5eb97b505f3e11f9d38b2';
const IPINFOAPIKEY = 'ac80e2fd7ebd42';

const app = new APP(OPENWEATHERAPIKEY, IPINFOAPIKEY);
app.init();

document.querySelector('form').addEventListener('submit', (event) => {
  event.preventDefault();
  for (let i = 0; i < app.UI.result.units.length; i += 1) {
    if (app.UI.result.units[i].checked) { app.setUnits(app.UI.result.units[i].value); }
  }
  app.submit();
});