import '../../scss/main.scss';

document.addEventListener('DOMContentLoaded', () => {
  // Do not add any more custom JS inside this 'DOMContentLoaded' event-listener-function!!
  //    (unless it must also execute after the 'DOMContentLoaded' event)
  // Instead, add any additional custom JS to the `window` `load` event-listener below
  //    (and uncomment it...)
  if (
    window.location.pathname.search(/\/net-price-calculator\//g) !== -1 &&
    window.localStorage.getItem('darkModeSetting') == 'true'
  ) {
    // A tiny "hack" to utilize the dark-mode styling that's already built into the net-price-calculators' code!!
    //    (the 3rd party net-price-calc dark-mode was discovered chance -- I've never seen any documentation on it)
    // NOTE: This module must be executed inside a `document.addEventListener('DOMContentLoaded', //...)` function and
    //     NOT a `window.addEventListener('load', //...)` nor a `window.onload = //...` function!
    import('./netPriceCalcDarkMode').then(({default: netPriceCalcDarkMode}) => netPriceCalcDarkMode());
  }
});

// Load any custom JS modules here (and uncomment!)
// window.addEventListener('load', () => {
  // Add custom JS here
  // ...
// });
