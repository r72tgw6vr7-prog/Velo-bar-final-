// Force teal background on navigation
// This script forces the teal color on the navigation regardless of other CSS rules

document.addEventListener('DOMContentLoaded', function () {
  const setNavBackground = () => {
    // Target all cosmic-nav elements and headers
    const navElements = document.querySelectorAll('.cosmic-nav-solid, header.cosmic-nav-solid');

    // Apply the style with !important directly through JavaScript
    navElements.forEach((nav) => {
      nav.style.setProperty('background', '#003141', 'important');
      nav.style.setProperty('background-color', '#003141', 'important');
      nav.style.setProperty('backdrop-filter', 'none', 'important');
      nav.style.setProperty('-webkit-backdrop-filter', 'none', 'important');
    });
  };

  // Run immediately and also on DOM changes
  setNavBackground();

  // Set up a MutationObserver to handle dynamic changes
  const observer = new MutationObserver(setNavBackground);
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
});
