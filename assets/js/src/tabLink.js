function checkForMatchingTabOrAccordion(hash) {
  if ( document.querySelector('#financial-aid a[href="' + hash.replace(/\/$/g, '') + '"]') ) {
    $('#financial-aid a[href="' + hash.replace(/\/$/g, '') + '"]').tab('show'); // Bootstrap 4 Tab method
  } else if ( document.querySelector(hash.replace(/\/$/g, '') + '.collapse') ) {
    $(hash.replace(/\/$/g, '')).collapse('show'); // Bootstrap 4 Collapse method
  }
}

function checkForHash() {
  if (window.location.hash) {
    checkForMatchingTabOrAccordion(window.location.hash);
  }
}

function makeTabsLinkable() {
  checkForHash();

  window.addEventListener('hashchange', checkForHash, false);
}

export default makeTabsLinkable;
