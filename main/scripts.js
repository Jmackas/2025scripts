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

//
// All CSS
//

const link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'https://jmackas.github.io/2025scripts/main/styles.css'; // Replace with your remote CSS file URL
document.head.appendChild(link);




//
// ClickUp
//
if (window.location.hostname === "app.clickup.com") {
  
document.head.appendChild(Object.assign(document.createElement('script'), {src: 'https://jmackas.github.io/2025scripts/main/clickup/windowed-mode.js'}));


document.head.appendChild(Object.assign(document.createElement('script'), {src: 'https://jmackas.github.io/2025scripts/main/misc/disable-ctrl-s.js'}));



}


