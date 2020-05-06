// Provide the ability to activate a tab from the URL (e.g. 'http://localhost:3000/alumni/distinguished-alumni-award/#donald-rehmer' makes the #donald-rehmer tab active).
const FINANCIAL_AID_PAGE_HASH_LINK = /(\/financial-aid\/#|\/financial-aid#)/g;

function checkForMatchingTabOrAccordion(hash) {
  if ( document.querySelector('#financial-aid a[href="' + hash.replace(/\/$/g, '') + '"]') ) {
    $('#financial-aid a[href="' + hash.replace(/\/$/g, '') + '"]').tab('show');
  } else if ( document.querySelector(hash.replace(/\/$/g, '') + '.collapse') ) {
    $(hash.replace(/\/$/g, '')).collapse('show');
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
