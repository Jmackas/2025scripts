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


}


//##############################
//############################## Gemini
//##############################
document.addEventListener("keydown", function(event) {
  // Check if Alt + N is pressed
  if (event.altKey && event.key.toLowerCase() === "n") {
    event.preventDefault(); // prevent default browser behavior

    // Find the element with aria-label="Start new chat"
    const target = document.querySelector('[aria-label="Start new chat"]');
    if (target) {
      target.click(); // simulate a click
    }
  }
});



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

//##############################
//############################## Reddit
//##############################


if (window.location.hostname === "www.reddit.com") {



	///////////////
/////////////// Hide the sidebar on reddit on old.reddit view
///////////////
	// Create the toggle button
document.querySelector('.side').style.display = 'none';

const toggleBtn = document.createElement('button');
toggleBtn.textContent = '☰';
toggleBtn.style.position = 'fixed';
toggleBtn.style.top = '10px';
toggleBtn.style.right = '10px';
toggleBtn.style.zIndex = '9999';
toggleBtn.style.padding = '10px';
toggleBtn.style.background = '#333';
toggleBtn.style.color = '#fff';
toggleBtn.style.border = 'none';
toggleBtn.style.borderRadius = '4px';
toggleBtn.style.cursor = 'pointer';

document.body.appendChild(toggleBtn);

// Toggle function
toggleBtn.addEventListener('click', function() {
    const side = document.querySelector('.side');
    if (side.style.display === 'none') {
        side.style.display = 'block';
    } else {
        side.style.display = 'none';
    }
});








	///////////////
/////////////// Display all ahref links to images in the comments as actual images
///////////////
	    // Get all anchor tags on the page
    const links = document.querySelectorAll('a');

    // Loop through each link
    links.forEach(link => {
      // Check if the link's text content is exactly "<image>"
      if (link.textContent.trim() === '<image>') {
        // Get the image URL from the href attribute
        const imageUrl = link.href;

        // Create a new Image element
        const imgElement = document.createElement('img');
        imgElement.src = imageUrl;
        imgElement.alt = 'Image from link'; // Good practice for accessibility!

        // Replace the link's text content with the new Image element
        link.replaceChild(imgElement, link.firstChild);
      }
    });



	


	

}


//##############################
//############################## Ms Planner
//##############################
// Make the popup window for tasks opaque background
if (window.location.hostname === "https://planner.cloud.microsoft/") { 

/* nothing */
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



/* reduce the size of the activity comments and post on clickup - make them 85/90% width */
cu-task-activity-stream-item-wrapper.cu-task-activity-stream-item-wrapper {
    width: 85%;
}

/* reduce the size of the inbox view of tasks */
cu3-notifications-list-layout .inner {
    width: 90% !important;
}

/*======================
*
*
Microsoft Planner
*
*
 ====================*/
.ms-Modal .ms-Overlay {
    background-color: rgba(0, 0, 0, 0.6);
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

/* Side window shadow */
.cu-task-view__container-ghost {
    box-shadow: -10px 0 15px -5px rgb(190 190 190 / 60%);
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

/* Notion - make the latest comment more prominent */
  .notion-page-view-discussion [style="padding-top: 8px; padding-inline: 16px; padding-bottom: 8px;"] {
    color: #a9a9a9;
}

.notion-page-view-discussion [style="padding-top: 8px; padding-inline: 16px; padding-bottom: 8px;"]:last-of-type {
    color: initial;
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

/* hide the tabs on the bottom of emails - so annoying */
[data-app-section="MailReadCompose"] [role="tablist"] {
    display: none;
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

/* make the images displaying on teh comments a bit smaller */
[alt="Image from link"] {
    width: 400px;
}

/* hide promoted links */
.promotedlink {
    display: none;
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


/* Gemini "Alt + N" text on the new chat button */
[aria-label="New chat"]:after {
    content: "Alt + N";
    font-size: small;
    font-family: sans-serif;
    font-weight: bold;
}


`;

document.head.appendChild(style);

