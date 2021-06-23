import '../../scss/main.scss';
import netPriceCalcDarkMode from './netPriceCalcDarkMode.js';

document.addEventListener('DOMContentLoaded', function() {
  if (
    window.location.pathname.search(/\/net-price-calculator\//g) !== -1 &&
    window.localStorage.getItem('darkModeSetting') == 'true'
  ) {
    netPriceCalcDarkMode();
  }
});
