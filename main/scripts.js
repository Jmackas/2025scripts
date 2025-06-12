/*

#### 
This file URL:
https://jmackas.github.io/2025scripts/main/scripts.js

#### 
To inject into another website:
document.head.appendChild(Object.assign(document.createElement('script'), {src: 'https://jmackas.github.io/2025scripts/main/scripts.js'}));

## Install this and enable for site you want to use scripts on for minimal pain
https://chromewebstore.google.com/detail/csp-unblock/lkbelpgpclajeekijigjffllhigbhobd?hl=en
+ also this to add js: https://chromewebstore.google.com/detail/user-javascript-and-css/nbhcbdghjpllgmfilhnhkllmkecfmpld

#### 
Add the below to add some code from a different file:
document.head.appendChild(Object.assign(document.createElement('script'), {src: 'https://google.com'}));

*/




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
//############################## General Styles
//##############################
const style = document.createElement('style');
style.textContent = `


/*======================
*
*
Bitwarden
*
*
 ====================*/
 /* 2023-07-09 Bitwarden full screen modal size */
 .modal-lg {
    width: 100%;
    max-width: 100%;
    height: 100%;
    position: fixed;
    bottom: 0;
}

.modal-body {
    padding: 8px 323px;
}

.modal-dialog {
    margin: 0;
}

.modal-footer {
    height: 201px;
    align-items: baseline;
}

.modal-footer button {
    width: 20%;
    height: 54px;
}


/*======================
*
*
ClickUp
*
*
 ====================*/
/* 2023-08-15 Show bigger icons on clickup board view */
 .cu-custom-field-type-attachment .cu-attachment-preview__container {
    max-width: 100%;
    max-height: 100%;
}
 
 
/* Minimise size of comments easily in clickup */
/* normal comments are minimised */

.cu-comment__body-container {
    height: 200px;
    overflow: auto;
}

/* tagged email attachments (hide them) */
.task-history-attachment.ng-star-inserted {
    height: 40px;
    overflow: hidden;
    opacity: 0.4;
    transition: .2s;
}

.task-history-attachment.ng-star-inserted:hover {
    opacity: 0.8;
    height: initial;
}

/* expanded emails are full size */
.attachments-viewer_open .cu-comment__body-container {
	height: initial !important;
}


/*2023-10-11 Make comment highlights more obvious */
/*Obvious clickup highlight */
.comment-v3-overrides .cu-comment:after {
    border: 3px solid var(--cu-border-default);
}


/* Do not truncate the activity log text in ClickUp*/
.task-history-item__text .cu-custom-fields__multi-line-text {
    -webkit-line-clamp: initial;
}

/* Make the attachment thumbnails a bit bigger in size (for asset view) */
.cu-task-row.cu-task-row_list-view-v3 .cu-custom-field-type-attachment .cu-attachment-preview__container, .cu-task-custom-fields-v3 .cu-custom-field-type-attachment .cu-attachment-preview__container {
    max-height: 100% !important;
    max-width: 100% !important;
}


/* font size bold for tasks in kanban view */
.cu-panel-board__clickable-name {
    font-weight: 500 !important;
}

/* scroll for the attachments in the main task - risky css selector though */
.cu-task-view-task-content__subsection.ng-star-inserted:nth-of-type(4) {
    height: 235px;
    overflow: scroll;
}


/* Have a more defined border for pop out view */
.v3_9[_nghost-ng-c4183276966] .cu-task-view__container[_ngcontent-ng-c4183276966]:not(.embed-mode) {
           box-shadow: -10px 0px 17px var(--cu-border-default);  /* Left shadow only
       /* margin-right: -34px !important; */
           /* border-left: 2px solid var(--cu-border-default); */
}

/*======================
*
*
Google Keeper
*
*
 ====================*/
/* 2023-07-31 Hide the keeper notes from the top view - pushes them down out of view */
.notes-container .gkA7Yd-sKfxWe {
    margin-top: 1000px;
}




/*======================
*
*
Notion
*
*
 ====================*/
 /* Nice quotes for Notion 2023-07-29 */
.notion-html blockquote {
        background: whitesmoke;
        /* width: 60vw; */
        padding: 40px 32px !important;
        position: relative;
       /* margin: 10px 0 !important; */
}

.notion-html blockquote:before {
        position: absolute;
    content: '“';
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 60px;
    color: gray;
    top: 0;
    left: 16px;
}

.notion-html blockquote::after {
    position: absolute;
    content: '”';
    font-family: 'Noto Sans JP', sans-serif;
    font-size: 60px;
    color: gray;
    bottom: -34px;
    right: 16px;
}

.notion-html [style="border-left: 3px solid currentcolor; padding-left: 14px; padding-right: 14px; width: 100%;"] {
    border-left: none !important;
    font-style: italic;
}

/* limit the number of lines a block/gallery element can show text - this adds an ellipsis after 8 lines */
.notion-selectable.notion-page-block.notion-collection-item [aria-label="Start typing to edit text"] {
  display: -webkit-box; /* 📦 Special display mode for multi-line ellipsis */
  -webkit-line-clamp: 8; /* 🔢 Number of lines to show before cutting off */
  -webkit-box-orient: vertical; /* ↕️ Arranges content vertically */
  overflow: hidden; /* 🕵️ Hides overflow */
  text-overflow: ellipsis; /* ✨ Adds ellipsis */
  
  }


/*======================
*
*
Helpdesk
*
*
 ====================*/
 /*2023-11-09 Make the helpdesk look a bit nicer */
.view-tickets td {
white-space:nowrap !important;
      max-width: 300px !important; 
    overflow: hidden !important; 
  
}

.view-tickets th:nth-child(9), td:nth-child(9) {
    max-width: 120px !important;
}


.view-tickets td a:first-of-type {
    font-weight: bold;
}

/*
.view-tickets th:nth-child(3), .view-tickets td:nth-child(3), .view-tickets th:nth-child(6), .view-tickets td:nth-child(6), .view-tickets th:nth-child(5), .view-tickets td:nth-child(5) {
    display: none !important;
}
*/

.rst-status-ticket-open-needs-attention td:nth-of-type(7) {
    background: rgb(213 2 0 / 10%) !important;
    border: 2px solid rgb(213 2 0 / 50%);
}

.rst-status-waiting-on-customer td:nth-of-type(7)  {
    opacity: 0.9;
    background: rgb(16 144 224 / 20%) !important;
    border: 2px solid #1090e0; 
}

.rst-status-internally-investigating-issue td:nth-of-type(7)  {
    background: rgb(255 165 0 / 10%) !important;
        border: 2px solid rgb(255 165 0 / 50%); 

    
}

.rst-status-ticket-closed td:nth-of-type(7)  {
	   opacity: 0.5;
    background: rgb(0 0 0 / 10%) !important;
    border: 2px solid rgb(128 128 128 / 50%); 
}




/*======================
*
*
 Outlook 
*
*
 ====================*/
 
 /* 2022-08-08 Pseudoselector line space https://stackoverflow.com/questions/17047694/add-line-break-to-after-or-before-pseudo-element-content*/

#headerAgentInfoDetailsPhone:after {
  content:"Office: XXXXX \A Mobile: YYYYY ";
  white-space: pre; /* or pre-wrap */
}


/* 2023-07-26 Outlook - remove annoying search highlighting */
[style="background-color: rgb(255, 241, 0); color: black;"] {
    background: initial !important;
    color: inherit !important;
}



/* (doesn't work) CSS to colour the calendar columns */
/*
[style="height: 1440px; width: 48px;"]:nth-of-type(1) {
     background: rgb(0 128 0 / 15%);
}

[style="height: 1440px; width: 48px;"]:nth-of-type(2) {
    background: rgb(0 58 111 / 15%);
}

[style="height: 1440px; width: 48px;"]:nth-of-type(3) {
    background: rgb(255 0 0 / 15%);
}

[style="height: 1440px; width: 48px;"]:nth-of-type(4) {
    background: rgb(255 255 0 / 15%);
}

*/


/*======================
*
*
Reddit
*
*
 ====================*/
 /* 2023-12-20 - rdrama - hide the signatures */
 .user-signature {
    display: none;
}

/* Hide the adverts on reddit new */
shreddit-ad-post {
    display: none !important;
}

shreddit-comments-page-ad {
    display: none !important;
}

/* reduce the size of image previews on main thread */
[slot="post-media-container"] {
    width: 29%;
}

/* normal size image on post thread */
[routename="post_page"] [slot="post-media-container"] {
	width: initial;
}

[slot="post-media-container"] {
    width: 250px;
}

/*======================
*
*
Misc
*
*
 ====================*/
 /* Hide Facebook stories */
 [aria-label="Stories"] {
    display: none;
}


/* Hide the annoying comment option at the top - "disable notifications for comment thread" */
[data-test="dropdown-list__item-unfollowThread"] {
    display: none !important;
}




`;

document.head.appendChild(style);

