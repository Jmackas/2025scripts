/*

This file URL:
https://jmackas.github.io/2025scripts/main/scripts.js

Add the below to add some code from a different file:
document.head.appendChild(Object.assign(document.createElement('script'), {src: 'https://google.com'}));

*/

//
// All CSS
//
// Create a new <link> element
const link = document.createElement('link');
link.rel = 'stylesheet';
link.type = 'text/css';
link.href = 'https://jmackas.github.io/2025scripts/main/styles.css'; // Replace with your remote CSS file URL



// Append the <link> element to the <head> of the document
document.head.appendChild(link);


//
// ClickUp
//
document.head.appendChild(Object.assign(document.createElement('script'), {src: 'https://jmackas.github.io/2025scripts/main/clickup/windowed-mode.js'}));

