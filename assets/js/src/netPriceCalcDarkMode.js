function iframeLoadHandler(e) {
  // const div = frame.contentWindow.document.body.querySelector('.theme-light');

  // div.classList.add('theme-light')
  // div.classList.add('theme-light')
  const frame = e.target;
  const div = frame.contentWindow.document.body.querySelector('.theme-light');
  
  //console.log(div);
  div.classList.add('theme-dark');
  div.classList.remove('theme-light');
}

function netPriceCalcDarkMode() {
  console.log(`Net Price`);
  const frame = document.getElementById('netPriceIframe');

  frame.addEventListener('load', iframeLoadHandler);
}

export default netPriceCalcDarkMode;