const FINANCIAL_AID_PAGE_HASH_LINK = /(\/financial-aid\/#|\/financial-aid#)/g;

function checkForMatchingTabOrAccordion(hash) {
  if ( document.querySelector('#financial-aid a[href="' + hash.replace(/\/$/g, '') + '"]') ) {
    $('#financial-aid a[href="' + hash.replace(/\/$/g, '') + '"]').tab('show'); // Bootstrap 4 Tab method
  } else if ( document.querySelector(hash.replace(/\/$/g, '') + '.collapse') ) {
    $(hash.replace(/\/$/g, '')).collapse('show'); // Bootstrap 4 Collapse method
  }
}

function makeTabsLinkable() {
  let initialURL = location.href;
  const userIsNotOnCorrectPage = initialURL.search(FINANCIAL_AID_PAGE_HASH_LINK) === -1;

  if ( userIsNotOnCorrectPage )
    return;

  if (location.hash) {
    checkForMatchingTabOrAccordion(location.hash);
  }
}

export default makeTabsLinkable;
