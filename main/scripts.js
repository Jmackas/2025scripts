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
      const escapeEvent = new KeyboardEvent('keydown', {
        key: 'Escape',
        code: 'Escape',
        keyCode: 27,
        which: 27,
        bubbles: true,
        cancelable: true
      });
      document.dispatchEvent(escapeEvent);
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







///////////////
/////////////// Open a task in a new window if the expand button is clicked on clickup winddow (when it is in sidebar inbox view)
///////////////
(function () {
  const titleSelector = 'a.title.title_clickable.ng-star-inserted';
  const fullscreenSelector = '[data-pendo="cu-task-view-header__button-toggle-fullscreen-mode"]';

  let currentHref = null;
  let anchorWrapper = null;

  function updateLink() {
    const titleLink = document.querySelector(titleSelector);
    if (!titleLink) return;

    const newHref = titleLink.href;
    if (!newHref || newHref === currentHref) return;

    currentHref = newHref;

    let fullscreenButton = document.querySelector(fullscreenSelector);
    if (!fullscreenButton) return;

    // Clone the button to remove original event listeners
    const cleanButton = fullscreenButton.cloneNode(true);

    // Replace original button with the clean one
    fullscreenButton.parentNode.replaceChild(cleanButton, fullscreenButton);
    fullscreenButton = cleanButton;

    // Remove previous wrapper if it exists
    if (anchorWrapper) {
      const oldButton = anchorWrapper.firstChild;
      anchorWrapper.parentNode.replaceChild(oldButton, anchorWrapper);
    }

    // Create new anchor wrapper
    anchorWrapper = document.createElement('a');
    anchorWrapper.href = currentHref;
    anchorWrapper.target = '_blank';
    anchorWrapper.rel = 'noopener noreferrer';

    // Wrap the cleaned button
    fullscreenButton.parentNode.replaceChild(anchorWrapper, fullscreenButton);
    anchorWrapper.appendChild(fullscreenButton);
  }

  // Mutation observer to detect href changes
  const observer = new MutationObserver(updateLink);

  const observeTitle = () => {
    const titleLink = document.querySelector(titleSelector);
    if (titleLink) {
      observer.disconnect(); // Just in case
      observer.observe(titleLink, { attributes: true, attributeFilter: ['href'] });
      updateLink(); // Initial setup
    } else {
      setTimeout(observeTitle, 500); // Retry if not found yet
    }
  };

  // Run it
  observeTitle();
})();

	

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



/* CSS to colour the calendar columns */
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


