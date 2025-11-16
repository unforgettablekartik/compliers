/**
 * Utility for handling smooth navigation with hash anchors across routes
 */

/**
 * Handles navigation to a URL with a hash anchor
 * - If navigating within the same page, smoothly scrolls to the anchor
 * - If navigating to a different page, uses router to navigate and scrolls after load
 */
export function handleHashNavigation(
  href: string,
  currentPath: string,
  router: any,
  e?: React.MouseEvent
) {
  // Parse the href to get the path and hash
  const url = new URL(href, window.location.origin);
  const targetPath = url.pathname;
  const targetHash = url.hash;

  // If there's no hash, just use regular navigation
  if (!targetHash) {
    return;
  }

  // If we're already on the target page, just scroll to the hash
  if (currentPath === targetPath) {
    e?.preventDefault();
    const element = document.querySelector(targetHash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      // Update URL without triggering navigation
      window.history.pushState({}, '', href);
    }
    return;
  }

  // If navigating to a different page, navigate first then scroll
  e?.preventDefault();
  
  // Check if router.push returns a promise (pages router) or is void (app router)
  const pushResult = router.push(href);
  
  if (pushResult && typeof pushResult.then === 'function') {
    // Pages router - returns a promise
    pushResult.then(() => {
      setTimeout(() => {
        const element = document.querySelector(targetHash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    });
  } else {
    // App router - void return, use different approach
    // Listen for route change completion
    const checkElement = () => {
      const element = document.querySelector(targetHash);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    };
    
    // Use multiple timeouts to catch the element when it appears
    setTimeout(checkElement, 100);
    setTimeout(checkElement, 300);
    setTimeout(checkElement, 500);
  }
}
