// Returns the first element found with `selector` who's textContent matches the regexp:
function querySelectorText(selector, regexp) {
  // 1. Get all elements matching a base selector (e.g., 'p', 'div', or '*' for any)
  const elements = document.querySelectorAll(selector);
  
  // 2. Loop through them to find the first match
  for (const el of elements) {
    if (regexp.test(el.textContent.trim())) {
      return el; // Return the first exact match
    }
  }
  return null;
}

// Helper to cleanup custom highlighting
function removeHighlight() {
  CSS.highlights.delete('search-results');
}

// Helper to watch for when the highlighted element loses focus, or
//  when the user clicks elsewhere:
function handleHighlightCleanup(el) {
  const cleanup = () => {
    removeHighlight();
    el.removeEventListener('blur', cleanup);
    document.removeEventListener('click', cleanup);
  }

  el.addEventListener('blur', cleanup);
  document.addEventListener('click', cleanup);
}

// Finds the first link (with the <main>) that contains "Financial Aid Calendar" and
//  applies a custom highlighting style, scrolls it into view, and focuses it:
function focusAndHighlightCalendarLink() {
  const calenderLink = querySelectorText('main a', /Financial Aid Calendar/); // look for our matching element
  
  if (calenderLink) {
    // Respect users who want reduced motion (for accessibility)
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    // 1. Clear any previous highlights first
    CSS.highlights.clear();
    const range = new Range();
    // 2. Create a range for the found element
    range.selectNodeContents(calenderLink);

    const highlight = new Highlight(range);
    CSS.highlights.set('search-results', highlight); // search-results is defined in '0-tools/_highlight.scss';
    calenderLink.scrollIntoView({
      block: 'start', // Scroll to start since its towards the top of the page
      behavior: motionQuery.matches ? 'instant' : 'smooth' // The most sure-fire way to respect reduced motion users ('auto' depends on calculated CSS and could cause smooth scrolling which we don't want)
    });
    calenderLink.focus({ preventScroll: true }); // Be sure to focus the element for screen reader and keyboard users
    
    handleHighlightCleanup(calenderLink); // Remove the highlighting if the user clicks or tabs away
  }
}

function checkCalendarHash(_e) {
  const hash = window.location.hash;

  if (hash !== '#fa-calendar')
    return;

  focusAndHighlightCalendarLink();
  // highlightTextInLinks('Financial Aid Calendar');
}

function linkToCalendar() {
  checkCalendarHash(); // Initial check on page load
  window.addEventListener('hashchange', checkCalendarHash); // Watch for the #fa-calendar hash-link after page load
}

export default linkToCalendar;
