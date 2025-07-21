//##############################
//############################## ClickUp
//##############################
if (window.location.hostname === "app.clickup.com") {


///////////////
/////////////// Disable Ctrl+S
///////////////
document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.key === 's') {
    e.preventDefault();
    // Add your custom save logic here
    console.log('Ctrl+S pressed, custom save triggered');
  }
});



///////////////
/////////////// Windowed Mode
///////////////

//////////// START SCRIPT BELOW


// Function to manage the go-back button depending on class state
function updateGoBackButton() {
  const target = document.querySelector('.cu-task-view__inner.layout-v3');
  const button = document.getElementById('go-back-button');

  const isFullScreen = target?.classList.contains('full-screen');
  const isSidebarMode = target?.classList.contains('sidebar-mode');

  if (!target || isFullScreen || isSidebarMode) {
    // Remove button if conditions aren't met
    if (button) {
      button.remove();
    }
    return;
  }

  // Create button if it doesn't exist
  if (!button) {
    const goBackDiv = document.createElement('div');
    goBackDiv.id = 'go-back-button';
    // goBackDiv.textContent = '← Go Back';
    goBackDiv.style.cursor = 'pointer';
    goBackDiv.style.top = '0';
    goBackDiv.style.opacity = '0.6';
    goBackDiv.style.background = 'black';
    goBackDiv.style.position = 'fixed';
    goBackDiv.style.zIndex = '737';
    goBackDiv.style.width = '100%';
    goBackDiv.style.height = '100%';
    goBackDiv.onclick = () => {
      // Try clicking a close button if present
      const closeBtn = document.querySelector('.modal-close, .your-close-class');
      if (closeBtn) {
        closeBtn.click();
        return;
      }

      // Otherwise, dispatch Escape key event to the focused element
      const escapeEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        which: 27,
        bubbles: true,
        cancelable: true
      });
      (document.activeElement || document).dispatchEvent(escapeEvent);
    };

    target.parentNode.insertBefore(goBackDiv, target.nextSibling);
  }
}

// MutationObserver to track class changes or added nodes
const observer = new MutationObserver(() => {
  updateGoBackButton();
});

// Initial start
updateGoBackButton();

// Start observing changes to DOM
observer.observe(document.body, {
  childList: true,
  subtree: true,
  attributes: true,
  attributeFilter: ['class'],
});

// Debug: Log all keydown events to verify Escape is firing
document.addEventListener('keydown', (e) => {
  console.log('Keydown event:', e);
});

// Inject style
const style = document.createElement('style');
style.textContent = `
.cu-task-view__inner.layout-v3:not(.full-screen):not(.sidebar-mode) {
    width: 85% !important;
    right: 10% !important;
    left: 7% !important;
    top: 5% !important;
    bottom: 20% !important;
    background: none !important;
}
`;
document.head.appendChild(style);







//////////// END SCRIPT ABOVE



	
///////////////
/////////////// Open the inbox view task in a new tab INSTEAD of on the same window
///////////////
//////////// START SCRIPT BELOW

	/**
 * @file This script enhances ClickUp's task view by opening the task in a new tab
 * when the "toggle fullscreen mode" button is clicked. It uses a MutationObserver
 * to ensure the click listener is applied even if the button is added to the DOM
 * dynamically after the initial page load.
 */

// Use an Immediately Invoked Function Expression (IIFE) to encapsulate the script
// and prevent global variable pollution, ensuring it runs only once.
(function() {
    // Check if the script has already been loaded and executed.
    // This provides an additional safeguard against multiple executions.
    if (window._clickupTaskOpenerScriptLoaded) {
        console.log("ClickUp Task Opener Script already loaded. Skipping re-execution.");
        return; // Exit if already loaded
    }
    window._clickupTaskOpenerScriptLoaded = true; // Mark as loaded

    console.log("ClickUp Task Opener Script initializing...");

    /**
     * Applies a custom click listener to the fullscreen button.
     * This listener prevents the default action and opens the task URL in a new tab.
     * It includes a check to ensure the listener is attached only once per button instance.
     */
    function applyClickListener() {
        // Select the fullscreen toggle button using its data-test attribute.
        const fullscreenButton = document.querySelector('[data-test="task-view-header__button-toggle-fullscreen-mode-not"]');

        if (fullscreenButton) {
            // Check if our custom listener has already been attached to this specific button.
            // This prevents attaching multiple identical listeners to the same element.
            if (!fullscreenButton.hasAttribute('data-custom-listener-attached')) {
                // Attach the click event listener.
                // The 'true' argument means it will listen in the capturing phase,
                // which can be useful for overriding default behaviors earlier.
                fullscreenButton.addEventListener('click', function(event) {
                    // Prevent the default action (toggling fullscreen) and stop propagation
                    // to ensure only our custom logic runs.
                    event.preventDefault();
                    event.stopImmediatePropagation();

                    // Find the button that contains the Task ID.
                    const taskIdButton = document.querySelector('[data-test="task-view-task-label__taskid-button"]');

                    if (taskIdButton) {
                        // Extract the Task ID from the button's text content.
                        const taskId = taskIdButton.textContent.trim();
                        // Construct the full ClickUp task URL.
                        const fullUrl = "https://app.clickup.com/t/" + taskId;
                        console.log("Opening URL in new tab:", fullUrl);
                        // Open the URL in a new tab.
                        window.open(fullUrl, '_blank');
                    } else {
                        // Log a warning if the Task ID button is not found.
                        console.warn("Element with data-test='task-view-task-label__taskid-button' not found. Cannot construct URL.");
                    }
                }, true); // Capturing phase listener

                // Mark the button to indicate that our custom listener has been attached.
                fullscreenButton.setAttribute('data-custom-listener-attached', 'true');
                console.log("Custom click listener attached to fullscreen button.");

                // OPTIONAL: If you are certain the button will only appear once and
                // you no longer need to observe the DOM after it's found, you can
                // disconnect the observer here to save resources.
                // observer.disconnect();
            }
        }
    }

    /**
     * Sets up a MutationObserver to watch for changes in the DOM.
     * This is crucial because the target button might not be present on initial page load
     * but could be added dynamically by the application later.
     */
    // Create a new MutationObserver instance.
    // The callback function will be executed whenever observed mutations occur.
    const observer = new MutationObserver(function(mutationsList, observerInstance) {
        for (const mutation of mutationsList) {
            // We are interested in 'childList' mutations, which indicate nodes have been added or removed.
            // And specifically, if any nodes were added.
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // When new nodes are added, try to apply the click listener.
                // The `applyClickListener` function itself handles preventing duplicate listeners.
                applyClickListener();
            }
        }
    });

    // Start observing the document body for changes.
    // { childList: true }: Watch for additions/removals of direct children.
    // { subtree: true }: Watch for changes within the entire descendant tree of the body.
    // This ensures we catch the button whenever it appears, anywhere in the document.
    observer.observe(document.body, { childList: true, subtree: true });

    // Call applyClickListener once immediately when the script runs.
    // This handles cases where the fullscreen button is already present in the DOM
    // before the MutationObserver detects any changes.
    applyClickListener();

    console.log("ClickUp Task Opener Script setup complete.");

})(); // End of IIFE

//////////// END SCRIPT ABOVE

	

}




//##############################
//############################## Gemini
//##############################
// Make a new prompt on alt+n key command
if (window.location.hostname === "gemini.google.com") { 
document.addEventListener('keydown', (event) => {
    // Check if the Alt key is pressed
    const isAltKey = event.altKey;

    // Check if 'n' or 'N' key is pressed
    const isNKey = event.key === 'n' || event.key === 'N';

    // If Alt + N is pressed
    if (isAltKey && isNKey) {
        // Prevent the default browser action (e.g., opening a new tab/window)
        // Note: For Alt+N, some browsers might not have a default action,
        // but it's good practice to include preventDefault().
        event.preventDefault();

        // Select the target element using your provided selector
        const targetElement = document.querySelector("#app-root > main > side-navigation-v2 > bard-sidenav-container > bard-sidenav > side-navigation-content > div > div > mat-action-list.mat-mdc-action-list.mat-mdc-list-base.mdc-list.top-action-list.ng-star-inserted > side-nav-action-button > button");

        // If the element is found, programmatically click it
        if (targetElement) {
            targetElement.click();
            console.log('Alt + N detected! The target button was clicked. 🚀');
            // Add any desired visual feedback here, like a temporary message.
        } else {
            console.warn('Target button not found. Please ensure the selector is correct and the element exists on the page.');
        }
    }
});

}

