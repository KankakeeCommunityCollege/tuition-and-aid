// Custom JS to do cool stuff with BS accordions and tabs by manipulating URL hashes and query's
// EXAMPLE:
//  https://<ORIGIN>/?id=course-withdrawals#tuition-payment-and-deadlines
//    The above URL will:
//      1. Open the #tuition-payment-and-deadlines accordion if it exists
//      2. The ?id=course-withdrawals query will:
//         - look inside the opened accordion for an element with the id 'course-withdrawals', and
//         - scroll that matching element into the user's viewport (in this case it's a heading within that accordion card)
//
//  This JS will allow us to link to a specific area of content in a page where a triditional hash link wouldn't work
//  In this case hash links won't work because the element witht he matching ID is "stuck" in a closed accordion or tab.
//
const idRegex = /^id=/g; // Lets just cache these reused regex's here
const queryStartRegex = /^\?/g;
const endingSlashRegex = /\/$/g;

function processIdQuery(query, hash) {

    let id = query.replace(idRegex, '');
    let parentEl = document.querySelector(hash.replace(endingSlashRegex, ''));
    if ( parentEl.querySelector('#' + id) ) {
      let el = parentEl.querySelector('#' + id);
      el.scrollIntoView();
    }
}

function checkForQuery(urlQuerystring, hash) {
  let query = urlQuerystring.replace(queryStartRegex, '');

  query.search(idRegex) !== -1 ? processIdQuery(query, hash): null;
}

function checkForMatchingTabOrAccordion(hash) {
  if ( document.querySelector('.tab-content a[href="' + hash.replace(endingSlashRegex, '') + '"]') ) {
    $('.tab-content a[href="' + hash.replace(endingSlashRegex, '') + '"]').on('shown.bs.tab', function (e) {
      window.location.search ? checkForQuery(window.location.search, hash): null;
    })
    $('.tab-content a[href="' + hash.replace(endingSlashRegex, '') + '"]').tab('show'); // Bootstrap 4 Tab method
  } else if ( document.querySelector(hash.replace(endingSlashRegex, '') + '.collapse') ) {
    $(hash.replace(endingSlashRegex, '')).on('shown.bs.collapse', function(e) {
      window.location.search ? checkForQuery(window.location.search, hash): null;
    })
    $(hash.replace(endingSlashRegex, '')).collapse('show'); // Bootstrap 4 Collapse method
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
