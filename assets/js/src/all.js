//import './babelTest.js';
import netPriceCalcDarkMode from './netPriceCalcDarkMode.js';

document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.search(/\/net-price-calculator\//g) === -1)
    return;
  
  netPriceCalcDarkMode();
});
