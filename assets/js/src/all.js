import '../../scss/main.scss';

document.addEventListener('DOMContentLoaded', function() {
  if (window.location.pathname.search(/\/net-price-calculator\//g) !== -1) {
    import(/* webpackChunkName: 'netPriceCalcDarkMode' */ './netPriceCalcDarkMode').then(({default: netPriceCalcDarkMode}) => {
      netPriceCalcDarkMode();
    });
  }
});
