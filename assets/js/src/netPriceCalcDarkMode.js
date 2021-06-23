// Custom JS to activate the built-in dark-mode for the
// Net Price Calculator when user has darkModeSetting === 'true' in localStorage
function iframeLoadHandler(e) {
  const frame = e.target;
  const div = frame.contentWindow.document.body.querySelector('.theme-light');
  
  div.classList.add('theme-dark');
  div.classList.remove('theme-light');
}

function netPriceCalcDarkMode() {
  const frame = document.getElementById('netPriceIframe');

  frame.addEventListener('load', iframeLoadHandler);
}
//
//  USAGE:  (use Webpack dynamic import)
//
//    if (window.localStorage.getItem('darkModeSetting') === 'true') {
//      import('./netPriceCalcDarkMode').then(({default: netPriceCalcDarkMode}) => {
//        netPriceCalcDarkMode();
//      });
//    }
export default netPriceCalcDarkMode;