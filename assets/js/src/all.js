import '../../scss/main.scss';

document.addEventListener('DOMContentLoaded', function() {
  if (
    window.location.pathname.search(/\/net-price-calculator\//g) !== -1 &&
    window.localStorage.getItem('darkModeSetting') == 'true'
  ) {
    import(/* webpackChunkName: 'netPriceCalcDarkMode' */ './netPriceCalcDarkMode').then(({default: netPriceCalcDarkMode}) => {
      netPriceCalcDarkMode();
    });
  }
});
